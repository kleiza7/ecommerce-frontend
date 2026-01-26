import { useNavigate } from "react-router-dom";
import type { Order } from "../../../api/models/Order.model";
import {
  BUTTON_PRIMARY,
  BUTTON_SIZE_SMALL,
} from "../../../shared/constants/CommonTailwindClasses.constants";
import { ORDER_STATUS_TEXT_PAIRS } from "../../../shared/constants/Order.constants";
import { customTwMerge } from "../../../shared/utils/Tailwind.util";
import { useUserStore } from "../../../stores/UserStore";

const OrderCard = ({
  order,
  currencyCode,
}: {
  order: Order;
  // TODO: remove currencyCode
  currencyCode: string;
}) => {
  // TODO: remove it
  const userName = useUserStore((state) => state.user?.name);
  const navigate = useNavigate();

  return (
    <div className="border-gray-1 rounded-lg border">
      <div className="border-gray-1 bg-gray-3 flex flex-col gap-3 border-b px-5 py-3 md:flex-row md:items-center md:gap-x-5">
        <div className="text-text-primary flex flex-1 flex-wrap gap-y-3 md:flex-nowrap md:gap-x-5">
          <div className="text-s14-l20 w-1/2 md:w-auto md:flex-1">
            <div className="font-medium">Order Date</div>
            {new Date(order.createdAt).toLocaleDateString()}
          </div>

          <div className="text-s14-l20 w-1/2 md:w-auto md:flex-1">
            <div className="font-medium">Order Summary</div>
            {order.items.length} Items
          </div>

          <div className="text-s14-l20 w-1/2 md:w-auto md:flex-1">
            <div className="font-medium">Recipient</div>
            {userName ?? ""}
          </div>

          <div className="text-s14-l20 w-1/2 md:w-auto md:flex-1">
            <div className="font-medium">Total</div>
            <span className="text-orange">
              {order.totalPrice.toFixed(2)} {currencyCode}
            </span>
          </div>
        </div>

        <button
          onClick={() => navigate(`/order-detail/${order.id}`)}
          className={customTwMerge(
            BUTTON_PRIMARY,
            BUTTON_SIZE_SMALL,
            "w-full px-6 md:w-auto",
          )}
        >
          Details
        </button>
      </div>

      <div className="p-5">
        <div className="border-gray-1 flex flex-col gap-y-3 rounded-md border px-5 py-3 md:flex-row md:items-center md:gap-x-6 md:gap-y-0">
          <div className="text-s14-l20 font-semibold md:w-[30%] md:shrink-0">
            {ORDER_STATUS_TEXT_PAIRS[order.status]}
          </div>

          <div className="flex-1 overflow-x-auto">
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
                      navigate(`/product-detail/${item.product.id}`)
                    }
                    className="h-20 w-20 cursor-pointer rounded object-cover"
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
