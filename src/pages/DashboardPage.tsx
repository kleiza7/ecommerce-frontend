import { Navigate } from "react-router-dom";
import { useUserDomain } from "../hooks/useUserDomain";
import { USER_DOMAIN } from "../shared/enums/UserDomain.enum";

const DashboardPage = () => {
  const userDomain = useUserDomain();

  switch (userDomain) {
    case USER_DOMAIN.SELLER:
      return <Navigate to="/seller/products" replace />;

    case USER_DOMAIN.ADMIN:
      return <Navigate to="/admin/products" replace />;

    case USER_DOMAIN.GUEST:
    case USER_DOMAIN.USER:
    default:
      return <Navigate to="/products" replace />;
  }
};

export default DashboardPage;
