import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrenciesGetAll } from "../../../hooks/useCurrenciesGetAll";
import { useOrdersCreate } from "../../../hooks/useOrdersCreate";
import { useUserDomain } from "../../../hooks/useUserDomain";
import { USER_DOMAIN } from "../../../shared/enums/UserDomain.enum";
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
    <div className="border-gray-2 w-[340px] shrink-0 rounded-lg border bg-white p-6">
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
        className="bg-orange hover:bg-orange-dark text-s18-l28 w-full rounded py-3 font-medium text-white transition-colors disabled:opacity-60"
      >
        Confirm Cart
      </button>
    </div>
  );
};

export default CartSummary;
