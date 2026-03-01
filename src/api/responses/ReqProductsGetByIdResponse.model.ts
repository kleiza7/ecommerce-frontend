import type { Product } from "../models/Product.model";

export type ReqProductsGetByIdResponse = Product & {
  // TODO: avg rating and reviewCount can be moved to the Product model
  avgRating: number;
  reviewCount: number;
};
