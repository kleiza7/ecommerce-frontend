import { useCallback } from "react";
import { GenericDialog } from "../../../shared/components/GenericDialog";
import NewProductForm from "../../../shared/components/forms/NewProductForm";

const NewProductDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const close = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <GenericDialog open={open} onOpenChange={setOpen}>
      <NewProductForm close={close} />
    </GenericDialog>
  );
};

export default NewProductDialog;
