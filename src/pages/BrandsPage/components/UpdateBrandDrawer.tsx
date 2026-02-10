import { useCallback } from "react";
import { GenericDrawer } from "../../../shared/components/GenericDrawer";
import UpdateBrandForm from "../../../shared/components/forms/UpdateBrandForm";

const UpdateBrandDrawer = ({
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
    <GenericDrawer
      open={open}
      onOpenChange={setOpen}
      side="bottom"
      className="h-svh p-6 md:h-auto md:rounded-t-xl"
    >
      <UpdateBrandForm brandId={brandId} close={close} />
    </GenericDrawer>
  );
};

export default UpdateBrandDrawer;
