import type { CartItem } from "../models/CartItem.model";

export type ReqCartUpdatePayload = {
  quantity: CartItem["quantity"];
};
