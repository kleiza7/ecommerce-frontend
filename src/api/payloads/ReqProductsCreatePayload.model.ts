import type { Product } from "../models/Product.model";

export type ReqProductsCreatePayload = Omit<
  Product,
  "id" | "sellerId" | "status" | "images"
> & {
  images: File[];
};
