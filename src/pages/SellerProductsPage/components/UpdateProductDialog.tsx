import { useCallback } from "react";
import { GenericDialog } from "../../../shared/components/GenericDialog";
import UpdateProductForm from "../../../shared/components/forms/UpdateProductForm";

const UpdateProductDialog = ({
  open,
  setOpen,
  productId,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  productId: number;
}) => {
  const close = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <GenericDialog open={open} onOpenChange={setOpen}>
      <UpdateProductForm productId={productId} close={close} />
    </GenericDialog>
  );
};

export default UpdateProductDialog;
