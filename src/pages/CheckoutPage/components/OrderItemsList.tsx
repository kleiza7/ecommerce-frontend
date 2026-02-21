import type { ReqOrdersGetByIdResponse } from "../../../api/responses/ReqOrdersGetByIdResponse.model";

const OrderItemsList = ({
  orderItems,
  currencyMap,
}: {
  orderItems: ReqOrdersGetByIdResponse["items"];
  currencyMap: Map<number, string>;
}) => {
  return (
    <div className="border-border-primary flex flex-col overflow-hidden rounded-md border">
      <div className="border-border-primary bg-surface-muted border-b px-6 py-4">
        <span className="text-s16-l24 text-text-primary font-semibold">
          Items in Your Cart ({orderItems.length})
        </span>
      </div>

      <div className="w-full overflow-x-auto p-6">
        <div className="flex min-w-max gap-x-6">
          {orderItems.map((item) => {
            const primaryImage = item.product.images.find(
              (image) => image.isPrimary,
            );

            if (!primaryImage) {
              return null;
            }

            const totalPrice = item.priceSnapshot * item.quantity;

            return (
              <div
                key={item.id}
                className="flex w-32 shrink-0 flex-col items-center gap-2"
              >
                <div className="border-border-primary relative w-full rounded-md border">
                  <img
                    src={primaryImage.thumbUrl}
                    alt={item.product.name}
                    className="relative h-full w-full rounded object-cover"
                  />

                  <div className="bg-surface-primary border-border-primary absolute -top-2 -left-2 z-10 flex items-center justify-center rounded border px-1">
                    <span className="text-s12-l16 text-text-primary">
                      x{item.quantity}
                    </span>
                  </div>
                </div>
                <span className="text-s16-l24 text-accent w-full text-center font-bold wrap-break-word">
                  {totalPrice.toFixed(2)}{" "}
                  {currencyMap.get(item.currencyId) ?? ""}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderItemsList;
