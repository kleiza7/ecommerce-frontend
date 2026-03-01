// useProductReviewsDelete.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reqProductReviewsDelete } from "../api/controllers/ProductReviews.controller";
import type { ReqProductReviewsDeleteResponse } from "../api/responses/ReqProductReviewsDeleteResponse.model";
import { EVENT_TYPE } from "../shared/enums/EventType.enum";
import { TOAST_TYPE } from "../shared/enums/ToastType.enum";
import { showToast } from "../shared/utils/Toast.util";

export const useProductReviewsDelete = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ReqProductReviewsDeleteResponse,
    Error,
    {
      id: number;
      productId: number;
    }
  >({
    mutationFn: async ({ id }) => {
      const res = await reqProductReviewsDelete(id);
      return res.data;
    },

    onSuccess: (_, { id, productId }) => {
      queryClient.invalidateQueries({
        queryKey: ["product-reviews", "get-reviews-by-product-id", productId],
      });

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      window.dispatchEvent(
        new CustomEvent<
          WindowEventMap[typeof EVENT_TYPE.PRODUCT_REVIEW_DELETED]["detail"]
        >(EVENT_TYPE.PRODUCT_REVIEW_DELETED, {
          detail: { id },
        }),
      );

      showToast({
        title: "Review deleted",
        description: "Your review has been successfully removed.",
        type: TOAST_TYPE.SUCCESS,
      });
    },

    onError: () => {
      showToast({
        description: "Failed to delete the review.",
        type: TOAST_TYPE.ERROR,
      });
    },
  });
};
