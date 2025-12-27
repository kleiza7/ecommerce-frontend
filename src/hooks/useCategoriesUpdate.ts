import { useMutation } from "@tanstack/react-query";
import { reqCategoriesUpdate } from "../api/controllers/Categories.controller";
import type { ReqCategoriesUpdatePayload } from "../api/payloads/ReqCategoriesUpdatePayload.model";
import type { ReqCategoriesUpdateResponse } from "../api/responses/ReqCategoriesUpdateResponse.model";
import { TOAST_TYPE } from "../shared/enums/ToastType.enum";
import { showToast } from "../shared/utils/Toast.util";

export const useCategoriesUpdate = () => {
  return useMutation<
    ReqCategoriesUpdateResponse,
    Error,
    ReqCategoriesUpdatePayload
  >({
    mutationFn: async (payload) => {
      const res = await reqCategoriesUpdate(payload);
      return res.data;
    },

    onSuccess: () => {
      showToast({
        title: "Category updated",
        description: "The category has been successfully updated.",
        type: TOAST_TYPE.SUCCESS,
      });
    },

    onError: () => {
      showToast({
        description: "Failed to update the category.",
        type: TOAST_TYPE.ERROR,
      });
    },
  });
};
