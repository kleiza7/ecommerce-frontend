import { useMutation } from "@tanstack/react-query";
import { reqBrandsUpdate } from "../api/controllers/Brands.controller";
import type { ReqBrandsUpdatePayload } from "../api/payloads/ReqBrandsUpdatePayload.model";
import type { ReqBrandsUpdateResponse } from "../api/responses/ReqBrandsUpdateResponse.model";
import { TOAST_TYPE } from "../shared/enums/ToastType.enum";
import { showToast } from "../shared/utils/Toast.util";

export const useBrandsUpdate = () => {
  return useMutation<
    ReqBrandsUpdateResponse,
    Error,
    { id: number; payload: ReqBrandsUpdatePayload }
  >({
    mutationFn: async ({ id, payload }) => {
      const res = await reqBrandsUpdate(id, payload);
      return res.data;
    },

    onSuccess: () => {
      showToast({
        title: "Brand updated",
        description: "The brand has been successfully updated.",
        type: TOAST_TYPE.SUCCESS,
      });
    },

    onError: () => {
      showToast({
        description: "Failed to update the brand.",
        type: TOAST_TYPE.ERROR,
      });
    },
  });
};
