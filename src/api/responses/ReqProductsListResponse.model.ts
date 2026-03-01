import type { Product } from "../models/Product.model";

export type ReqProductsListResponse = {
  items: (Omit<Product, "images"> & {
    // TODO: avg rating and reviewCount can be moved to the Product model
    avgRating: number;
    reviewCount: number;
    images: {
      mediumUrl: string;
      id: number;
      isPrimary: boolean;
    }[];
  })[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};
