import { useMutation } from "@tanstack/react-query";
import { reqProductsDelete } from "../api/controllers/Products.controller";
import type { ReqProductsDeleteResponse } from "../api/responses/ReqProductsDeleteResponse.model";
import { TOAST_TYPE } from "../shared/enums/ToastType.enum";
import { showToast } from "../shared/utils/Toast.util";

export const useProductsDelete = () => {
  return useMutation<ReqProductsDeleteResponse, Error, number>({
    mutationFn: async (id) => {
      const res = await reqProductsDelete(id);
      return res.data;
    },

    onSuccess: () => {
      showToast({
        title: "Product deleted",
        description: "The product has been successfully removed.",
        type: TOAST_TYPE.SUCCESS,
      });
    },

    onError: () => {
      showToast({
        description: "Failed to delete the product.",
        type: TOAST_TYPE.ERROR,
      });
    },
  });
};
