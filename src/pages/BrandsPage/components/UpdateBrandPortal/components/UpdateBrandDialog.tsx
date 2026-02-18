import { useCallback } from "react";
import { GenericDialog } from "../../../../../shared/components/GenericDialog";
import UpdateBrandForm from "../../../../../shared/components/forms/UpdateBrandForm";

const UpdateBrandDialog = ({
  open,
  setOpen,
  brandId,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  brandId: number;
}) => {
  const close = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <GenericDialog open={open} onOpenChange={setOpen}>
      <UpdateBrandForm brandId={brandId} close={close} />
    </GenericDialog>
  );
};

export default UpdateBrandDialog;
