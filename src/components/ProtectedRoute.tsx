import { Navigate, Outlet } from "react-router-dom";
import { useUserDomain } from "../hooks/useUserDomain";
import { USER_DOMAIN } from "../shared/enums/UserDomain.enum";

const ProtectedRoute = ({
  allowedDomains,
}: {
  allowedDomains: USER_DOMAIN[];
}) => {
  const userDomain = useUserDomain();

  return allowedDomains.includes(userDomain) ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRoute;
