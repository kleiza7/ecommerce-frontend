import { useUserStore } from "../../stores/UserStore";
import AuthPopover from "./components/AuthPopover";
import UserPopover from "./components/UserPopover";

const Navbar = () => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  return (
    <header className="border-gray-1 flex h-[100px] items-center justify-between border-b px-[10%]">
      <span className="text-s48-l56 text-text-primary select-none">
        Ecommerce
      </span>

      {isAuthenticated ? <UserPopover /> : <AuthPopover />}
    </header>
  );
};

export default Navbar;
