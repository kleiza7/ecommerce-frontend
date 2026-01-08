import type { Product } from "../models/Product.model";

export type ReqProductsUpdatePayload = Omit<
  Product,
  "sellerId" | "status" | "images"
> & {
  newAddedImages: File[];
  deletedImageIds: number[];
};
