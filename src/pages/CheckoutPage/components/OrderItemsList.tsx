import type { ReqOrdersGetByIdResponse } from "../../../api/responses/ReqOrdersGetByIdResponse.model";

const OrderItemsList = ({
  orderItems,
  currencyMap,
}: {
  orderItems: ReqOrdersGetByIdResponse["items"];
  currencyMap: Map<number, string>;
}) => {
  return (
    <div className="border-gray-2 flex flex-col rounded-md border">
      <div className="border-gray-2 bg-gray-3 border-b px-5 py-3">
        <span className="text-s18-l28 text-text-primary font-medium">
          Items in Your Cart ({orderItems.length})
        </span>
      </div>

      <div className="w-full overflow-x-auto px-5 pt-4 pb-3">
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
                className="relative flex w-[89px] shrink-0 flex-col items-center gap-2"
              >
                <div className="bg-surface-primary border-gray-2 absolute top-0 left-0 z-10 flex items-center justify-center rounded border px-1">
                  <span className="text-s12-l16 text-[#666666]">
                    x{item.quantity}
                  </span>
                </div>

                <div className="border-gray-2 box-border w-[89px] rounded border">
                  <img
                    src={primaryImage.thumbUrl}
                    alt={item.product.name}
                    className="h-32 w-full rounded object-cover"
                  />
                </div>

                <span className="text-s16-l24 text-orange w-full text-center font-medium wrap-break-word">
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
