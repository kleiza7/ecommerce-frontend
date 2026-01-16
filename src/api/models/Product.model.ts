import type { PRODUCT_STATUS } from "../enums/ProductStatus.enum";
import type { Brand } from "./Brand.model";
import type { Category } from "./Category.model";
import type { Currency } from "./Currency.model";
import type { ProductImage } from "./ProductImage.model";
import type { User } from "./User.model";

export type Product = {
  id: number;
  name: string;
  description: string;
  stockCount: number;
  price: number;
  brand: Pick<Brand, "id" | "name">;
  category: Pick<Category, "id" | "name">;
  currency: Pick<Currency, "id" | "code" | "symbol">;
  seller: Pick<User, "id" | "name">;
  status: PRODUCT_STATUS;
  images: ProductImage[];
};
