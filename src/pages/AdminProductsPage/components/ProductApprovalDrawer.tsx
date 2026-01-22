import { useCallback } from "react";
import { GenericDrawer } from "../../../shared/components/GenericDrawer";
import ProductApprovalForm from "../../../shared/components/forms/ProductApprovalForm";

const ProductApprovalDrawer = ({
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
    <GenericDrawer
      open={open}
      onOpenChange={setOpen}
      side="bottom"
      className="max-h-svh rounded-t-xl p-6"
    >
      <ProductApprovalForm productId={productId} close={close} />
    </GenericDrawer>
  );
};

export default ProductApprovalDrawer;
