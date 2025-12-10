import { useMutation } from "@tanstack/react-query";
import { reqCategoriesCreate } from "../api/controllers/Categories.controller";
import type { ReqCategoriesCreatePayload } from "../api/payloads/ReqCategoriesCreatePayload.model";
import type { ReqCategoriesCreateResponse } from "../api/responses/ReqCategoriesCreateResponse.model";
import { TOAST_TYPE } from "../shared/enums/ToastType.enum";
import { showToast } from "../shared/utils/Toast.util";

export const useCategoriesCreate = () => {
  return useMutation<
    ReqCategoriesCreateResponse,
    Error,
    ReqCategoriesCreatePayload
  >({
    mutationFn: async (payload) => {
      const res = await reqCategoriesCreate(payload);
      return res.data;
    },

    onSuccess: () => {
      showToast({
        title: "Category created",
        description: "The category has been successfully added.",
        type: TOAST_TYPE.SUCCESS,
      });
    },

    onError: () => {
      showToast({
        description: "Failed to create the category.",
        type: TOAST_TYPE.ERROR,
      });
    },
  });
};
