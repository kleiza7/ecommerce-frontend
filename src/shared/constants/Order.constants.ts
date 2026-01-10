import { ORDER_STATUS } from "../../api/enums/OrderStatus.enum";

export const ORDER_STATUS_TEXT_PAIRS: Record<ORDER_STATUS, string> = {
  [ORDER_STATUS.PENDING]: "Pending",
  [ORDER_STATUS.PAID]: "Paid",
  [ORDER_STATUS.COMPLETED]: "Completed",
  [ORDER_STATUS.CANCELED]: "Canceled",
};
