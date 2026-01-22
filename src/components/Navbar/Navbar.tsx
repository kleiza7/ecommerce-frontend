import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MenuIcon } from "../../assets/icons";
import { useUserDomain } from "../../hooks/useUserDomain";
import { USER_DOMAIN } from "../../shared/enums/UserDomain.enum";
import { useUserStore } from "../../stores/UserStore";
import AuthNavigationMenu from "./components/AuthNavigationMenu";
import CategoriesDrawer from "./components/CategoriesDrawer";
import CategoriesMegaMenu from "./components/CategoriesMegaMenu/CategoriesMegaMenu";
import GlobalSearchInput from "./components/GlobalSearchInput";
import MyCartLink from "./components/MyCartLink";
import MyFavoritesLink from "./components/MyFavoritesLink";
import ParentCategories from "./components/ParentCategories";
import UserNavigationMenu from "./components/UserNavigationMenu";

const Navbar = () => {
  const userDomain = useUserDomain();
  const user = useUserStore((state) => state.user);

  const isAuthenticated = Boolean(user);
  const isGuestOrUser =
    userDomain === USER_DOMAIN.GUEST || userDomain === USER_DOMAIN.USER;

  const [isCategoriesDrawerOpen, setIsCategoriesDrawerOpen] = useState(false);

  return (
    <>
      <header className="border-gray-1 border-b pt-5">
        <div className="mx-auto w-full max-w-[1800px] px-3 lg:px-10">
          <div className="flex flex-col gap-y-4 pb-4 lg:gap-y-0 lg:pb-0">
            <div className="flex items-center justify-between gap-x-16 lg:h-[72px]">
              <div className="flex shrink-0 items-center gap-x-1 select-none">
                {isGuestOrUser && (
                  <button
                    type="button"
                    onClick={() => setIsCategoriesDrawerOpen(true)}
                    className="lg:hidden"
                  >
                    <MenuIcon className="fill-text-primary" />
                  </button>
                )}

                <NavLink
                  to="/"
                  className="text-s28-l36 xl:text-s48-l56 text-text-primary"
                >
                  Ecommerce
                </NavLink>
              </div>

              {isGuestOrUser && (
                <div className="hidden flex-1 lg:flex">
                  <GlobalSearchInput />
                </div>
              )}

              <div className="flex shrink-0 gap-x-6">
                {isAuthenticated ? (
                  <UserNavigationMenu />
                ) : (
                  <AuthNavigationMenu />
                )}

                {isGuestOrUser && (
                  <>
                    <MyFavoritesLink />
                    <MyCartLink />
                  </>
                )}
              </div>
            </div>

            {isGuestOrUser && (
              <div className="lg:hidden">
                <GlobalSearchInput />
              </div>
            )}
          </div>

          {isGuestOrUser && (
            <div className="flex h-8 items-center gap-x-6 overflow-hidden">
              <div className="hidden shrink-0 lg:flex">
                <CategoriesMegaMenu />
              </div>

              <ParentCategories />
            </div>
          )}
        </div>
      </header>

      {isGuestOrUser && (
        <CategoriesDrawer
          open={isCategoriesDrawerOpen}
          onOpenChange={setIsCategoriesDrawerOpen}
        />
      )}
    </>
  );
};

export default Navbar;
