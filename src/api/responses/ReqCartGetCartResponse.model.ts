import type { Cart } from "../models/Cart.model";

export type ReqCartGetCartResponse = Omit<Cart, "id" | "userId">;
