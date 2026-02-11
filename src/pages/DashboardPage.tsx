import { Navigate } from "react-router-dom";
import { useUserDomain } from "../hooks/useUserDomain";
import { ROUTES } from "../shared/constants/Routes.constants";
import { USER_DOMAIN } from "../shared/enums/UserDomain.enum";

const DashboardPage = () => {
  const userDomain = useUserDomain();

  switch (userDomain) {
    case USER_DOMAIN.SELLER:
      return <Navigate to={ROUTES.SELLER_PRODUCTS_PAGE.build()} replace />;

    case USER_DOMAIN.ADMIN:
      return <Navigate to={ROUTES.ADMIN_PRODUCTS_PAGE.build()} replace />;

    case USER_DOMAIN.GUEST:
    case USER_DOMAIN.USER:
    default:
      return <Navigate to={ROUTES.PRODUCTS_PAGE.build()} replace />;
  }
};

export default DashboardPage;
