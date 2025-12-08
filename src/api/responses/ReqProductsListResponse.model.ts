import type { Product } from "../models/Product.model";

export type ReqProductsListResponse = {
  items: Product[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};
