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
  images: ProductImage[];
};
