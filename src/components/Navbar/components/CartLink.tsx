import { NavLink } from "react-router-dom";
import { ShoppingCartIcon } from "../../../assets/icons";
import { useCartStore } from "../../../stores/CartStore";

const CartLink = () => {
  const totalQuantity = useCartStore((state) => state.totalQuantity);

  return (
    <NavLink
      to="/cart"
      className="group flex items-center gap-x-2 transition-colors"
    >
      <ShoppingCartIcon className="fill-text-primary group-hover:fill-orange h-5 w-5 transition-colors" />

      <span className="text-s14-l20 text-text-primary group-hover:text-orange font-semibold transition-colors">
        My Cart
      </span>

      {totalQuantity > 0 && (
        <span className="bg-orange text-s12-l16 flex h-5 w-5 items-center justify-center rounded-full font-semibold text-white">
          {totalQuantity}
        </span>
      )}
    </NavLink>
  );
};

export default CartLink;
