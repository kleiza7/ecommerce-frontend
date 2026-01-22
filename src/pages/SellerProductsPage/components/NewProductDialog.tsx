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
    <GenericDialog open={open} onOpenChange={setOpen} className="h-[772px]">
      <NewProductForm close={close} />
    </GenericDialog>
  );
};

export default NewProductDialog;
