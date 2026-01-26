import { useCallback } from "react";
import { GenericDrawer } from "../../../shared/components/GenericDrawer";
import OrderPaymentForm from "../../../shared/components/forms/OrderPaymentForm";

const OrderPaymentDrawer = ({
  orderId,
  open,
  setOpen,
}: {
  orderId: number;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const close = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <GenericDrawer
      open={open}
      onOpenChange={setOpen}
      side="bottom"
      className="h-svh p-6 md:h-auto md:rounded-t-xl"
    >
      <OrderPaymentForm orderId={orderId} close={close} />
    </GenericDrawer>
  );
};

export default OrderPaymentDrawer;
