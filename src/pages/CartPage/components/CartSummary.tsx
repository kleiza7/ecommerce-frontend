import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrenciesGetAll } from "../../../hooks/useCurrenciesGetAll";
import { useOrdersCreate } from "../../../hooks/useOrdersCreate";
import { useUserDomain } from "../../../hooks/useUserDomain";
import {
  BUTTON_PRIMARY,
  BUTTON_SIZE_X_LARGE,
} from "../../../shared/constants/CommonTailwindClasses.constants";
import { USER_DOMAIN } from "../../../shared/enums/UserDomain.enum";
import { customTwMerge } from "../../../shared/utils/Tailwind.util";
import { useCartStore } from "../../../stores/CartStore";

const CartSummary = ({
  onOrderCreated,
}: {
  onOrderCreated: (orderId: number) => void;
}) => {
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
      navigate("/auth");
      return;
    }

    createOrder(undefined, {
      onSuccess: (data) => {
        onOrderCreated(data.id);
        clearCart();
      },
    });
  };

  return (
    <div
      className={customTwMerge(
        "border-gray-2 bg-surface-primary flex flex-col gap-4 rounded-lg border p-6",
        "w-full shrink-0 lg:w-[350px]",
        "fixed right-0 bottom-0 left-0 z-50 lg:static",
        "lg:border-gray-2 border-gray-2 rounded-t-lg border-t lg:rounded-lg lg:border",
      )}
    >
      <h2 className="text-s22-l28 font-medium">Cart Summary</h2>

      <div className="text-s14-l20 text-gray-9 flex justify-between">
        <span>Subtotal</span>
        <span>
          {totalPrice.toFixed(2)} {currencyCode}
        </span>
      </div>

      <div className="bg-gray-5 h-px" />

      <div className="flex justify-between font-medium">
        <span>Total</span>
        <span className="text-orange">
          {totalPrice.toFixed(2)} {currencyCode}
        </span>
      </div>

      <button
        type="button"
        onClick={handleConfirmCart}
        disabled={isPending}
        className={customTwMerge(
          BUTTON_PRIMARY,
          BUTTON_SIZE_X_LARGE,
          "text-s18-l28 h-[52px] w-full rounded",
        )}
      >
        Confirm Cart
      </button>
    </div>
  );
};

export default CartSummary;
