import { isAxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
import {
  CancelIcon,
  CheckCircleIcon,
  ErrorIcon,
  KeyboardArrowUpIcon,
  ShoppingCartIcon,
} from "../../assets/icons";
import { useCartActions } from "../../hooks/useCartActions";
import { useProductsGetById } from "../../hooks/useProductsGetById";
import CategoryBreadcrumb from "../../shared/components/CategoryBreadcrumb";
import FavoriteButton from "../../shared/components/FavoriteButton";
import GenericTooltip from "../../shared/components/GenericTooltip";
import ProductRatingSummary from "../../shared/components/ProductRatingSummary";
import {
  BUTTON_PRIMARY,
  BUTTON_SIZE_X_LARGE,
} from "../../shared/constants/CommonTailwindClasses.constants";
import { ROUTES } from "../../shared/constants/Routes.constants";
import { customTwMerge } from "../../shared/utils/Tailwind.util";
import { useCartStore } from "../../stores/CartStore";
import ProductDetailPageSkeleton from "./components/ProductDetailPageSkeleton";
import ProductDetailTabs from "./components/ProductDetailTabs/ProductDetailTabs";
import ProductTrustBadges from "./components/ProductTrustBadges";

const DRAG_THRESHOLD = 60;
const CLICK_CANCEL_THRESHOLD = 5;

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const parsedProductId = Number(productId);

  const [activeIndex, setActiveIndex] = useState(1);
  const [enableTransition, setEnableTransition] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const startXRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const hasDraggedRef = useRef(false);

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useProductsGetById(parsedProductId);

  const { addToCart, isLoading: isCartLoading } = useCartActions();
  const cartItems = useCartStore((state) => state.items);

  useEffect(() => {
    if (isNaN(parsedProductId)) {
      navigate(ROUTES.NOT_FOUND_PAGE.build(), { replace: true });
    }
  }, [parsedProductId, navigate]);

  useEffect(() => {
    if (!isError || !isAxiosError(error)) return;

    const status = error.response?.status;

    switch (status) {
      case 404: {
        navigate(ROUTES.NOT_FOUND_PAGE.build(), { replace: true });
        break;
      }
    }
  }, [isError, error, navigate]);

  if (isLoading) {
    return <ProductDetailPageSkeleton />;
  }

  if (!product) {
    return null;
  }

  const images = product.images;
  const sliderImages = [images[images.length - 1], ...images, images[0]];
  const currentRealIndex = (activeIndex - 1 + images.length) % images.length;

  const cartItem = cartItems.find((item) => item.productId === product.id);
  const cartQuantity = cartItem?.quantity ?? 0;
  const isOutOfStock = cartQuantity >= product.stockCount;

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => prev + 1);
  };

  const handleTransitionEnd = () => {
    if (activeIndex === 0) {
      setEnableTransition(false);
      setActiveIndex(images.length);
      return;
    }

    if (activeIndex === images.length + 1) {
      setEnableTransition(false);
      setActiveIndex(1);
      return;
    }

    setIsAnimating(false);
  };

  if (!enableTransition) {
    requestAnimationFrame(() => {
      setEnableTransition(true);
      setIsAnimating(false);
    });
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isAnimating) return;

    startXRef.current = e.clientX;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    setEnableTransition(false);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || startXRef.current === null) return;

    const deltaX = e.clientX - startXRef.current;

    if (Math.abs(deltaX) > CLICK_CANCEL_THRESHOLD) {
      hasDraggedRef.current = true;
    }

    setDragOffset(deltaX);
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;

    setEnableTransition(true);

    if (dragOffset > DRAG_THRESHOLD) {
      handlePrev();
    } else if (dragOffset < -DRAG_THRESHOLD) {
      handleNext();
    }

    setDragOffset(0);
    startXRef.current = null;
    isDraggingRef.current = false;
  };

  return (
    <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-y-6 pb-4 md:px-10 md:py-8">
      <CategoryBreadcrumb selectedCategoryId={product.category.id} />

      <div className="flex flex-col gap-4 md:flex-row md:gap-14">
        <div className="flex flex-col gap-4">
          <div
            className="border-border-primary relative h-[450px] w-full cursor-pointer overflow-hidden shadow-lg md:h-[500px] md:w-[700px] md:rounded-xl md:border"
            onClick={() => {
              if (hasDraggedRef.current) {
                hasDraggedRef.current = false;
                return;
              }
              setLightboxOpen(true);
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            <FavoriteButton
              product={product}
              className="absolute top-3 right-3 z-10 md:hidden"
            />

            <div className="h-full w-full overflow-hidden">
              <div
                className="image-slider"
                style={{
                  transform: `translateX(calc(-${activeIndex * 100}% + ${dragOffset}px))`,
                  transition: enableTransition ? undefined : "none",
                }}
                onTransitionEnd={handleTransitionEnd}
              >
                {sliderImages.map((img, index) => (
                  <div key={`${img.id}-${index}`} className="image-slide">
                    <img
                      src={img.largeUrl}
                      alt={product.name}
                      draggable={false}
                      className="h-full w-full object-cover select-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="bg-surface-primary absolute top-1/2 left-2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full shadow"
            >
              <KeyboardArrowUpIcon className="fill-text-primary h-8 w-8 -rotate-90" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
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
                onClick={() => {
                  if (isAnimating) return;
                  setIsAnimating(true);
                  setActiveIndex(index + 1);
                }}
                className={`border-border-primary h-32 w-32 cursor-pointer overflow-hidden rounded-lg border-2 p-2 shadow-lg ${
                  index === currentRealIndex
                    ? "border-primary"
                    : "border-border-primary"
                }`}
              >
                <img
                  src={img.thumbUrl}
                  alt="thumb"
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2 px-4 md:gap-8 md:px-0">
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-1">
              <span className="text-primary text-s20-l28 md:text-s24-l32 font-bold">
                {product.brand.name}
              </span>
              <span className="text-text-primary text-s24-l32 md:text-s32-l40 font-bold">
                {product.name}
              </span>
            </div>

            <ProductRatingSummary
              avgRating={product.avgRating}
              reviewCount={product.reviewCount}
            />

            <div className="flex flex-col gap-y-6">
              <div className="flex items-center gap-x-1">
                {product.stockCount >= 1 ? (
                  product.stockCount > 5 ? (
                    <>
                      <CheckCircleIcon className="fill-status-success-primary" />
                      <span className="text-s14-l20 text-status-success-primary font-medium">
                        In Stock
                      </span>
                    </>
                  ) : (
                    <>
                      <ErrorIcon className="fill-status-warning-primary" />
                      <span className="text-s14-l20 text-status-warning-primary font-medium">
                        Only {product.stockCount}{" "}
                        {product.stockCount > 1 ? "items" : "item"} left in
                        stock!
                      </span>
                    </>
                  )
                ) : (
                  <>
                    <CancelIcon className="fill-status-error-primary" />
                    <span className="text-s14-l20 text-status-error-primary font-medium">
                      Out of Stock
                    </span>
                  </>
                )}
              </div>

              <div className="bg-surface-muted border-border-secondary rounded-lg border p-6">
                <span className="text-accent text-s36-l44 hidden font-bold md:inline">
                  {product.price.toFixed(2)} {product.currency.code}
                </span>
              </div>

              <span className="text-text-muted text-s14-l20">
                {product.description}
              </span>
            </div>
          </div>

          <div className="hidden items-center gap-x-4 md:flex">
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
                    ...product,
                    images: product.images.map((img) => ({
                      thumbUrl: img.thumbUrl,
                      isPrimary: img.isPrimary,
                    })),
                  })
                }
                className={customTwMerge(
                  BUTTON_PRIMARY,
                  BUTTON_SIZE_X_LARGE,
                  "flex-1 shrink-0",
                )}
              >
                <ShoppingCartIcon className="fill-surface-primary" />
                Add to Cart
              </button>
            </GenericTooltip>

            <FavoriteButton
              product={product}
              className="border-gray-2 hidden h-12 w-12 shrink-0 border shadow-none hover:shadow-md md:flex"
            />
          </div>

          <div className="flex flex-col gap-y-6">
            <div className="bg-border-secondary h-px" />
            <ProductTrustBadges />
          </div>
        </div>
      </div>

      <ProductDetailTabs
        reviewCount={product.reviewCount}
        seller={product.seller}
      />

      {/* TODO: responsive unutma */}
      {/* <div className="border-gray-2 bg-surface-primary fixed bottom-0 left-0 z-40 flex w-full items-end justify-between gap-3 border-t p-2.5 md:hidden">
        <span className="text-orange text-s16-l24 font-semibold">
          {product.price.toFixed(2)} {product.currency.code}
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
                ...product,
                images: product.images.map((img) => ({
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
      </div> */}

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={images.map((img) => ({ src: img.largeUrl }))}
        index={currentRealIndex}
        plugins={[Thumbnails]}
      />
    </div>
  );
};

export default ProductDetailPage;
