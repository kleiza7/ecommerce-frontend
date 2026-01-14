import type { Product } from "../models/Product.model";

export type ReqProductsCreatePayload = Omit<
  Product,
  "id" | "brand" | "category" | "currency" | "seller" | "status" | "images"
> & {
  brandId: number;
  categoryId: number;
  currencyId: number;
  images: File[];
};
