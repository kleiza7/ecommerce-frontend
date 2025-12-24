import { useMutation } from "@tanstack/react-query";
import { reqCategoriesDelete } from "../api/controllers/Categories.controller";
import type { ReqCategoriesDeleteResponse } from "../api/responses/ReqCategoriesDeleteResponse.model";
import { TOAST_TYPE } from "../shared/enums/ToastType.enum";
import { showToast } from "../shared/utils/Toast.util";

export const useCategoriesDelete = () => {
  return useMutation<ReqCategoriesDeleteResponse, Error, number>({
    mutationFn: async (id) => {
      const res = await reqCategoriesDelete(id);
      return res.data;
    },

    onSuccess: () => {
      showToast({
        title: "Category deleted",
        description: "The category has been successfully removed.",
        type: TOAST_TYPE.SUCCESS,
      });
    },

    onError: () => {
      showToast({
        description: "Failed to delete the category.",
        type: TOAST_TYPE.ERROR,
      });
    },
  });
};
