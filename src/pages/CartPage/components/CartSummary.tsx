import { useNavigate } from "react-router-dom";
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
  const clearCart = useCartStore((state) => state.clearCart);

  const { mutate: createOrder, isPending } = useOrdersCreate();

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
    <div className="w-[340px] shrink-0 rounded-lg border bg-white p-6">
      <h2 className="text-s18-l28 mb-4 font-semibold">Cart Summary</h2>

      <div className="text-s14-l20 flex justify-between text-gray-600">
        <span>Subtotal</span>
        <span>{totalPrice.toFixed(2)} TL</span>
      </div>

      <div className="my-4 h-px bg-gray-200" />

      <div className="mb-4 flex justify-between font-semibold">
        <span>Total</span>
        <span className="text-orange">{totalPrice.toFixed(2)} TL</span>
      </div>

      <button
        type="button"
        onClick={handleConfirmCart}
        disabled={isPending}
        className="bg-orange hover:bg-orange-dark w-full rounded py-3 font-semibold text-white transition-colors disabled:opacity-60"
      >
        Confirm Cart
      </button>
    </div>
  );
};

export default CartSummary;
