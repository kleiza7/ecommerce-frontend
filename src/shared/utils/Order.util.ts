import { ORDER_STATUS } from "../../api/enums/OrderStatus.enum";

export const canCheckoutOrder = (orderStatus: ORDER_STATUS): boolean => {
  return orderStatus === ORDER_STATUS.PENDING;
};
