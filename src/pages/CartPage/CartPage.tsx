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
    <div className="mx-auto max-w-7xl px-6 py-10">
      {cartItems.length !== 0 ? (
        <>
          <h1 className="mb-8 text-2xl font-semibold">
            My Cart ({cartItems.length} Product)
          </h1>

          <div className="flex gap-x-8">
            <CartItemsList />
            <CartSummary onOrderCreated={openOrderPaymentDialog} />
          </div>
        </>
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
