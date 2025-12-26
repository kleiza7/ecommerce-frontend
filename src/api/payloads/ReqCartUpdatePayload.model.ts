import type { CartItem } from "../models/CartItem.model";

export type ReqCartUpdatePayload = {
  itemId: CartItem["id"];
  quantity: CartItem["quantity"];
};
