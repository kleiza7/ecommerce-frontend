import { useState } from "react";
import type { ReqProductsListResponse } from "../../../../../api/responses/ReqProductsListResponse.model";

const ProductCard = ({
  product,
}: {
  product: ReqProductsListResponse["items"][number];
}) => {
  const [hoverIndex, setHoverIndex] = useState(0);

  const images = product.images ?? [];
  const zoneCount = images.length || 1;

  const activeImage = images[hoverIndex]?.thumbUrl || "";

  return (
    <div className="group flex h-[500px] w-full flex-col overflow-hidden rounded-xl border bg-white shadow-sm">
      {/* IMAGE AREA */}
      <div className="relative h-[360px] w-full overflow-hidden bg-gray-100">
        {/* MAIN IMAGE */}
        <img
          src={activeImage}
          alt={product.name}
          className="h-full w-full object-cover transition-all duration-300"
        />

        {/* HOVER ZONES */}
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

      {/* CONTENT */}
      <div className="flex flex-1 flex-col p-3">
        <p className="text-text-primary truncate font-semibold">
          {product.name}
        </p>

        <p className="text-text-primary mt-1 line-clamp-2 text-sm">
          {product.description}
        </p>

        <div className="mt-auto">
          <p className="text-orange text-lg font-bold">
            {product.price.toFixed(2)} TL
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
