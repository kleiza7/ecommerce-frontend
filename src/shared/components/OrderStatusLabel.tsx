import type { ORDER_STATUS } from "../../api/enums/OrderStatus.enum";
import {
  ORDER_STATUS_COLOR_PAIRS,
  ORDER_STATUS_TEXT_PAIRS,
} from "../constants/Order.constants";

const OrderStatusLabel = ({ status }: { status: ORDER_STATUS }) => {
  const statusColors = ORDER_STATUS_COLOR_PAIRS[status];

  return (
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
        {ORDER_STATUS_TEXT_PAIRS[status]}
      </span>
    </div>
  );
};

export default OrderStatusLabel;
