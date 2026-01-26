import { useState } from "react";
import { useParams } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
import { KeyboardArrowUpIcon, TimerArrowDownIcon } from "../../assets/icons";
import { useCartActions } from "../../hooks/useCartActions";
import { useProductsGetById } from "../../hooks/useProductsGetById";
import CategoryBreadcrumb from "../../shared/components/CategoryBreadcrumb";
import FavoriteButton from "../../shared/components/FavoriteButton";
import GenericTooltip from "../../shared/components/GenericTooltip";
import {
  BUTTON_PRIMARY,
  BUTTON_SIZE_X_LARGE,
} from "../../shared/constants/CommonTailwindClasses.constants";
import { customTwMerge } from "../../shared/utils/Tailwind.util";
import { useCartStore } from "../../stores/CartStore";
import ProductDetailPageSkeleton from "./components/ProductDetailPageSkeleton";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const { data, isLoading } = useProductsGetById(Number(id));
  const { addToCart, isLoading: isCartLoading } = useCartActions();

  const cartItems = useCartStore((state) => state.items);

  if (isLoading || !data) {
    return <ProductDetailPageSkeleton />;
  }

  const images = data.images;

  const cartItem = cartItems.find((item) => item.productId === data.id);
  const cartQuantity = cartItem?.quantity ?? 0;

  const isOutOfStock = cartQuantity >= data.stockCount;

  return (
    <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-y-5 pb-4 md:px-10 md:py-4">
      <CategoryBreadcrumb selectedCategoryId={data.category.id} />

      <div className="flex flex-col gap-4 md:flex-row md:gap-8">
        <div className="flex flex-col gap-6">
          <div
            className="border-gray-2 relative h-[450px] w-full cursor-pointer overflow-hidden md:h-[500px] md:w-[400px] md:rounded-xl md:border"
            onClick={() => setLightboxOpen(true)}
          >
            <FavoriteButton
              product={data}
              className="absolute top-3 right-3 z-10 md:hidden"
            />

            <img
              src={images[activeIndex].largeUrl}
              alt={data.name}
              className="h-full w-full object-cover"
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex((prev) => {
                  if (prev === 0) {
                    return images.length - 1;
                  }
                  return prev - 1;
                });
              }}
              className="bg-surface-primary absolute top-1/2 left-2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full shadow"
            >
              <KeyboardArrowUpIcon className="fill-text-primary h-8 w-8 -rotate-90" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex((prev) => {
                  if (prev === images.length - 1) {
                    return 0;
                  }
                  return prev + 1;
                });
              }}
              className="bg-surface-primary absolute top-1/2 right-2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full shadow"
            >
              <KeyboardArrowUpIcon className="fill-text-primary h-8 w-8 rotate-90" />
            </button>

            <div className="bg-surface-primary/80 absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full p-[5px] md:hidden">
              <div className="flex items-center gap-3">
                {Array.from({ length: images.length }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-2 w-2 rounded-full transition ${
                      i === activeIndex ? "bg-orange" : "bg-[#999999]"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="hidden gap-3 md:flex">
            {images.map((img, index) => (
              <button
                key={img.id}
                onClick={() => setActiveIndex(index)}
                className={`h-20 w-20 cursor-pointer overflow-hidden rounded-lg border ${
                  index === activeIndex ? "border-orange" : "border-gray-2"
                }`}
              >
                <img
                  src={img.thumbUrl}
                  className="h-full w-full object-cover"
                  alt="thumb"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2 px-4 md:gap-4 md:px-0">
          <div className="text-text-primary text-s16-l24 md:text-s20-l28 flex flex-wrap gap-2">
            <span className="font-bold">{data.brand.name}</span>
            <span>{data.name}</span>
          </div>

          <span className="text-text-primary text-s14-l20 md:text-s16-l24">
            {data.description}
          </span>

          <div className="text-text-primary text-s12-l16">
            {data.stockCount > 0 ? (
              <div className="flex flex-col gap-1">
                <span>
                  Only <span className="font-bold">{data.stockCount}</span>{" "}
                  items are left in stock.
                </span>

                {data.stockCount < 5 && (
                  <div className="flex items-center gap-1">
                    <TimerArrowDownIcon
                      className={`h-4 w-4 ${
                        data.stockCount === 1
                          ? "fill-error-primary"
                          : "fill-warning-primary"
                      }`}
                    />
                    <span
                      className={
                        data.stockCount === 1
                          ? "text-error-primary"
                          : "text-warning-primary"
                      }
                    >
                      Hurry up, this product is running out.
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <span>This product is out of stock.</span>
            )}
          </div>

          <span className="text-orange text-s24-l32 hidden font-bold md:inline">
            {data.price.toFixed(2)} {data.currency.code}
          </span>

          <div className="hidden items-center gap-4 md:flex">
            {/* TODO: add this button */}
            {/* <button
              className={customTwMerge(
                BUTTON_PRIMARY_OUTLINED,
                BUTTON_SIZE_X_LARGE,
                "border-2",
              )}
            >
              Buy Now
            </button> */}

            <GenericTooltip
              content={
                isOutOfStock
                  ? "You have reached the maximum available stock for this product."
                  : ""
              }
            >
              <button
                disabled={isCartLoading || isOutOfStock}
                onClick={() =>
                  addToCart({
                    ...data,
                    images: data.images.map((img) => ({
                      thumbUrl: img.thumbUrl,
                      isPrimary: img.isPrimary,
                    })),
                  })
                }
                className={customTwMerge(BUTTON_PRIMARY, BUTTON_SIZE_X_LARGE)}
              >
                Add to Cart
              </button>
            </GenericTooltip>

            <FavoriteButton
              product={data}
              className="border-gray-2 hidden h-12 w-12 border shadow-none hover:shadow-md md:flex"
            />
          </div>
        </div>
      </div>

      <div className="border-gray-2 bg-surface-primary fixed bottom-0 left-0 z-40 flex w-full items-end justify-between gap-3 border-t p-2.5 md:hidden">
        <span className="text-orange text-s16-l24 font-semibold">
          {data.price.toFixed(2)} {data.currency.code}
        </span>

        <GenericTooltip
          content={
            isOutOfStock
              ? "You have reached the maximum available stock for this product."
              : ""
          }
        >
          <button
            disabled={isCartLoading || isOutOfStock}
            onClick={() =>
              addToCart({
                ...data,
                images: data.images.map((img) => ({
                  thumbUrl: img.thumbUrl,
                  isPrimary: img.isPrimary,
                })),
              })
            }
            className={customTwMerge(BUTTON_PRIMARY, BUTTON_SIZE_X_LARGE)}
          >
            Add to Cart
          </button>
        </GenericTooltip>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={images.map((img) => ({
          src: img.largeUrl,
        }))}
        index={activeIndex}
        plugins={[Thumbnails]}
      />
    </div>
  );
};

export default ProductDetailPage;
