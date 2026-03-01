import type { Product } from "../models/Product.model";

export type ReqProductsListResponse = {
  items: (Omit<Product, "images"> & {
    // TODO: avg rating ve reviewCount Product modeline taşınabilir
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
