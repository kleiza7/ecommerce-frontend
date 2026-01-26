import { useCallback } from "react";
import { GenericDrawer } from "../../../shared/components/GenericDrawer";
import NewProductForm from "../../../shared/components/forms/NewProductForm";

const NewProductDrawer = ({
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
    <GenericDrawer
      open={open}
      onOpenChange={setOpen}
      side="bottom"
      className="h-svh p-6 md:h-auto md:rounded-t-xl"
    >
      <NewProductForm close={close} />
    </GenericDrawer>
  );
};

export default NewProductDrawer;
