import { useNavigate } from "react-router-dom";

import { LogoutIcon, UserIcon } from "../../../assets/icons";
import {
  GenericPopover,
  GenericPopoverClose,
} from "../../../shared/components/GenericPopover";
import { useCartStore } from "../../../stores/CartStore";
import { useUserStore } from "../../../stores/UserStore";

const UserPopover = () => {
  const navigate = useNavigate();

  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const clearCartStore = useCartStore((state) => state.clearCart);

  const handleLogout = () => {
    logout();

    clearCartStore();

    navigate("/dashboard", { replace: true });
  };

  return (
    <GenericPopover
      align="end"
      side="bottom"
      className="border-orange border"
      trigger={
        <button
          type="button"
          className="group flex cursor-pointer items-center gap-x-2 transition-colors"
        >
          <UserIcon className="fill-text-primary group-hover:fill-orange h-6 w-6 transition-colors" />
          <span className="text-s14-l20 text-text-primary group-hover:text-orange font-semibold transition-colors">
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

        <GenericPopoverClose asChild>
          <button
            type="button"
            onClick={handleLogout}
            className="text-s14-l20 text-text-primary hover:bg-gray-1 flex cursor-pointer items-center gap-x-3 px-4 py-3 transition-colors"
          >
            <LogoutIcon className="fill-text-primary h-4 w-4" />
            <span>Log Out</span>
          </button>
        </GenericPopoverClose>
      </div>
    </GenericPopover>
  );
};

export default UserPopover;
