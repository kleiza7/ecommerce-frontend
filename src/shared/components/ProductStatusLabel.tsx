import type { PRODUCT_STATUS } from "../../api/enums/ProductStatus.enum";
import {
  PRODUCT_STATUS_COLOR_PAIRS,
  PRODUCT_STATUS_TEXT_PAIRS,
} from "../constants/Product.constants";
import { customTwMerge } from "../utils/Tailwind.util";

const ProductStatusLabel = ({
  status,
  className,
}: {
  status: PRODUCT_STATUS;
  className?: string;
}) => {
  const statusColors = PRODUCT_STATUS_COLOR_PAIRS[status];

  return (
    <div
      className={customTwMerge(
        "flex items-center justify-center rounded-full border px-3 py-1",
        className,
      )}
      style={{
        backgroundColor: statusColors.muted,
        borderColor: statusColors.secondary,
      }}
    >
      <span
        className="text-s12-l16 font-medium"
        style={{ color: statusColors.primary }}
      >
        {PRODUCT_STATUS_TEXT_PAIRS[status]}
      </span>
    </div>
  );
};

export default ProductStatusLabel;
