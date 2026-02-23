import { useQuery } from "@tanstack/react-query";
import { reqProductReviewsGetReviewsByProductId } from "../api/controllers/ProductReviews.controller";
import type { ReqProductReviewsGetReviewsByProductIdResponse } from "../api/responses/ReqProductReviewsGetReviewsByProductIdResponse.model";

export const useProductReviewsGetReviewsByProductId = (productId: number) => {
  return useQuery<ReqProductReviewsGetReviewsByProductIdResponse>({
    queryKey: ["product-reviews", "get-reviews-by-product-id", productId],
    queryFn: async () => {
      const res = await reqProductReviewsGetReviewsByProductId(productId);
      return res.data;
    },
    enabled: !!productId,
    staleTime: 0,
  });
};
