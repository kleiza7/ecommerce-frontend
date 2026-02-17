import { useCallback } from "react";
import GenericConfirmationDialogContent from "./GenericConfirmationDialogContent";
import { GenericDrawer } from "./GenericDrawer";

const GenericConfirmationDrawer = ({
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
    <GenericDrawer
      open={open}
      onOpenChange={setOpen}
      side="bottom"
      className="rounded-t-xl p-6"
    >
      <GenericConfirmationDialogContent
        title={title}
        description={description}
        close={close}
        onConfirm={onConfirm}
      />
    </GenericDrawer>
  );
};

export default GenericConfirmationDrawer;
