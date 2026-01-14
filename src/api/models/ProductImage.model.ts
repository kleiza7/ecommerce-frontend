export type ProductImage = {
  id: number;
  productId: number;
  originalUrl: string;
  thumbUrl: string;
  mediumUrl: string;
  largeUrl: string;
  isPrimary: boolean;
  publicId: string | null;
  createdAt: string;
  updatedAt: string;
};
