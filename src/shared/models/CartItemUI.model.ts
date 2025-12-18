import type { Product } from "../../api/models/Product.model";

export interface CartItemUI {
  id?: number;
  productId: number;
  quantity: number;
  priceSnapshot: number;
  product: Omit<Product, "images"> & {
    images: {
      thumbUrl: string;
      isPrimary: boolean;
    }[];
  };
}
