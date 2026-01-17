import { useState } from "react";
import { FavoriteFilledIcon, FavoriteIcon } from "../../assets/icons";
import { useFavoriteActions } from "../../hooks/useFavoriteActions";
import { useFavoriteStore } from "../../stores/FavoriteStore";
import type { FavoriteItemUI } from "../models/FavoriteItemUI.model";
import { customTwMerge } from "../utils/Tailwind.util";

const FavoriteButton = ({
  product,
  className,
}: {
  product: FavoriteItemUI["product"];
  className?: string;
}) => {
  const isFavorited = useFavoriteStore((state) =>
    state.items.some((item) => item.productId === product.id),
  );

  const { toggleFavorite, isLoading } = useFavoriteActions();

  const [shouldAnimate, setShouldAnimate] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (isLoading) {
      return;
    }

    if (!isFavorited) {
      setShouldAnimate(true);
    }

    toggleFavorite(product);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={customTwMerge(
        "group bg-surface-primary flex h-10 w-10 cursor-pointer items-center justify-center rounded-full shadow-md transition-colors",
        className,
      )}
    >
      {isFavorited ? (
        <FavoriteFilledIcon
          className={customTwMerge(
            "fill-orange h-5 w-5",
            shouldAnimate ? "animate-favorite-pop" : "",
          )}
          onAnimationEnd={() => {
            if (shouldAnimate) {
              setShouldAnimate(false);
            }
          }}
        />
      ) : (
        <FavoriteIcon className="fill-text-primary group-hover:fill-orange h-5 w-5 transition-colors" />
      )}
    </button>
  );
};

export default FavoriteButton;
