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
    navigate("/my-orders");
  }, [navigate]);

  const handleLogout = useCallback(() => {
    setOpen(false);
    logout();
    clearCartStore();
    clearFavoritesStore();
    navigate("/", { replace: true });
  }, [logout, clearCartStore, clearFavoritesStore, navigate]);

  return (
    <GenericNavigationMenu
      open={open}
      setOpen={setOpen}
      withOverlay={false}
      contentAlign="center"
      className="border-orange w-[200px] overflow-hidden border p-0"
      trigger={
        <button
          type="button"
          className="group flex cursor-pointer items-center gap-x-2 transition-colors"
        >
          {open ? (
            <UserFilledIcon className="fill-orange h-6 w-6 transition-colors" />
          ) : (
            <>
              <UserIcon className="fill-text-primary h-6 w-6 transition-colors group-hover:hidden" />
              <UserFilledIcon className="fill-orange hidden h-6 w-6 transition-colors group-hover:block" />
            </>
          )}

          <span
            className={`text-s14-l20 hidden font-semibold transition-colors xl:inline ${
              open ? "text-orange" : "text-text-primary group-hover:text-orange"
            }`}
          >
            My Account
          </span>
        </button>
      }
    >
      <div className="flex flex-col">
        <span
          className="text-s14-l20 text-orange block max-w-full truncate px-4 pt-3 pb-1 font-semibold"
          title={user?.name}
        >
          {user?.name}
        </span>

        {isUser && (
          <button
            type="button"
            onClick={handleNavigateMyOrders}
            className="hover:bg-orange/10 group flex cursor-pointer items-center gap-x-3 px-4 py-2.5 transition-colors"
          >
            <PackageIcon className="fill-text-primary group-hover:fill-orange h-4 w-4" />
            <span className="text-s12-l16 text-text-primary group-hover:text-orange">
              My Orders
            </span>
          </button>
        )}

        <button
          type="button"
          onClick={handleLogout}
          className="hover:bg-orange/10 group flex cursor-pointer items-center gap-x-3 px-4 py-2.5 transition-colors"
        >
          <LogoutIcon className="fill-text-primary group-hover:fill-orange h-4 w-4" />
          <span className="text-s12-l16 text-text-primary group-hover:text-orange">
            Log Out
          </span>
        </button>
      </div>
    </GenericNavigationMenu>
  );
};

export default UserNavigationMenu;
