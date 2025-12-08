import type { CartItem } from "../models/CartItem.model";
import type { Product } from "../models/Product.model";

export type ReqCartGetCartResponse = {
  items: (CartItem & {
    product: Product;
  })[];
};
