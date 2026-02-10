import { useCallback } from "react";
import { GenericDrawer } from "../../../shared/components/GenericDrawer";
import NewBrandForm from "../../../shared/components/forms/NewBrandForm";

const NewBrandDrawer = ({
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
      <NewBrandForm close={close} />
    </GenericDrawer>
  );
};

export default NewBrandDrawer;
