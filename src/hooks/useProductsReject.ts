import { useMutation } from "@tanstack/react-query";
import { reqProductsReject } from "../api/controllers/Products.controller";
import type { ReqProductsRejectResponse } from "../api/responses/ReqProductsRejectResponse.model";
import { EVENT_TYPE } from "../shared/enums/EventType.enum";
import { TOAST_TYPE } from "../shared/enums/ToastType.enum";
import { showToast } from "../shared/utils/Toast.util";

export const useProductsReject = () => {
  return useMutation<ReqProductsRejectResponse, Error, number>({
    mutationFn: async (id) => {
      const res = await reqProductsReject(id);
      return res.data;
    },

    onSuccess: (_, productId) => {
      window.dispatchEvent(
        new CustomEvent<
          WindowEventMap[typeof EVENT_TYPE.PRODUCT_REJECTED]["detail"]
        >(EVENT_TYPE.PRODUCT_REJECTED, {
          detail: { productId },
        }),
      );

      showToast({
        title: "Product status updated",
        description: "The product has been successfully updated.",
        type: TOAST_TYPE.SUCCESS,
      });
    },

    onError: () => {
      showToast({
        description: "Failed to update the product.",
        type: TOAST_TYPE.ERROR,
      });
    },
  });
};
