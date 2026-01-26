import { useCallback } from "react";
import { GenericDrawer } from "../../../shared/components/GenericDrawer";
import UpdateProductForm from "../../../shared/components/forms/UpdateProductForm";

const UpdateProductDrawer = ({
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
      className="h-svh p-6 md:h-auto md:rounded-t-xl"
    >
      <UpdateProductForm productId={productId} close={close} />
    </GenericDrawer>
  );
};

export default UpdateProductDrawer;
