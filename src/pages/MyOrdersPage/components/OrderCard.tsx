import { useNavigate } from "react-router-dom";
import type { Order } from "../../../api/models/Order.model";
import { BUTTON_PRIMARY } from "../../../shared/constants/CommonTailwindClasses.constants";
import {
  ORDER_STATUS_COLOR_PAIRS,
  ORDER_STATUS_ICON_PAIRS,
  ORDER_STATUS_TEXT_PAIRS,
} from "../../../shared/constants/Order.constants";
import { ROUTES } from "../../../shared/constants/Routes.constants";
import { canCheckoutOrder } from "../../../shared/utils/Order.util";
import { customTwMerge } from "../../../shared/utils/Tailwind.util";

const OrderCard = ({
  order,
  currencyCode,
}: {
  order: Order;
  // TODO: remove currencyCode
  currencyCode: string;
}) => {
  const navigate = useNavigate();

  const statusColors = ORDER_STATUS_COLOR_PAIRS[order.status];
  const StatusIcon = ORDER_STATUS_ICON_PAIRS[order.status];

  return (
    <div className="border-border-secondary flex justify-between rounded-lg border p-6 shadow-md">
      <div className="flex gap-x-5">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-md border"
          style={{
            backgroundColor: statusColors.muted,
            borderColor: statusColors.secondary,
          }}
        >
          <StatusIcon
            className="h-6 w-6"
            style={{ fill: statusColors.primary }}
          />
        </div>

        <div className="flex flex-col gap-y-5">
          <div className="flex flex-col gap-y-1.5">
            <div className="flex items-center gap-x-3">
              <span className="text-s18-l28 text-text-primary font-bold">
                Order #{order.id}
              </span>

              <div
                className="flex items-center justify-center rounded-full border px-3 py-1"
                style={{
                  backgroundColor: statusColors.muted,
                  borderColor: statusColors.secondary,
                }}
              >
                <span
                  className="text-s12-l16 font-medium"
                  style={{ color: statusColors.primary }}
                >
                  {ORDER_STATUS_TEXT_PAIRS[order.status]}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-x-3">
              <span className="text-s14-l20 text-text-muted">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
              <div className="bg-border-primary h-1 w-1 rounded-full" />
              <span className="text-s14-l20 text-text-muted">
                {order.items.length} {order.items.length > 1 ? "Items" : "Item"}
              </span>
            </div>
          </div>

          <div className="flex min-w-max gap-x-5">
            {order.items.map((item) => {
              const img = item.product.images.find((img) => img.isPrimary);

              if (!img) {
                return null;
              }

              return (
                <img
                  key={item.id}
                  src={img.thumbUrl}
                  alt={item.product.name}
                  onClick={() =>
                    navigate(ROUTES.PRODUCT_DETAIL_PAGE.build(item.product.id))
                  }
                  className="h-8 w-8 cursor-pointer rounded object-cover"
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-x-8">
        <div className="flex flex-col">
          <span className="text-s14-l20 text-text-disabled font-semibold">
            Total Price
          </span>
          <span className="text-s20-l28 text-accent font-bold">
            {order.totalPrice.toFixed(2)} {currencyCode}
          </span>
        </div>

        <div className="flex min-w-[250px] items-center justify-end gap-x-4">
          {canCheckoutOrder(order.status) && (
            <button
              onClick={() => navigate(ROUTES.CHECKOUT_PAGE.build(order.id))}
              className={customTwMerge(
                BUTTON_PRIMARY,
                "w-full rounded-full px-6 lg:w-auto",
              )}
            >
              Pay Now
            </button>
          )}

          <button
            onClick={() => navigate(ROUTES.ORDER_DETAIL_PAGE.build(order.id))}
            className={customTwMerge(
              BUTTON_PRIMARY,
              "w-full rounded-full px-6 lg:w-auto",
            )}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
