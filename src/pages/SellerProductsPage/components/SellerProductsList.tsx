import type { ReqProductsGetProductsBySellerResponse } from "../../../api/responses/ReqProductsGetProductsBySellerResponse.model";
import { EditNoteIcon } from "../../../assets/icons";
import GenericTooltip from "../../../shared/components/GenericTooltip";
import ProductStatusLabel from "../../../shared/components/ProductStatusLabel";

const SellerProductsList = ({
  products,
  openUpdateProductPortal,
}: {
  products: ReqProductsGetProductsBySellerResponse;
  openUpdateProductPortal: (productId: number) => void;
}) => {
  return (
    <div className="flex flex-col gap-y-4">
      {products.map((product) => {
        const primaryImage = product.images.find((img) => img.isPrimary);

        return (
          <div
            key={product.id}
            className="border-border-primary bg-surface-primary relative flex items-start gap-x-4 rounded-xl border p-3"
          >
            <div className="absolute top-3 right-3">
              <GenericTooltip content="Update">
                <button
                  type="button"
                  onClick={() => openUpdateProductPortal(product.id)}
                  className="flex h-8 w-8 items-center justify-center"
                >
                  <EditNoteIcon className="fill-primary" />
                </button>
              </GenericTooltip>
            </div>

            {primaryImage?.mediumUrl && (
              <img
                src={primaryImage.mediumUrl}
                alt={product.name}
                className="h-20 w-20 rounded-lg object-cover"
              />
            )}

            <div className="flex flex-1 flex-col gap-y-2">
              <span className="text-s14-l20 text-text-primary font-semibold">
                {product.name}
              </span>

              <span className="text-s12-l16 text-text-muted">
                Brand: {product.brand?.name ?? "-"} • Category:{" "}
                {product.category?.name ?? "-"}
              </span>

              <span className="text-s12-l16 text-text-muted">
                Stock: {product.stockCount}
              </span>

              <span className="text-s16-l24 text-accent font-semibold">
                {product.price.toFixed(2)} {product.currency.code}
              </span>

              <ProductStatusLabel
                status={product.status}
                className="self-start"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SellerProductsList;
