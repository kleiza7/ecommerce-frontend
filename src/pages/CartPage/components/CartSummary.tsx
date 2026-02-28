import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "../../../assets/icons";
import { useCurrenciesGetAll } from "../../../hooks/useCurrenciesGetAll";
import { useOrdersCreate } from "../../../hooks/useOrdersCreate";
import { useUserDomain } from "../../../hooks/useUserDomain";
import {
  BUTTON_ACCENT,
  BUTTON_SIZE_X_LARGE,
} from "../../../shared/constants/CommonTailwindClasses.constants";
import { ROUTES } from "../../../shared/constants/Routes.constants";
import { USER_DOMAIN } from "../../../shared/enums/UserDomain.enum";
import { customTwMerge } from "../../../shared/utils/Tailwind.util";
import { useCartStore } from "../../../stores/CartStore";

const CartSummary = () => {
  const navigate = useNavigate();
  const userDomain = useUserDomain();

  const totalPrice = useCartStore((state) => state.totalPrice);
  const currencyId = useCartStore((state) => state.currencyId);
  const clearCart = useCartStore((state) => state.clearCart);

  const { data: currencies = [] } = useCurrenciesGetAll();
  const { mutate: createOrder, isPending } = useOrdersCreate();

  const currencyMap = useMemo(() => {
    const map = new Map<number, string>();
    for (const currency of currencies) {
      map.set(currency.id, currency.code);
    }
    return map;
  }, [currencies]);

  const currencyCode = currencyId ? (currencyMap.get(currencyId) ?? "") : "";

  const handleConfirmCart = () => {
    if (userDomain === USER_DOMAIN.GUEST) {
      navigate(ROUTES.AUTH_PAGE.build());
      return;
    }

    createOrder(undefined, {
      onSuccess: (data) => {
        clearCart();
        navigate(ROUTES.CHECKOUT_PAGE.build(data.id));
      },
    });
  };

  return (
    <div
      className={customTwMerge(
        "bg-surface-primary border-border-secondary flex flex-col border-t",
        "fixed inset-x-0 bottom-0 z-10 w-full shrink-0",
        "gap-4 p-4 lg:static lg:w-[340px] lg:gap-6 lg:rounded-lg lg:border lg:p-6 lg:shadow-lg",
        "xl:w-[440px] xl:gap-8 xl:p-8",
      )}
    >
      <span className="text-text-primary text-s20-l28 lg:text-s22-l28 xl:text-s24-l32 font-bold">
        Cart Summary
      </span>

      <div className="flex items-center justify-between">
        <span className="text-text-secondary text-s14-l20 xl:text-s16-l24">
          Subtotal
        </span>
        <span className="text-text-primary text-s14-l20 xl:text-s16-l24 font-bold">
          {totalPrice.toFixed(2)} {currencyCode}
        </span>
      </div>

      <div className="border-border-primary h-px border-t border-dashed" />

      <div className="flex justify-between font-medium">
        <span className="text-text-muted text-s24-l32 lg:text-s28-l36 xl:text-s32-l40">
          Total
        </span>
        <span className="text-accent text-s24-l32 lg:text-s28-l36 xl:text-s32-l40 font-bold">
          {totalPrice.toFixed(2)} {currencyCode}
        </span>
      </div>

      <button
        type="button"
        onClick={handleConfirmCart}
        disabled={isPending}
        className={customTwMerge(
          BUTTON_ACCENT,
          BUTTON_SIZE_X_LARGE,
          "text-s16-l24 xl:text-s18-l28 h-12 w-full rounded-xl shadow-md xl:h-14",
        )}
      >
        Proceed to Checkout
        <ArrowLeftIcon className="fill-surface-primary h-8 w-8 rotate-180" />
      </button>
    </div>
  );
};

export default CartSummary;
