import type { Product } from "../models/Product.model";

export type ReqProductsListResponse = {
  items: (Omit<Product, "images"> & {
    images: {
      thumbUrl: string;
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
