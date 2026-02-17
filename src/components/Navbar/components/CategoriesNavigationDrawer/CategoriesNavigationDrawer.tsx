import { GenericDrawer } from "../../../../shared/components/GenericDrawer";
import CategoriesNavigationDrawerContent from "./components/CategoriesNavigationDrawerContent";

const CategoriesNavigationDrawer = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <GenericDrawer
      open={open}
      onOpenChange={setOpen}
      side="left"
      className="h-svh sm:w-1/2!"
      showOverlay={false}
    >
      <CategoriesNavigationDrawerContent close={() => setOpen(false)} />
    </GenericDrawer>
  );
};

export default CategoriesNavigationDrawer;
