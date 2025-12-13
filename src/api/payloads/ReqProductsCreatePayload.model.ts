import type { Product } from "../models/Product.model";

export type ReqProductsCreatePayload = Omit<Product, "id" | "images"> & {
  images: File[];
};
