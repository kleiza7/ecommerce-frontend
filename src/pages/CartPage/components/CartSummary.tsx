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
        "bg-surface-primary border-border-secondary flex flex-col gap-8 border-t p-8",
        "w-full shrink-0 lg:w-[440px]",
        "fixed inset-x-0 bottom-0 z-10 lg:static",
        "lg:rounded-lg lg:border lg:shadow-lg",
      )}
    >
      <span className="text-s24-l32 text-text-primary font-bold">
        Cart Summary
      </span>

      <div className="flex items-center justify-between">
        <span className="text-s16-l24 text-text-secondary">Subtotal</span>
        <span className="text-s16-l24 text-text-primary font-bold">
          {totalPrice.toFixed(2)} {currencyCode}
        </span>
      </div>

      <div className="border-border-primary h-px border-t border-dashed" />

      <div className="flex justify-between font-medium">
        <span className="text-text-muted text-s32-l40">Total</span>
        <span className="text-accent text-s32-l40 font-bold">
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
          "text-s18-l28 h-14 w-full rounded-xl shadow-md",
        )}
      >
        Proceed to Checkout
        <ArrowLeftIcon className="fill-surface-primary h-8 w-8 rotate-180" />
      </button>
    </div>
  );
};

export default CartSummary;
