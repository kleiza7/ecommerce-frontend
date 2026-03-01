import type { ProductReview } from "../models/ProductReview.model";

export type ReqProductReviewsGetReviewsByProductIdResponse = (Pick<
  ProductReview,
  "id" | "rating" | "comment" | "createdAt"
> & {
  user: {
    id: number;
    name: string;
  };
})[];
