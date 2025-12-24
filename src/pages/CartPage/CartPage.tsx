import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "../../assets/icons";
import { useCartStore } from "../../stores/CartStore";
import CartItemsList from "./components/CartItemsList";
import CartSummary from "./components/CartSummary";

const CartPage = () => {
  const cartItems = useCartStore((state) => state.items);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {cartItems.length !== 0 ? (
        <>
          <h1 className="mb-8 text-2xl font-semibold">
            My Cart ({cartItems.length} Product)
          </h1>

          <div className="flex gap-x-8">
            <CartItemsList />
            <CartSummary />
          </div>
        </>
      ) : (
        <div className="border-gray-2 flex items-center justify-between rounded-xl border bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="bg-orange/10 flex h-[68px] w-[68px] items-center justify-center rounded-full">
              <ShoppingCartIcon className="fill-orange h-7 w-7" />
            </div>

            <span className="text-text-primary text-s24-l32 font-semibold">
              Your cart is empty.
            </span>
          </div>

          <Link
            to="/products"
            className="bg-orange hover:bg-orange-dark rounded-lg px-6 py-3 font-semibold text-white transition"
          >
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
