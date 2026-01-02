import type { PRODUCT_STATUS } from "../enums/ProductStatus.enum";
import type { ProductImage } from "./ProductImage.model";

export type Product = {
  id: number;
  name: string;
  description: string;
  stockCount: number;
  price: number;
  brandId: number;
  categoryId: number;
  currencyId: number;
  sellerId: number;
  status: PRODUCT_STATUS;
  images: ProductImage[];
};
