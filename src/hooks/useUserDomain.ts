import { USER_ROLE } from "../api/enums/UserRole.enum";
import { USER_DOMAIN } from "../shared/enums/UserDomain.enum";
import { useUserStore } from "../stores/UserStore";

export const useUserDomain = (): USER_DOMAIN => {
  const userRole = useUserStore((state) => state.user?.role);

  if (!userRole) {
    return USER_DOMAIN.GUEST;
  }

  switch (userRole) {
    case USER_ROLE.SELLER:
      return USER_DOMAIN.SELLER;

    case USER_ROLE.ADMIN:
      return USER_DOMAIN.ADMIN;

    case USER_ROLE.USER:
    default:
      return USER_DOMAIN.USER;
  }
};
