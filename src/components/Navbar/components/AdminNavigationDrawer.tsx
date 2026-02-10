import BaseNavigationDrawer from "../../../shared/components/BaseNavigationDrawer/BaseNavigationDrawer";
import { ADMIN_ROUTES } from "../../../shared/constants/Routes.constants";

const AdminNavigationDrawer = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <BaseNavigationDrawer open={open} setOpen={setOpen} routes={ADMIN_ROUTES} />
  );
};

export default AdminNavigationDrawer;
