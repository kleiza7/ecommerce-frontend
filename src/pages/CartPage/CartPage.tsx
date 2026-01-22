import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "../../assets/icons";
import { useCartStore } from "../../stores/CartStore";
import CartItemsList from "./components/CartItemsList";
import CartSummary from "./components/CartSummary";
import OrderPaymentDialog from "./OrderPaymentDialog/OrderPaymentDialog";

const CartPage = () => {
  const cartItems = useCartStore((state) => state.items);

  const [orderId, setOrderId] = useState<number | null>(null);
  const [isOrderPaymentDialogOpen, setIsOrderPaymentDialogOpen] =
    useState(false);

  const openOrderPaymentDialog = (id: number) => {
    setOrderId(id);
    setIsOrderPaymentDialogOpen(true);
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
            <CartSummary onOrderCreated={openOrderPaymentDialog} />
          </div>
        </div>
      ) : (
        <div className="border-gray-2 bg-surface-primary flex items-center justify-between rounded-xl border p-5">
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
            className="bg-orange hover:bg-orange-dark text-surface-primary rounded-lg px-6 py-3 font-semibold transition"
          >
            Start Shopping
          </Link>
        </div>
      )}

      {orderId && (
        <OrderPaymentDialog
          orderId={orderId}
          open={isOrderPaymentDialogOpen}
          setOpen={setIsOrderPaymentDialogOpen}
        />
      )}
    </div>
  );
};

export default CartPage;
