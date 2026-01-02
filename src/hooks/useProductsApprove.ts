import { useMutation } from "@tanstack/react-query";
import { reqProductsApprove } from "../api/controllers/Products.controller";
import type { ReqProductsApproveResponse } from "../api/responses/ReqProductsApproveResponse.model";
import { TOAST_TYPE } from "../shared/enums/ToastType.enum";
import { showToast } from "../shared/utils/Toast.util";

export const useProductsApprove = () => {
  return useMutation<ReqProductsApproveResponse, Error, number>({
    mutationFn: async (id) => {
      const res = await reqProductsApprove(id);
      return res.data;
    },

    onSuccess: () => {
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
