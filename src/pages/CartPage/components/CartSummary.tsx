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
    <div className="border-gray-2 bg-surface-primary w-[340px] shrink-0 rounded-lg border p-6">
      <h2 className="text-s22-l28 mb-4 font-medium">Cart Summary</h2>

      <div className="text-s14-l20 flex justify-between text-gray-600">
        <span>Subtotal</span>
        <span>
          {totalPrice.toFixed(2)} {currencyCode}
        </span>
      </div>

      <div className="my-4 h-px bg-gray-200" />

      <div className="mb-4 flex justify-between font-medium">
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
