import { NavLink } from "react-router-dom";
import { UserFilledIcon, UserIcon } from "../../../assets/icons";
import { ROUTES } from "../../../shared/constants/Routes.constants";
import { AUTH_PAGE_MODE } from "../../../shared/enums/AuthPageMode.enum";

const AuthPageLink = () => {
  return (
    <NavLink
      to={ROUTES.AUTH_PAGE.build(AUTH_PAGE_MODE.LOGIN)}
      className="group flex items-center gap-x-2 transition-colors"
    >
      <UserIcon className="fill-text-primary h-6 w-6 group-hover:hidden" />
      <UserFilledIcon className="fill-primary hidden h-6 w-6 group-hover:block" />

      <span className="text-s14-l20 text-text-primary group-hover:text-primary hidden font-semibold transition-colors xl:inline">
        Log In
      </span>
    </NavLink>
  );
};

export default AuthPageLink;
