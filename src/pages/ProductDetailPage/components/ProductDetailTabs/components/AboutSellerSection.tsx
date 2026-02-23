import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { ReqProductsGetByIdResponse } from "../../../../../api/responses/ReqProductsGetByIdResponse.model";
import {
  KeyboardArrowUpIcon,
  StoreFrontIcon,
} from "../../../../../assets/icons";
import { useProductsList } from "../../../../../hooks/useProductsList";
import { useProductsNavigation } from "../../../../../hooks/useProductsNavigation";
import LoadingSpinner from "../../../../../shared/components/LoadingSpinner";
import {
  BUTTON_PRIMARY,
  BUTTON_SIZE_LARGE,
} from "../../../../../shared/constants/CommonTailwindClasses.constants";
import { ROUTES } from "../../../../../shared/constants/Routes.constants";
import { customTwMerge } from "../../../../../shared/utils/Tailwind.util";

const CARD_WIDTH = 220;
const SCROLL_AMOUNT = CARD_WIDTH + 20;

const AboutSellerSection = ({
  seller,
}: {
  seller: ReqProductsGetByIdResponse["seller"];
}) => {
  const { productId } = useParams();
  const parsedProductId = Number(productId);
  const navigate = useNavigate();
  const { goToProductsPage } = useProductsNavigation();

  const railRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const { data, isLoading } = useProductsList({
    page: 1,
    limit: 10,
    filter: {
      sellerIds: [seller.id],
    },
    sort: {
      field: "createdAt",
      order: "desc",
    },
  });

  const otherProducts = useMemo(() => {
    if (!data?.items) {
      return [];
    }
    return data.items.filter((product) => product.id !== parsedProductId);
  }, [data, parsedProductId]);

  const updateScrollState = () => {
    const el = railRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateScrollState();
  }, [otherProducts]);

  const scrollLeft = () => {
    if (!railRef.current) return;
    railRef.current.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (!railRef.current) return;
    railRef.current.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
  };

  const onSellerClick = useCallback(() => {
    goToProductsPage({
      sellerIds: [seller.id],
      overrideParams: true,
    });
  }, [goToProductsPage, seller.id]);

  return (
    <div className="border-border-primary flex flex-col rounded-xl border">
      {/* Header */}
      <div className="border-border-primary flex items-center justify-between border-b p-8">
        <div className="flex items-center gap-x-4">
          <StoreFrontIcon className="fill-primary h-8 w-8" />
          <span className="text-s20-l28 text-primary font-bold">
            {seller.name}
          </span>
        </div>

        <button
          onClick={onSellerClick}
          className={customTwMerge(BUTTON_PRIMARY, BUTTON_SIZE_LARGE)}
        >
          View all products from this seller
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-y-6 p-8">
        <div className="flex items-center justify-between">
          <span className="text-s18-l28 text-text-primary font-bold">
            Other products from this seller
          </span>

          <div className="flex items-center gap-x-2">
            <button
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              className="border-border-primary flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border disabled:cursor-not-allowed disabled:opacity-40"
            >
              <KeyboardArrowUpIcon className="fill-text-disabled -rotate-90" />
            </button>

            <button
              onClick={scrollRight}
              disabled={!canScrollRight}
              className="border-border-primary flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border disabled:cursor-not-allowed disabled:opacity-40"
            >
              <KeyboardArrowUpIcon className="fill-text-disabled rotate-90" />
            </button>
          </div>
        </div>

        {isLoading ? (
          <LoadingSpinner size={56} borderWidth={3} className="mx-auto" />
        ) : otherProducts.length === 0 ? (
          <div className="flex h-[100px] items-center justify-center">
            <span className="text-s14-l20 text-text-muted text-center">
              This seller has no other products yet.
            </span>
          </div>
        ) : (
          <div
            ref={railRef}
            onScroll={updateScrollState}
            className="flex gap-x-5 overflow-x-auto pb-2"
          >
            {otherProducts.map((product) => {
              const imageUrl =
                product.images.find((img) => img.isPrimary)?.mediumUrl ||
                product.images[0]?.mediumUrl;

              return (
                <button
                  key={product.id}
                  type="button"
                  onClick={() =>
                    navigate(ROUTES.PRODUCT_DETAIL_PAGE.build(product.id))
                  }
                  className="border-border-primary bg-surface-primary flex flex-none cursor-pointer flex-col overflow-hidden rounded-xl border transition hover:shadow-lg"
                  style={{ width: CARD_WIDTH }}
                >
                  {/* Image */}
                  <div className="bg-surface-secondary h-64 w-full overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex h-24 flex-col items-start justify-between p-4 text-left">
                    <span className="text-s14-l20 text-text-primary line-clamp-2 font-medium">
                      {product.name}
                    </span>

                    <span className="text-accent text-s14-l20 font-bold">
                      {product.price.toFixed(2)} {product.currency.code}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutSellerSection;
