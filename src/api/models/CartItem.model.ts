import type { Product } from "./Product.model";

export type CartItem = {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  priceSnapshot: number;
  currencyId: number;
  product: Omit<Product, "images"> & {
    images: {
      thumbUrl: string;
      isPrimary: boolean;
    }[];
  };
};
