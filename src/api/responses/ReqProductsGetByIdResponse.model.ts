import type { Product } from "../models/Product.model";

export type ReqProductsGetByIdResponse = Product & {
  // TODO: avg rating ve reviewCount Product modeline taşınabilir
  avgRating: number;
  reviewCount: number;
};
