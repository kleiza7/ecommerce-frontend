import { NavLink } from "react-router-dom";
import { useUserDomain } from "../../hooks/useUserDomain";
import { USER_DOMAIN } from "../../shared/enums/UserDomain.enum";
import { useUserStore } from "../../stores/UserStore";
import AuthPopover from "./components/AuthPopover";
import CartLink from "./components/CartLink";
import CategoriesMegaMenu from "./components/CategoriesMegaMenu/CategoriesMegaMenu";
import UserPopover from "./components/UserPopover";

const Navbar = () => {
  const userDomain = useUserDomain();
  const user = useUserStore((state) => state.user);

  const isAuthenticated = Boolean(user);
  const isGuestOrUser =
    userDomain === USER_DOMAIN.GUEST || userDomain === USER_DOMAIN.USER;

  return (
    <header className="border-gray-1 border-b pt-5">
      <div className="w-full px-10 2xl:mx-auto 2xl:max-w-[1536px] 2xl:px-0">
        <div className="flex h-[72px] items-center justify-between">
          <NavLink
            to="/dashboard"
            className="text-s48-l56 text-text-primary select-none"
          >
            Ecommerce
          </NavLink>

          <div className="flex gap-x-6">
            {isAuthenticated ? <UserPopover /> : <AuthPopover />}
            {isGuestOrUser && <CartLink />}
          </div>
        </div>

        {isGuestOrUser && <CategoriesMegaMenu />}
      </div>
    </header>
  );
};

export default Navbar;
