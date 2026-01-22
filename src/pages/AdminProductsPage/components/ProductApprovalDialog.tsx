import { useCallback } from "react";
import { GenericDialog } from "../../../shared/components/GenericDialog";
import ProductApprovalForm from "../../../shared/components/forms/ProductApprovalForm";

const ProductApprovalDialog = ({
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
    <GenericDialog open={open} onOpenChange={setOpen} className="h-[772px]">
      <ProductApprovalForm productId={productId} close={close} />
    </GenericDialog>
  );
};

export default ProductApprovalDialog;
