import { Navigate, Outlet } from "react-router-dom";
import { useUserDomain } from "../hooks/useUserDomain";
import { USER_DOMAIN } from "../shared/enums/UserDomain.enum";

const ProtectedRoute = ({
  allowedDomains,
}: {
  allowedDomains: USER_DOMAIN[];
}) => {
  const userDomain = useUserDomain();

  if (userDomain === null) {
    return null;
  }

  return allowedDomains.includes(userDomain) ? (
    <Outlet />
  ) : (
    <Navigate to="/auth" replace />
  );
};

export default ProtectedRoute;
