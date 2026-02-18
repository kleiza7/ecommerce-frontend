import { useCallback } from "react";
import { GenericDialog } from "../../GenericDialog";
import GenericConfirmationContent from "./GenericConfirmationContent";

const GenericConfirmationDialog = ({
  open,
  setOpen,
  title,
  description,
  onConfirm,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  description: string;
  onConfirm: () => void;
}) => {
  const close = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <GenericDialog open={open} onOpenChange={setOpen}>
      <GenericConfirmationContent
        title={title}
        description={description}
        close={close}
        onConfirm={onConfirm}
      />
    </GenericDialog>
  );
};

export default GenericConfirmationDialog;
