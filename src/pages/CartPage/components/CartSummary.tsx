import { useCartStore } from "../../../stores/CartStore";

const CartSummary = () => {
  const totalPrice = useCartStore((state) => state.totalPrice);

  return (
    <div className="w-[340px] shrink-0 rounded-lg border bg-white p-6">
      <h2 className="text-s18-l28 mb-4 font-semibold">Cart Summary</h2>

      <div className="text-s14-l20 flex justify-between text-gray-600">
        <span>Subtotal</span>
        {/* TODO: currency */}
        <span>{totalPrice.toFixed(2)} TL</span>
      </div>

      <div className="my-4 h-px bg-gray-200" />

      <div className="mb-4 flex justify-between font-semibold">
        <span>Total</span>
        {/* TODO: currency */}
        <span className="text-orange">{totalPrice.toFixed(2)} TL</span>
      </div>

      <button className="bg-orange hover:bg-orange-dark w-full cursor-pointer rounded py-3 font-semibold text-white transition-colors">
        Confirm Cart
      </button>
    </div>
  );
};

export default CartSummary;
