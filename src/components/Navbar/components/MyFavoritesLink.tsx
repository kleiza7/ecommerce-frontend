import { NavLink } from "react-router-dom";
import { FavoriteFilledIcon, FavoriteIcon } from "../../../assets/icons";

const MyFavoritesLink = () => {
  return (
    <NavLink
      to="/my-favorites"
      className="group flex items-center gap-x-2 transition-colors"
    >
      <FavoriteIcon className="fill-text-primary h-5 w-5 group-hover:hidden" />
      <FavoriteFilledIcon className="fill-orange hidden h-5 w-5 group-hover:block" />

      <span className="text-s14-l20 text-text-primary group-hover:text-orange hidden font-semibold transition-colors xl:inline">
        My Favorites
      </span>
    </NavLink>
  );
};

export default MyFavoritesLink;
