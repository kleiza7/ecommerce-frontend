import type { Product } from "../models/Product.model";
import type { User } from "../models/User.model";

export type ReqProductsGetByIdResponse = Omit<Product, "seller"> & {
  seller: Pick<User, "id" | "name"> & {
    totalProductCount: number;
    totalReviewCount: number;
    avgRating: number;
  };
  // TODO: avg rating and reviewCount can be moved to the Product model
  avgRating: number;
  reviewCount: number;
};
