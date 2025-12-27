import { useMutation } from "@tanstack/react-query";
import { reqProductsUpdate } from "../api/controllers/Products.controller";
import type { ReqProductsUpdatePayload } from "../api/payloads/ReqProductsUpdatePayload.model";
import type { ReqProductsUpdateResponse } from "../api/responses/ReqProductsUpdateResponse.model";
import { TOAST_TYPE } from "../shared/enums/ToastType.enum";
import { showToast } from "../shared/utils/Toast.util";

export const useProductsUpdate = () => {
  return useMutation<
    ReqProductsUpdateResponse,
    Error,
    ReqProductsUpdatePayload
  >({
    mutationFn: async (payload) => {
      const res = await reqProductsUpdate(payload);
      return res.data;
    },

    onSuccess: () => {
      showToast({
        title: "Product updated",
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
