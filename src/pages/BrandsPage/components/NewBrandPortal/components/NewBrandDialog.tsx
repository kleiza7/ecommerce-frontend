import { useCallback } from "react";
import { GenericDialog } from "../../../../../shared/components/GenericDialog";
import NewBrandForm from "../../../../../shared/components/forms/NewBrandForm";

const NewBrandDialog = ({
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
      <NewBrandForm close={close} />
    </GenericDialog>
  );
};

export default NewBrandDialog;
