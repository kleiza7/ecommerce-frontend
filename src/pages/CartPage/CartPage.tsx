import { Link } from "react-router-dom";
import { ShoppingCartIcon, TrashSweepIcon } from "../../assets/icons";
import {
  BUTTON_PRIMARY,
  BUTTON_SIZE_X_LARGE,
} from "../../shared/constants/CommonTailwindClasses.constants";
import { ROUTES } from "../../shared/constants/Routes.constants";
import { customTwMerge } from "../../shared/utils/Tailwind.util";
import { useCartStore } from "../../stores/CartStore";
import CartItemsList from "./components/CartItemsList";
import CartSummary from "./components/CartSummary";

const CartPage = () => {
  const cartItems = useCartStore((state) => state.items);

  return (
    <div className="mx-auto flex w-full max-w-[1380px] flex-col px-3 pt-3 pb-64 md:px-10 md:pt-6 lg:py-10">
      {cartItems.length !== 0 ? (
        <div className="flex items-start gap-x-20">
          <div className="flex flex-1 flex-col gap-4 md:gap-6 lg:gap-10">
            <div className="flex items-end justify-between">
              <div className="flex items-end gap-x-2">
                <span className="text-s32-l40 text-text-primary leading-none font-semibold">
                  My Cart
                </span>

                <span className="text-s18-l28 text-text-disabled">
                  ({cartItems.length}{" "}
                  {cartItems.length > 1 ? "Products" : "Product"})
                </span>
              </div>

              {/* // TODO: Implement remove all functionality */}
              <button className="flex cursor-pointer items-center gap-x-1">
                <TrashSweepIcon className="fill-text-muted h-5 w-5" />
                <span className="text-s14-l20 text-text-muted font-medium">
                  Remove all
                </span>
              </button>
            </div>
            <CartItemsList />
          </div>
          <CartSummary />
        </div>
      ) : (
        <div className="mx-auto flex flex-1 flex-col items-center justify-center gap-6 text-center">
          <div className="bg-primary/10 flex h-18 w-18 items-center justify-center rounded-full">
            <ShoppingCartIcon className="fill-primary h-9 w-9" />
          </div>

          <span className="text-s18-l28 text-primary font-medium">
            Your cart is empty.
          </span>

          <Link
            to={ROUTES.PRODUCTS_PAGE.build()}
            className={customTwMerge(BUTTON_PRIMARY, BUTTON_SIZE_X_LARGE)}
          >
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
