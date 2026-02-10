import type { Route } from "../../models/Route.model";
import { GenericDrawer } from "../GenericDrawer";
import BaseNavigationDrawerContent from "./components/BaseNavigationDrawerContent";

const BaseNavigationDrawer = ({
  open,
  setOpen,
  routes,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  routes: Route[];
}) => {
  return (
    <GenericDrawer
      open={open}
      onOpenChange={setOpen}
      side="left"
      className="h-svh md:w-1/2!"
      showOverlay={false}
    >
      <BaseNavigationDrawerContent
        routes={routes}
        close={() => setOpen(false)}
      />
    </GenericDrawer>
  );
};

export default BaseNavigationDrawer;
