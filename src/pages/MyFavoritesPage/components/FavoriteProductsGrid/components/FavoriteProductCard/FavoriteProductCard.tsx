import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "../../../../../../hooks/useMediaQuery";
import { MEDIA_QUERY } from "../../../../../../shared/constants/MediaQuery.constants";
import { ROUTES } from "../../../../../../shared/constants/Routes.constants";
import type { FavoriteItemUI } from "../../../../../../shared/models/FavoriteItemUI.model";
import FavoriteRemoveButton from "./components/FavoriteRemoveButton";

const DRAG_THRESHOLD = 40;
const CLICK_CANCEL_THRESHOLD = 5;

const FavoriteProductCard = ({
  product,
}: {
  product: FavoriteItemUI["product"];
}) => {
  const navigate = useNavigate();
  const isMobileOrTablet = useMediaQuery(MEDIA_QUERY.BELOW_LG);

  const images = product.images ?? [];
  const zoneCount = images.length || 1;
  const hasMultipleImages = images.length > 1;

  const [hoverIndex, setHoverIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(hasMultipleImages ? 1 : 0);
  const [dragOffset, setDragOffset] = useState(0);
  const [enableTransition, setEnableTransition] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const startXRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const hasDraggedRef = useRef(false);

  const sliderImages = hasMultipleImages
    ? [images[images.length - 1], ...images, images[0]]
    : images;

  const activeImage = images[hoverIndex]?.mediumUrl || "";

  const handleNavigate = () => {
    if (hasDraggedRef.current) {
      hasDraggedRef.current = false;
      return;
    }
    navigate(ROUTES.PRODUCT_DETAIL_PAGE.build(product.id));
  };

  const handlePrev = () => {
    if (!hasMultipleImages || isAnimating || !enableTransition) return;
    setIsAnimating(true);
    setActiveIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (!hasMultipleImages || isAnimating || !enableTransition) return;
    setIsAnimating(true);
    setActiveIndex((prev) => prev + 1);
  };

  const handleTransitionEnd = () => {
    if (!hasMultipleImages) return;

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
    if (!isMobileOrTablet || !hasMultipleImages || isAnimating) return;

    startXRef.current = e.clientX;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    setEnableTransition(false);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (
      !isMobileOrTablet ||
      !isDraggingRef.current ||
      startXRef.current === null
    ) {
      return;
    }

    const deltaX = e.clientX - startXRef.current;

    if (Math.abs(deltaX) > CLICK_CANCEL_THRESHOLD) {
      hasDraggedRef.current = true;
    }

    setDragOffset(deltaX);
  };

  const handlePointerUp = () => {
    if (!isMobileOrTablet || !isDraggingRef.current) return;

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
    <div
      onClick={handleNavigate}
      className="border-border-primary bg-surface-primary relative flex h-[380px] w-full cursor-pointer flex-col overflow-hidden rounded-xl border hover:shadow-md md:h-[460px] 2xl:h-[500px]"
    >
      <FavoriteRemoveButton
        product={{
          ...product,
          images: product.images.map((img) => ({
            id: img.id,
            mediumUrl: img.mediumUrl,
            isPrimary: img.isPrimary,
          })),
        }}
        className="absolute top-3 right-3 z-10"
      />

      <div
        className="bg-surface-secondary relative h-[260px] w-full shrink-0 overflow-hidden md:h-80 2xl:h-[360px]"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {isMobileOrTablet && hasMultipleImages ? (
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
                  src={img.mediumUrl}
                  alt={product.name}
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover select-none"
                />
              </div>
            ))}
          </div>
        ) : (
          <>
            <img
              src={activeImage}
              alt={product.name}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-all duration-300"
            />

            <div className="absolute inset-0 flex">
              {Array.from({ length: images.length || 1 }).map((_, i) => (
                <div
                  key={i}
                  className="h-full flex-1"
                  onMouseEnter={() => setHoverIndex(i)}
                />
              ))}
            </div>

            <div className="bg-border-primary absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full p-1">
              <div className="flex items-center gap-1">
                {Array.from({ length: zoneCount }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-1 w-1 rounded-full transition ${
                      i === hoverIndex
                        ? "bg-text-primary"
                        : "bg-surface-primary"
                    }`}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="border-border-primary flex flex-1 flex-col border-t p-4">
        <div className="flex flex-col gap-2">
          <span className="text-text-primary text-s16-l24">{product.name}</span>

          <span className="text-text-primary text-s14-l20 font-bold">
            {product.brand.name}
          </span>

          <span className="text-text-muted text-s12-l16 line-clamp-2 truncate">
            {product.description}
          </span>
        </div>

        <div className="text-accent text-s18-l28 mt-auto font-bold">
          {product.price.toFixed(2)} {product.currency.code}
        </div>
      </div>
    </div>
  );
};

export default FavoriteProductCard;
