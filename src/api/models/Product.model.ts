import type { ProductImage } from "./ProductImage.model";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  brandId: number;
  categoryId: number;
  images: ProductImage[];
};
