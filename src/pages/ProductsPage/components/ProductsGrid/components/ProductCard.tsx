import type { Product } from "../../../../../api/models/Product.model";
// TODO: remove this image
import iphoneImage from "./iphone.jpg";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="flex h-[500px] w-full flex-col overflow-hidden rounded-xl border bg-white shadow-sm">
      {/* IMAGE */}
      <div className="h-[360px] w-full bg-gray-100">
        <img
          // TODO: fix this
          src={iphoneImage}
          alt={product.name}
          className="h-full w-full object-cover"
        />
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
            {/* TODO: add currency */}
            {product.price.toFixed(2)} TL
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
