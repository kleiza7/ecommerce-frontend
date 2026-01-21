import { NavLink } from "react-router-dom";
import {
  ShoppingCartFilledIcon,
  ShoppingCartIcon,
} from "../../../assets/icons";
import { useCartStore } from "../../../stores/CartStore";

const MyCartLink = () => {
  const totalQuantity = useCartStore((state) => state.totalQuantity);

  return (
    <NavLink
      to="/cart"
      className="group relative flex items-center gap-x-2 transition-colors"
    >
      <ShoppingCartIcon className="fill-text-primary h-5 w-5 group-hover:hidden" />
      <ShoppingCartFilledIcon className="fill-orange hidden h-5 w-5 group-hover:block" />

      <span className="text-s14-l20 text-text-primary group-hover:text-orange hidden font-semibold transition-colors xl:inline">
        My Cart
      </span>

      {totalQuantity > 0 && (
        <span className="bg-orange text-s10-l14 text-surface-primary absolute -top-1 left-2 flex h-4 w-4 items-center justify-center rounded-full font-semibold">
          {totalQuantity}
        </span>
      )}
    </NavLink>
  );
};

export default MyCartLink;
