import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "../../assets/icons";
import { ROUTES } from "../../shared/constants/Routes.constants";
import { useCartStore } from "../../stores/CartStore";
import CartItemsList from "./components/CartItemsList";
import CartSummary from "./components/CartSummary";

const CartPage = () => {
  const cartItems = useCartStore((state) => state.items);

  return (
    <div className="mx-auto flex w-full max-w-[1380px] flex-col px-3 pt-3 pb-64 md:px-10 md:pt-6 lg:py-10">
      {cartItems.length !== 0 ? (
        <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
          <span className="text-s24-l32 text-text-primary font-semibold">
            My Cart ({cartItems.length}{" "}
            {cartItems.length > 1 ? "Products" : "Product"})
          </span>

          <div className="flex items-start gap-x-5">
            <CartItemsList />
            <CartSummary />
          </div>
        </div>
      ) : (
        <div className="mx-auto flex flex-1 flex-col items-center justify-center gap-6 text-center">
          <div className="bg-orange/10 flex h-18 w-18 items-center justify-center rounded-full">
            <ShoppingCartIcon className="fill-orange h-9 w-9" />
          </div>

          <span className="text-s18-l28 text-orange font-medium">
            Your cart is empty.
          </span>

          <Link
            to={ROUTES.PRODUCTS_PAGE.build()}
            className="bg-orange hover:bg-orange-dark text-surface-primary rounded-lg px-6 py-3 font-semibold transition"
          >
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
