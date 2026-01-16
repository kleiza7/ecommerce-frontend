import type { Product } from "../models/Product.model";

export type ReqProductsUpdatePayload = Omit<
  Product,
  "brand" | "category" | "currency" | "seller" | "status" | "images"
> & {
  brandId: number;
  categoryId: number;
  currencyId: number;
  newAddedImages: File[];
  deletedImageIds: number[];
};
