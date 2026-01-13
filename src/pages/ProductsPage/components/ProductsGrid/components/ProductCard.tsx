import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ReqProductsListResponse } from "../../../../../api/responses/ReqProductsListResponse.model";
import { useCurrenciesGetAll } from "../../../../../hooks/useCurrenciesGetAll";
import FavoriteButton from "../../../../../shared/components/FavoriteButton";

const ProductCard = ({
  product,
}: {
  product: ReqProductsListResponse["items"][number] & { brandName: string };
}) => {
  const navigate = useNavigate();
  const { data: currencies = [] } = useCurrenciesGetAll();
  const [hoverIndex, setHoverIndex] = useState(0);

  const currencyMap = useMemo(() => {
    const map = new Map<number, string>();

    for (const currency of currencies) {
      map.set(currency.id, currency.code);
    }

    return map;
  }, [currencies]);

  const images = product.images ?? [];
  const zoneCount = images.length || 1;

  const activeImage = images[hoverIndex]?.mediumUrl || "";

  const handleNavigate = () => {
    navigate(`/product-detail/${product.id}`);
  };

  return (
    <div
      onClick={handleNavigate}
      className="border-gray-2 relative flex h-[500px] w-full cursor-pointer flex-col overflow-hidden rounded-xl border bg-white hover:shadow-md"
    >
      <FavoriteButton
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

      <div className="relative h-[360px] w-full overflow-hidden bg-gray-100">
        <img
          src={activeImage}
          alt={product.name}
          className="h-full w-full object-cover transition-all duration-300"
        />

        <div className="absolute inset-0 flex">
          {Array.from({ length: zoneCount }).map((_, i) => (
            <div
              key={i}
              className="h-full flex-1"
              onMouseEnter={() => setHoverIndex(i)}
            />
          ))}
        </div>

        <div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-gray-300 p-1">
          <div className="flex items-center gap-1">
            {Array.from({ length: zoneCount }).map((_, i) => (
              <span
                key={i}
                className={`h-1 w-1 rounded-full transition ${
                  i === hoverIndex ? "bg-text-primary" : "bg-white"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-3">
        <div className="text-text-primary text-s14-l20 flex flex-wrap gap-1">
          <span className="font-semibold">{product.brandName}</span>
          <span>{product.name}</span>
        </div>

        <div className="text-text-primary text-s12-l16 mt-1 line-clamp-2">
          {product.description}
        </div>

        <div className="text-orange text-s16-l24 mt-auto font-bold">
          {product.price.toFixed(2)} {currencyMap.get(product.currencyId) ?? ""}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
