import type { CartItem } from "../models/CartItem.model";

export type ReqCartUpdateResponse = Omit<CartItem, "product">;
