import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ReqProductsListResponse } from "../../../../../api/responses/ReqProductsListResponse.model";

const ProductCard = ({
  product,
}: {
  product: ReqProductsListResponse["items"][number] & { brandName: string };
}) => {
  const navigate = useNavigate();
  const [hoverIndex, setHoverIndex] = useState(0);

  const images = product.images ?? [];
  const zoneCount = images.length || 1;

  const activeImage = images[hoverIndex]?.thumbUrl || "";

  const handleNavigate = () => {
    navigate(`/product-detail/${product.id}`);
  };

  return (
    <div
      onClick={handleNavigate}
      className="group border-gray-2 flex h-[500px] w-full cursor-pointer flex-col overflow-hidden rounded-xl border bg-white hover:shadow-md"
    >
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
          {/* TODO: currency */}
          {product.price.toFixed(2)} TL
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
