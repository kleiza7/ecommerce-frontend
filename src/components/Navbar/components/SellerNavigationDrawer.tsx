import BaseNavigationDrawer from "../../../shared/components/BaseNavigationDrawer/BaseNavigationDrawer";
import { SELLER_ROUTES } from "../../../shared/constants/Routes.constants";

const SellerNavigationDrawer = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <BaseNavigationDrawer
      open={open}
      setOpen={setOpen}
      routes={SELLER_ROUTES}
    />
  );
};

export default SellerNavigationDrawer;
