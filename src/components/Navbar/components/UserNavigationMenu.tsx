import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogoutIcon,
  PackageIcon,
  UserFilledIcon,
  UserIcon,
} from "../../../assets/icons";
import { useUserDomain } from "../../../hooks/useUserDomain";
import GenericNavigationMenu from "../../../shared/components/GenericNavigationMenu";
import { ROUTES } from "../../../shared/constants/Routes.constants";
import { USER_DOMAIN } from "../../../shared/enums/UserDomain.enum";
import { useCartStore } from "../../../stores/CartStore";
import { useFavoriteStore } from "../../../stores/FavoriteStore";
import { useUserStore } from "../../../stores/UserStore";

const UserNavigationMenu = () => {
  const navigate = useNavigate();

  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const clearCartStore = useCartStore((state) => state.clearCart);
  const clearFavoritesStore = useFavoriteStore((state) => state.clearFavorites);
  const userDomain = useUserDomain();

  const [open, setOpen] = useState(false);

  const isUser = userDomain === USER_DOMAIN.USER;

  const handleNavigateMyOrders = useCallback(() => {
    setOpen(false);
    navigate(ROUTES.MY_ORDERS_PAGE.build());
  }, [navigate]);

  const handleLogout = useCallback(() => {
    setOpen(false);
    logout();
    clearCartStore();
    clearFavoritesStore();
    navigate(ROUTES.HOME_PAGE.build(), { replace: true });
  }, [logout, clearCartStore, clearFavoritesStore, navigate]);

  return (
    <GenericNavigationMenu
      open={open}
      setOpen={setOpen}
      withOverlay={false}
      contentAlign="center"
      className="w-56 px-0 py-2"
      contentOffsetY={16}
      trigger={
        <button
          type="button"
          className="group flex cursor-pointer items-center gap-x-2 transition-colors"
        >
          {open ? (
            <UserFilledIcon className="fill-primary h-6 w-6 transition-colors" />
          ) : (
            <>
              <UserIcon className="fill-text-primary h-6 w-6 transition-colors group-hover:hidden" />
              <UserFilledIcon className="fill-primary hidden h-6 w-6 transition-colors group-hover:block" />
            </>
          )}

          <span
            className={`text-s14-l20 hidden font-semibold transition-colors xl:inline ${
              open
                ? "text-primary"
                : "text-text-primary group-hover:text-primary"
            }`}
          >
            My Account
          </span>
        </button>
      }
    >
      <div className="flex flex-col">
        <span
          className="text-s16-l24 text-primary block max-w-full truncate px-5 py-3 font-semibold"
          title={user?.name}
        >
          {user?.name}
        </span>

        <div className="bg-border-secondary h-px" />

        <div className="flex flex-col px-2 py-1">
          {isUser && (
            <>
              <button
                type="button"
                onClick={handleNavigateMyOrders}
                className="hover:bg-surface-muted flex cursor-pointer items-center gap-x-3 rounded-md px-3 py-2.5 transition-colors"
              >
                <PackageIcon className="fill-text-secondary h-4 w-4" />
                <span className="text-s12-l16 text-text-secondary">
                  My Orders
                </span>
              </button>
              <div className="px-3">
                <div className="bg-border-secondary h-px" />
              </div>
            </>
          )}

          <button
            type="button"
            onClick={handleLogout}
            className="hover:bg-surface-muted flex cursor-pointer items-center gap-x-3 rounded-md px-3 py-2.5 transition-colors"
          >
            <LogoutIcon className="fill-text-secondary h-4 w-4" />
            <span className="text-s12-l16 text-text-secondary">Log Out</span>
          </button>
        </div>
      </div>
    </GenericNavigationMenu>
  );
};

export default UserNavigationMenu;
