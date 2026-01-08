import type { Product } from "../models/Product.model";

export type ReqProductsGetProductsBySellerResponse = (Omit<
  Product,
  "images"
> & {
  images: {
    mediumUrl: string;
    id: number;
    isPrimary: boolean;
  }[];
})[];
