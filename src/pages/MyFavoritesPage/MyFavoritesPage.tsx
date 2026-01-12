import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { CloseIcon, FavoriteFilledIcon, SearchIcon } from "../../assets/icons";
import { useBrandsGetAll } from "../../hooks/useBrandsGetAll";
import { useFavoriteStore } from "../../stores/FavoriteStore";
import FavoriteProductCard from "./components/FavoriteProductCard/FavoriteProductCard";

const MyFavoritesPage = () => {
  const favorites = useFavoriteStore((state) => state.items);
  const { data: brands = [] } = useBrandsGetAll();

  const [searchText, setSearchText] = useState("");

  const brandNameMap = useMemo(() => {
    const map = new Map<number, string>();
    for (const brand of brands) {
      map.set(brand.id, brand.name);
    }
    return map;
  }, [brands]);

  const filteredFavoriteProducts = useMemo(() => {
    return favorites
      .map((item) => ({
        ...item.product,
        brandName: brandNameMap.get(item.product.brandId) ?? "",
      }))
      .filter((product) =>
        product.name.toLowerCase().includes(searchText.trim().toLowerCase()),
      );
  }, [favorites, brandNameMap, searchText]);

  if (favorites.length === 0) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-6 text-center">
        <div className="bg-orange/10 flex h-18 w-18 items-center justify-center rounded-full">
          <FavoriteFilledIcon className="fill-orange h-9 w-9" />
        </div>

        <span className="text-s18-l28 text-orange font-medium">
          No Products Found in Your Favorites
        </span>

        <Link
          to="/products"
          className="bg-orange hover:bg-orange-dark rounded-lg px-6 py-3 font-semibold text-white transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col gap-y-5 py-5">
      <div className="sticky top-0 z-10 px-[90px]">
        <div className="relative w-[330px]">
          <SearchIcon className="fill-orange absolute top-1/2 left-3 h-6 w-6 -translate-y-1/2" />

          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search product name"
            className="bg-gray-3 w-full rounded-md py-2.5 pr-10 pl-10 text-sm outline-none"
          />

          {searchText && (
            <button
              type="button"
              onClick={() => setSearchText("")}
              className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2"
            >
              <CloseIcon className="fill-text-primary h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="bg-gray-1 h-px w-full" />

      <div className="flex-1 overflow-y-auto px-[90px]">
        {filteredFavoriteProducts.length === 0 ? (
          <div className="flex h-[300px] items-center justify-center">
            <span className="text-s14-l20 text-gray-500">
              No matching products found
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {filteredFavoriteProducts.map((product) => (
              <FavoriteProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFavoritesPage;
