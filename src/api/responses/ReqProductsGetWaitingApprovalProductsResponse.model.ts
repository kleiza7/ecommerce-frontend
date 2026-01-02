import type { Product } from "../models/Product.model";

export type ReqProductsGetWaitingApprovalProductsResponse = {
  items: (Omit<Product, "images"> & {
    images: {
      mediumUrl: string;
      id: number;
      isPrimary: boolean;
    }[];
  })[];
};
