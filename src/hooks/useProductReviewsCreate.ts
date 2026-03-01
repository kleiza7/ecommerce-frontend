import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { reqProductReviewsCreate } from "../api/controllers/ProductReviews.controller";
import type { ReqProductReviewsCreatePayload } from "../api/payloads/ReqProductReviewsCreatePayload.model";
import type { ApiErrorResponse } from "../api/responses/ApiErrorResponse.model";
import type { ReqProductReviewsCreateResponse } from "../api/responses/ReqProductReviewsCreateResponse.model";
import { EVENT_TYPE } from "../shared/enums/EventType.enum";
import { TOAST_TYPE } from "../shared/enums/ToastType.enum";
import { showToast } from "../shared/utils/Toast.util";

export const useProductReviewsCreate = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ReqProductReviewsCreateResponse,
    AxiosError<ApiErrorResponse>,
    ReqProductReviewsCreatePayload
  >({
    mutationFn: async (payload) => {
      const res = await reqProductReviewsCreate(payload);
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
          WindowEventMap[typeof EVENT_TYPE.PRODUCT_REVIEW_CREATED]["detail"]
        >(EVENT_TYPE.PRODUCT_REVIEW_CREATED, {
          detail: data,
        }),
      );

      showToast({
        title: "Review created",
        description: "Your review has been successfully submitted.",
        type: TOAST_TYPE.SUCCESS,
      });
    },

    onError: (error) => {
      const message = error.response?.data?.message;

      showToast({
        description: message ?? "Failed to create the review.",
        type: TOAST_TYPE.ERROR,
      });
    },
  });
};
