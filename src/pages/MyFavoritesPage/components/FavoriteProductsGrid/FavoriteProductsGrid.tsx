import type { FavoriteItemUI } from "../../../../shared/models/FavoriteItemUI.model";
import FavoriteProductCard from "./components/FavoriteProductCard/FavoriteProductCard";

const FavoriteProductsGrid = ({
  favoriteProducts,
}: {
  favoriteProducts: FavoriteItemUI["product"][];
}) => {
  return favoriteProducts.length === 0 ? (
    <div className="flex h-[300px] items-center justify-center">
      <span className="text-s14-l20 text-text-muted">
        No favorite products found
      </span>
    </div>
  ) : (
    <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {favoriteProducts.map((product) => (
        <FavoriteProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default FavoriteProductsGrid;
