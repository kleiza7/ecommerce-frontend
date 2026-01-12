import type { Product } from "../../api/models/Product.model";

export interface FavoriteItemUI {
  id?: number;
  productId: number;
  product: Omit<Product, "images"> & {
    images: {
      mediumUrl: string;
      id: number;
      isPrimary: boolean;
    }[];
  };
}
