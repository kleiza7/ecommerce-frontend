import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ReqProductsListResponse } from "../../../../../api/responses/ReqProductsListResponse.model";
import FavoriteButton from "../../../../../shared/components/FavoriteButton";

const ProductCard = ({
  product,
}: {
  product: ReqProductsListResponse["items"][number];
}) => {
  const navigate = useNavigate();
  const [hoverIndex, setHoverIndex] = useState(0);

  const images = product.images ?? [];
  const zoneCount = images.length || 1;

  const activeImage = images[hoverIndex]?.mediumUrl || "";

  const handleNavigate = () => {
    navigate(`/product-detail/${product.id}`);
  };

  return (
    <div
      onClick={handleNavigate}
      className="border-gray-2 bg-surface-primary relative flex h-[500px] w-full cursor-pointer flex-col overflow-hidden rounded-xl border hover:shadow-md"
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

      <div className="bg-gray-4 relative h-[360px] w-full overflow-hidden">
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

        <div className="bg-gray-6 absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full p-1">
          <div className="flex items-center gap-1">
            {Array.from({ length: zoneCount }).map((_, i) => (
              <span
                key={i}
                className={`h-1 w-1 rounded-full transition ${
                  i === hoverIndex ? "bg-text-primary" : "bg-surface-primary"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-3">
        <div className="flex flex-col gap-1">
          <div className="text-text-primary text-s14-l20 flex flex-wrap gap-1">
            <span className="font-semibold">{product.brand.name}</span>
            <span>{product.name}</span>
          </div>

          <div className="text-text-primary text-s12-l16 line-clamp-2">
            {product.description}
          </div>
        </div>

        <div className="text-orange text-s16-l24 mt-auto font-bold">
          {product.price.toFixed(2)} {product.currency.code}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
