import type { Product } from "../models/Product.model";

export type ReqProductsUpdatePayload = Omit<Product, "id" | "images"> & {
  newAddedImages: File[];
  deletedImageIds: number[];
};
