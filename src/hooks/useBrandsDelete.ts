import { useMutation } from "@tanstack/react-query";
import { reqBrandsDelete } from "../api/controllers/Brands.controller";
import type { ReqBrandsDeleteResponse } from "../api/responses/ReqBrandsDeleteResponse.model";
import { TOAST_TYPE } from "../shared/enums/ToastType.enum";
import { showToast } from "../shared/utils/Toast.util";

export const useBrandsDelete = () => {
  return useMutation<ReqBrandsDeleteResponse, Error, number>({
    mutationFn: async (id) => {
      const res = await reqBrandsDelete(id);
      return res.data;
    },

    onSuccess: () => {
      showToast({
        title: "Brand deleted",
        description: "The brand has been successfully removed.",
        type: TOAST_TYPE.SUCCESS,
      });
    },

    onError: () => {
      showToast({
        description: "Failed to delete the brand.",
        type: TOAST_TYPE.ERROR,
      });
    },
  });
};
