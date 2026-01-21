import { NavLink } from "react-router-dom";
import { useUserDomain } from "../../hooks/useUserDomain";
import { USER_DOMAIN } from "../../shared/enums/UserDomain.enum";
import { useUserStore } from "../../stores/UserStore";
import AuthNavigationMenu from "./components/AuthNavigationMenu";
import CategoriesMegaMenu from "./components/CategoriesMegaMenu/CategoriesMegaMenu";
import GlobalSearchInput from "./components/GlobalSearchInput";
import MyCartLink from "./components/MyCartLink";
import MyFavoritesLink from "./components/MyFavoritesLink";
import UserNavigationMenu from "./components/UserNavigationMenu";

const Navbar = () => {
  const userDomain = useUserDomain();
  const user = useUserStore((state) => state.user);

  const isAuthenticated = Boolean(user);
  const isGuestOrUser =
    userDomain === USER_DOMAIN.GUEST || userDomain === USER_DOMAIN.USER;

  return (
    <header className="border-gray-1 border-b pt-5">
      <div className="mx-auto w-full max-w-[1800px] px-10">
        <div className="flex h-[72px] items-center justify-between gap-x-16">
          <NavLink
            to="/"
            className="text-s28-l36 xl:text-s48-l56 text-text-primary shrink-0 select-none"
          >
            Ecommerce
          </NavLink>

          {isGuestOrUser && <GlobalSearchInput />}

          <div className="flex shrink-0 gap-x-6">
            {isAuthenticated ? <UserNavigationMenu /> : <AuthNavigationMenu />}

            {isGuestOrUser && (
              <>
                <MyFavoritesLink />
                <MyCartLink />
              </>
            )}
          </div>
        </div>

        {isGuestOrUser && <CategoriesMegaMenu />}
      </div>
    </header>
  );
};

export default Navbar;
