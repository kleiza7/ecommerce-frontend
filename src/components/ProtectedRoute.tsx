// src/routes/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useUserDomain } from "../hooks/useUserDomain";
import { USER_DOMAIN } from "../shared/enums/UserDomain.enum";

const ProtectedRoute = ({ allowedDomain }: { allowedDomain: USER_DOMAIN }) => {
  const userDomain = useUserDomain();

  switch (allowedDomain) {
    case USER_DOMAIN.SELLER:
      return userDomain === USER_DOMAIN.SELLER ? (
        <Outlet />
      ) : (
        <Navigate to="/" replace />
      );

    case USER_DOMAIN.ADMIN:
      return userDomain === USER_DOMAIN.ADMIN ? (
        <Outlet />
      ) : (
        <Navigate to="/" replace />
      );

    case USER_DOMAIN.PUBLIC:
      return userDomain === USER_DOMAIN.PUBLIC ? (
        <Outlet />
      ) : (
        <Navigate to="/" replace />
      );

    default:
      return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
