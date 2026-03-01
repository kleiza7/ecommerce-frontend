import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { CloseIcon, FavoriteFilledIcon, SearchIcon } from "../../assets/icons";
import {
  BUTTON_PRIMARY,
  BUTTON_SIZE_X_LARGE,
  INPUT_BASE,
} from "../../shared/constants/CommonTailwindClasses.constants";
import { ROUTES } from "../../shared/constants/Routes.constants";
import { customTwMerge } from "../../shared/utils/Tailwind.util";
import { useFavoriteStore } from "../../stores/FavoriteStore";
import FavoriteProductsGrid from "./components/FavoriteProductsGrid/FavoriteProductsGrid";

const MyFavoritesPage = () => {
  const favorites = useFavoriteStore((state) => state.items);

  const [searchText, setSearchText] = useState("");

  const filteredFavoriteProducts = useMemo(() => {
    const normalizedSearchText = searchText.trim().toLowerCase();

    return favorites
      .map((item) => item.product)
      .filter((product) =>
        product.name.toLowerCase().includes(normalizedSearchText),
      );
  }, [favorites, searchText]);

  if (favorites.length === 0) {
    return (
      <div className="mx-auto flex w-full max-w-[1480px] flex-col items-center justify-center gap-6 text-center">
        <div className="bg-primary/10 flex h-18 w-18 items-center justify-center rounded-full">
          <FavoriteFilledIcon className="fill-primary h-9 w-9" />
        </div>

        <span className="text-s18-l28 text-primary font-medium">
          No Products Found in Your Favorites
        </span>

        <Link
          to={ROUTES.PRODUCTS_PAGE.build()}
          className={customTwMerge(BUTTON_PRIMARY, BUTTON_SIZE_X_LARGE)}
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-[1480px] flex-col">
      <div className="top-0 flex h-[70px] w-full shrink-0 items-center px-3 md:px-10">
        <div className="relative w-full md:w-[330px]">
          <SearchIcon className="fill-text-disabled absolute top-1/2 left-3 h-6 w-6 -translate-y-1/2" />

          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search product name"
            className={customTwMerge(
              INPUT_BASE,
              "bg-surface-secondary w-full border-none px-10",
            )}
          />

          {searchText && (
            <button
              type="button"
              onClick={() => setSearchText("")}
              className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 cursor-pointer"
            >
              <CloseIcon className="fill-text-muted h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="bg-surface-secondary h-px w-full" />

      <div className="flex-1 overflow-y-auto px-3 py-5 md:px-10">
        <FavoriteProductsGrid favoriteProducts={filteredFavoriteProducts} />
      </div>
    </div>
  );
};

export default MyFavoritesPage;
