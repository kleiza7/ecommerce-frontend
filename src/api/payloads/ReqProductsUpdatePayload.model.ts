import type { Product } from "../models/Product.model";

export type ReqProductsUpdatePayload = Omit<Product, "images"> & {
  newAddedImages: File[];
  deletedImageIds: number[];
};
