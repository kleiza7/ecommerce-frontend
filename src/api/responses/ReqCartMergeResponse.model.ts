import type { Cart } from "../models/Cart.model";

export type ReqCartMergeResponse = Omit<Cart, "id" | "userId">;
