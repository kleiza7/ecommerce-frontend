import type { CartItem } from "./CartItem.model";

export type Cart = {
  id: number;
  userId: number;
  items: CartItem[];
};
