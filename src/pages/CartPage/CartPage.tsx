import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "../../assets/icons";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { MEDIA_QUERY } from "../../shared/constants/MediaQuery.constants";
import { useCartStore } from "../../stores/CartStore";
import CartItemsList from "./components/CartItemsList";
import CartSummary from "./components/CartSummary";
import OrderPaymentDialog from "./components/OrderPaymentDialog";
import OrderPaymentDrawer from "./components/OrderPaymentDrawer";

const CartPage = () => {
  const cartItems = useCartStore((state) => state.items);

  const isMobileOrTablet = useMediaQuery(MEDIA_QUERY.BELOW_LG);

  const [orderId, setOrderId] = useState<number | null>(null);
  const [isOrderPaymentPortalOpen, setIsOrderPaymentPortalOpen] =
    useState(false);

  const openOrderPaymentPortal = (id: number) => {
    setOrderId(id);
    setIsOrderPaymentPortalOpen(true);
  };

  return (
    <div className="mx-auto flex w-full max-w-[1380px] flex-col px-10 pt-6 pb-64 lg:py-14">
      {cartItems.length !== 0 ? (
        <div className="flex flex-col gap-6 lg:gap-8">
          <span className="text-s24-l32 font-semibold">
            My Cart ({cartItems.length} Product)
          </span>

          <div className="flex items-start gap-x-5">
            <CartItemsList />
            <CartSummary onOrderCreated={openOrderPaymentPortal} />
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
            to="/products"
            className="bg-orange hover:bg-orange-dark text-surface-primary rounded-lg px-6 py-3 font-semibold transition"
          >
            Start Shopping
          </Link>
        </div>
      )}

      {orderId &&
        (isMobileOrTablet ? (
          <OrderPaymentDrawer
            orderId={orderId}
            open={isOrderPaymentPortalOpen}
            setOpen={setIsOrderPaymentPortalOpen}
          />
        ) : (
          <OrderPaymentDialog
            orderId={orderId}
            open={isOrderPaymentPortalOpen}
            setOpen={setIsOrderPaymentPortalOpen}
          />
        ))}
    </div>
  );
};

export default CartPage;
