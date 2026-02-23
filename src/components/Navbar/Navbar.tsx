import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MenuIcon } from "../../assets/icons";
import { useUserDomain } from "../../hooks/useUserDomain";
import { ROUTES } from "../../shared/constants/Routes.constants";
import { USER_DOMAIN } from "../../shared/enums/UserDomain.enum";
import { useUserStore } from "../../stores/UserStore";
import AdminNavigationDrawer from "./components/AdminNavigationDrawer";
import AuthPageLink from "./components/AuthPageLink";
import CategoriesMegaMenu from "./components/CategoriesMegaMenu/CategoriesMegaMenu";
import CategoriesNavigationDrawer from "./components/CategoriesNavigationDrawer/CategoriesNavigationDrawer";
import GlobalSearchInput from "./components/GlobalSearchInput";
import MyCartLink from "./components/MyCartLink";
import MyFavoritesLink from "./components/MyFavoritesLink";
import ParentCategories from "./components/ParentCategories";
import SellerNavigationDrawer from "./components/SellerNavigationDrawer";
import UserNavigationMenu from "./components/UserNavigationMenu";

const Navbar = () => {
  const userDomain = useUserDomain();
  const user = useUserStore((state) => state.user);

  const isAuthenticated = Boolean(user);
  const isGuestOrUser =
    userDomain === USER_DOMAIN.GUEST || userDomain === USER_DOMAIN.USER;
  const isSeller = userDomain === USER_DOMAIN.SELLER;
  const isAdmin = userDomain === USER_DOMAIN.ADMIN;

  const [
    isCategoriesNavigationDrawerOpen,
    setIsCategoriesNavigationDrawerOpen,
  ] = useState(false);
  const [isSellerNavigationDrawerOpen, setIsSellerNavigationDrawerOpen] =
    useState(false);
  const [isAdminNavigationDrawerOpen, setIsAdminNavigationDrawerOpen] =
    useState(false);

  const handleMenuClick = () => {
    if (isGuestOrUser) {
      setIsCategoriesNavigationDrawerOpen(true);
      return;
    }

    if (isSeller) {
      setIsSellerNavigationDrawerOpen(true);
      return;
    }

    if (isAdmin) {
      setIsAdminNavigationDrawerOpen(true);
    }
  };

  return (
    <>
      <header className="border-border-primary border-b pt-4 shadow-sm md:pt-5">
        <div className="mx-auto w-full max-w-[1800px] px-3 lg:px-10">
          <div className="flex flex-col gap-y-4 pb-4 lg:gap-y-0 lg:pb-0">
            <div className="flex items-center justify-between gap-x-16 lg:h-[72px]">
              <div className="flex shrink-0 items-center gap-x-1 select-none">
                <button
                  type="button"
                  onClick={handleMenuClick}
                  className="lg:hidden"
                >
                  <MenuIcon className="fill-text-primary" />
                </button>

                <NavLink
                  to={ROUTES.HOME_PAGE.build()}
                  className="text-s20-l28 md:text-s28-l36 xl:text-s48-l56 text-text-primary"
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
                {isAuthenticated ? <UserNavigationMenu /> : <AuthPageLink />}

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
        </div>

        {isGuestOrUser && (
          <div className="flex justify-center">
            <div className="border-border-secondary w-full max-w-[1800px] border-t">
              <div className="mx-auto w-full px-3 lg:px-10">
                <div className="flex h-12 items-center gap-x-8 overflow-hidden lg:overflow-visible">
                  <div className="hidden shrink-0 items-center gap-x-8 lg:flex">
                    <CategoriesMegaMenu />
                    <div className="border-border-secondary h-12 w-px border-l" />
                  </div>

                  <ParentCategories />
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {isGuestOrUser && (
        <CategoriesNavigationDrawer
          open={isCategoriesNavigationDrawerOpen}
          setOpen={setIsCategoriesNavigationDrawerOpen}
        />
      )}

      {isSeller && (
        <SellerNavigationDrawer
          open={isSellerNavigationDrawerOpen}
          setOpen={setIsSellerNavigationDrawerOpen}
        />
      )}

      {isAdmin && (
        <AdminNavigationDrawer
          open={isAdminNavigationDrawerOpen}
          setOpen={setIsAdminNavigationDrawerOpen}
        />
      )}
    </>
  );
};

export default Navbar;
