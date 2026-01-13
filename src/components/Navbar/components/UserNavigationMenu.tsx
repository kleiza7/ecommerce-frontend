import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogoutIcon,
  PackageIcon,
  UserFilledIcon,
  UserIcon,
} from "../../../assets/icons";
import GenericNavigationMenu from "../../../shared/components/GenericNavigationMenu";
import { useCartStore } from "../../../stores/CartStore";
import { useFavoriteStore } from "../../../stores/FavoriteStore";
import { useUserStore } from "../../../stores/UserStore";

const UserNavigationMenu = () => {
  const navigate = useNavigate();

  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const clearCartStore = useCartStore((state) => state.clearCart);
  const clearFavoritesStore = useFavoriteStore((state) => state.clearFavorites);

  const [open, setOpen] = useState(false);

  const handleNavigateMyOrders = useCallback(() => {
    setOpen(false);
    navigate("/my-orders");
  }, [navigate]);

  const handleLogout = useCallback(() => {
    setOpen(false);
    logout();
    clearCartStore();
    clearFavoritesStore();
    navigate("/dashboard", { replace: true });
  }, [logout, clearCartStore, clearFavoritesStore, navigate]);

  return (
    <GenericNavigationMenu
      open={open}
      setOpen={setOpen}
      withOverlay={false}
      contentAlign="center"
      className="border-orange border"
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
            className={`text-s14-l20 font-semibold transition-colors ${
              open ? "text-orange" : "text-text-primary group-hover:text-orange"
            }`}
          >
            My Account
          </span>
        </button>
      }
    >
      <div className="flex min-w-40 flex-col">
        <div className="border-gray-2 border-b px-4 py-3">
          <span
            className="text-s14-l20 text-orange block max-w-full truncate font-semibold"
            title={user?.name}
          >
            {user?.name}
          </span>
        </div>

        <button
          type="button"
          onClick={handleNavigateMyOrders}
          className="text-s14-l20 text-text-primary hover:bg-gray-1 flex items-center gap-x-3 px-4 py-3 transition-colors"
        >
          <PackageIcon className="fill-text-primary h-4 w-4" />
          <span>My Orders</span>
        </button>

        <button
          type="button"
          onClick={handleLogout}
          className="text-s14-l20 text-text-primary hover:bg-gray-1 flex items-center gap-x-3 px-4 py-3 transition-colors"
        >
          <LogoutIcon className="fill-text-primary h-4 w-4" />
          <span>Log Out</span>
        </button>
      </div>
    </GenericNavigationMenu>
  );
};

export default UserNavigationMenu;
