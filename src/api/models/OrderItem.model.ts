import type { Product } from "./Product.model";

export type OrderItem = {
  id: number;
  orderId: number;
  productId: number;
  productName: string;
  priceSnapshot: number;
  quantity: number;
  createdAt: string;
  product: Omit<Product, "images"> & {
    images: {
      id: number;
      thumbUrl: string;
      isPrimary: boolean;
    }[];
  };
};
