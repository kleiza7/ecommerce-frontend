export type ProductReview = {
  id: number;
  rating: number;
  comment: string | null;
  productId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
};
