import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
import { TimerArrowDownIcon } from "../../assets/icons";
import { useBrandsGetAll } from "../../hooks/useBrandsGetAll";
import { useCartActions } from "../../hooks/useCartActions";
import { useCurrenciesGetAll } from "../../hooks/useCurrenciesGetAll";
import { useProductsGetById } from "../../hooks/useProductsGetById";
import FavoriteButton from "../../shared/components/FavoriteButton";
import GenericTooltip from "../../shared/components/GenericTooltip";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import { useCartStore } from "../../stores/CartStore";
import CategoryBreadcrumb from "./components/CategoryBreadcrumb";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const { data, isLoading } = useProductsGetById(Number(id));
  const { data: brands = [] } = useBrandsGetAll();
  const { data: currencies = [] } = useCurrenciesGetAll();
  const { addToCart, isLoading: isCartLoading } = useCartActions();

  const cartItems = useCartStore((state) => state.items);

  const currencyMap = useMemo(() => {
    const map = new Map<number, string>();

    for (const currency of currencies) {
      map.set(currency.id, currency.code);
    }

    return map;
  }, [currencies]);

  // TODO: fix this loading
  if (isLoading || !data) {
    return <LoadingSpinner size={56} borderWidth={3} />;
  }

  const images = data.images;

  const cartItem = cartItems.find((item) => item.productId === data.id);
  const cartQuantity = cartItem?.quantity ?? 0;

  const isOutOfStock = cartQuantity >= data.stockCount;

  // TODO: brand lookup (sonra map / backend include olacak)
  const brandName =
    brands.find((brand) => brand.id === data.brandId)?.name ?? "";

  return (
    <div className="flex flex-col">
      <CategoryBreadcrumb categoryId={data.categoryId} />

      <div className="flex gap-8">
        <div className="flex flex-col gap-4">
          <div
            className="border-gray-2 relative h-[500px] w-[400px] cursor-pointer overflow-hidden rounded-xl border"
            onClick={() => setLightboxOpen(true)}
          >
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
              className="absolute top-1/2 left-2 h-10 w-10 -translate-y-1/2 cursor-pointer rounded-full bg-white p-2 shadow"
            >
              ←
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
              className="absolute top-1/2 right-2 h-10 w-10 -translate-y-1/2 cursor-pointer rounded-full bg-white p-2 shadow"
            >
              →
            </button>
          </div>

          <div className="mt-2 flex gap-3">
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

        <div className="flex flex-1 flex-col gap-4">
          <div className="text-text-primary text-s20-l28 flex flex-wrap gap-2">
            <span className="font-bold">{brandName}</span>
            <span>{data.name}</span>
          </div>

          <span className="text-text-primary text-s16-l24">
            {data.description}
          </span>

          <span className="text-orange text-s24-l32 font-bold">
            {data.price.toFixed(2)} {currencyMap.get(data.currencyId) ?? ""}
          </span>

          <div className="text-text-primary text-s12-l16">
            {data.stockCount > 0 ? (
              <>
                <span>
                  Only <span className="font-bold">{data.stockCount}</span>{" "}
                  items are left in stock.
                </span>

                {data.stockCount < 5 && (
                  <div className="mt-1 flex items-center gap-1">
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
              </>
            ) : (
              <span>This product is out of stock.</span>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* <button className="border-orange text-orange hover:bg-orange cursor-pointer rounded-lg border-2 px-6 py-3 transition hover:text-white">
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
                className={`cursor-pointer rounded-lg px-6 py-3 text-white transition ${
                  isCartLoading || isOutOfStock
                    ? "bg-orange/50 cursor-not-allowed"
                    : "bg-orange hover:bg-orange-dark"
                }`}
              >
                Add to Cart
              </button>
            </GenericTooltip>

            <FavoriteButton
              product={data}
              className="border-gray-2 h-12 w-12 border shadow-none hover:shadow-md"
            />
          </div>
        </div>
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
