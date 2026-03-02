import { useCallback } from "react";
import type { ReqProductsGetByIdResponse } from "../../../api/responses/ReqProductsGetByIdResponse.model";
import { StarFilledIcon, StoreFrontIcon } from "../../../assets/icons";
import { useProductsNavigation } from "../../../hooks/useProductsNavigation";
import { BUTTON_PRIMARY_OUTLINED } from "../../../shared/constants/CommonTailwindClasses.constants";
import { customTwMerge } from "../../../shared/utils/Tailwind.util";

const SellerCard = ({
  seller,
}: {
  seller: ReqProductsGetByIdResponse["seller"];
}) => {
  const { goToProductsPage } = useProductsNavigation();

  const onSellerClick = useCallback(() => {
    goToProductsPage({
      sellerIds: [seller.id],
      overrideParams: true,
    });
  }, [goToProductsPage, seller.id]);

  return (
    <div className="bg-surface-primary border-border-primary flex flex-col gap-y-4 rounded-lg border p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-y-0">
      <div className="flex items-center gap-x-4">
        <div className="bg-status-info-muted border-status-info-secondary flex h-12 w-12 shrink-0 items-center justify-center rounded-full border">
          <StoreFrontIcon className="fill-status-info-primary h-8 w-8" />
        </div>

        <div className="flex flex-col">
          <span className="text-s14-l20 text-text-primary font-bold">
            {seller.name}
          </span>

          <div className="flex items-center gap-x-2">
            <div className="flex items-center gap-x-1">
              <span className="text-s14-l20 text-text-primary">
                {seller.avgRating.toFixed(1)}
              </span>

              <StarFilledIcon className="fill-rating-primary h-5 w-5" />
            </div>

            <span className="text-s12-l16 text-text-muted">
              {`(${seller.totalProductCount} Products)`}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={onSellerClick}
        className={customTwMerge(
          BUTTON_PRIMARY_OUTLINED,
          "border-status-info-secondary px-4",
        )}
      >
        View Seller’s Products
      </button>
    </div>
  );
};

export default SellerCard;
