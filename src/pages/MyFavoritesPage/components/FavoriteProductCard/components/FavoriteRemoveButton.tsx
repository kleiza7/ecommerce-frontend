import { CloseIcon } from "../../../../../assets/icons";
import { useFavoriteActions } from "../../../../../hooks/useFavoriteActions";
import type { FavoriteItemUI } from "../../../../../shared/models/FavoriteItemUI.model";
import { customTwMerge } from "../../../../../shared/utils/Tailwind.util";

const FavoriteRemoveButton = ({
  product,
  className,
}: {
  product: FavoriteItemUI["product"];
  className?: string;
}) => {
  const { toggleFavorite, isLoading } = useFavoriteActions();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (isLoading) {
      return;
    }

    toggleFavorite(product);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={customTwMerge(
        "group bg-surface-primary flex h-10 w-10 items-center justify-center rounded-full shadow-md transition-colors",
        className,
      )}
    >
      <CloseIcon className="fill-text-primary group-hover:fill-orange h-4 w-4 transition-colors" />
    </button>
  );
};

export default FavoriteRemoveButton;
