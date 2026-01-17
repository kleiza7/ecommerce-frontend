import { useCallback } from "react";
import { GenericDialog } from "../../../shared/components/GenericDialog";
import OrderPaymentForm from "./components/OrderPaymentForm";

const OrderPaymentDialog = ({
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
    <GenericDialog
      open={open}
      onOpenChange={setOpen}
      className="h-[760px] w-[50vw] max-w-none"
    >
      <OrderPaymentForm orderId={orderId} close={close} />
    </GenericDialog>
  );
};

export default OrderPaymentDialog;
