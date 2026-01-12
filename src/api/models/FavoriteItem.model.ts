import type { Product } from "./Product.model";

export type FavoriteItem = {
  id: number;
  productId: number;
  userId: number;
  product: Omit<Product, "images"> & {
    images: {
      mediumUrl: string;
      id: number;
      isPrimary: boolean;
    }[];
  };
};
