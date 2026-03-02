import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reqProductReviewsUpdate } from "../api/controllers/ProductReviews.controller";
import type { ReqProductReviewsUpdatePayload } from "../api/payloads/ReqProductReviewsUpdatePayload.model";
import type { ReqProductReviewsUpdateResponse } from "../api/responses/ReqProductReviewsUpdateResponse.model";
import { EVENT_TYPE } from "../shared/enums/EventType.enum";
import { TOAST_TYPE } from "../shared/enums/ToastType.enum";
import { showToast } from "../shared/utils/Toast.util";

export const useProductReviewsUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ReqProductReviewsUpdateResponse,
    Error,
    ReqProductReviewsUpdatePayload
  >({
    mutationFn: async (payload) => {
      const res = await reqProductReviewsUpdate(payload);
      return res.data;
    },

    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          "product-reviews",
          "get-reviews-by-product-id",
          variables.productId,
        ],
      });

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      window.dispatchEvent(
        new CustomEvent<
          WindowEventMap[typeof EVENT_TYPE.PRODUCT_REVIEW_UPDATED]["detail"]
        >(EVENT_TYPE.PRODUCT_REVIEW_UPDATED, {
          detail: data,
        }),
      );

      showToast({
        title: "Review updated",
        description: "Your review has been successfully updated.",
        type: TOAST_TYPE.SUCCESS,
      });
    },

    onError: () => {
      showToast({
        description: "Failed to update the review.",
        type: TOAST_TYPE.ERROR,
      });
    },
  });
};
