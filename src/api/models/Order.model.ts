import type { ORDER_STATUS } from "../enums/OrderStatus.enum";
import type { OrderItem } from "./OrderItem.model";

export type Order = {
  id: number;
  userId: number;
  status: ORDER_STATUS;
  totalPrice: number;
  currencyId: number;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
};
