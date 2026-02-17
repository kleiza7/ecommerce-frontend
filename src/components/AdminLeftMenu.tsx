import BaseLeftMenu from "../shared/components/BaseLeftMenu";
import { ADMIN_ROUTES } from "../shared/constants/Routes.constants";

const AdminLeftMenu = () => {
  return <BaseLeftMenu routes={ADMIN_ROUTES} />;
};

export default AdminLeftMenu;
