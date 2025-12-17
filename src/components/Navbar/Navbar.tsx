import { NavLink } from "react-router-dom";
import { useUserStore } from "../../stores/UserStore";
import AuthPopover from "./components/AuthPopover";
import CartLink from "./components/CartLink";
import UserPopover from "./components/UserPopover";

const Navbar = () => {
  const user = useUserStore((state) => state.user);

  const isAuthenticated = Boolean(user);

  return (
    <header className="border-gray-1 flex h-[100px] items-center justify-between border-b px-[10%]">
      <NavLink
        to="/dashboard"
        className="text-s48-l56 text-text-primary select-none"
      >
        Ecommerce
      </NavLink>

      <div className="flex gap-x-6">
        {isAuthenticated ? <UserPopover /> : <AuthPopover />}
        <CartLink />
      </div>
    </header>
  );
};

export default Navbar;
