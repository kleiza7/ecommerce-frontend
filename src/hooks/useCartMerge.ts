import { useMutation } from "@tanstack/react-query";
import { reqCartMerge } from "../api/controllers/Cart.controller";
import type { ReqCartMergePayload } from "../api/payloads/ReqCartMergePayload.model";
import type { ReqCartMergeResponse } from "../api/responses/ReqCartMergeResponse.model";
import { TOAST_TYPE } from "../shared/enums/ToastType.enum";
import { showToast } from "../shared/utils/Toast.util";

export const useCartMerge = (
  onSuccessCallback?: (data: ReqCartMergeResponse) => void,
) => {
  return useMutation<ReqCartMergeResponse, Error, ReqCartMergePayload>({
    mutationFn: async (payload) => {
      const res = await reqCartMerge(payload);
      return res.data;
    },

    onSuccess: (data) => {
      onSuccessCallback?.(data);
    },

    onError: () => {
      showToast({
        description: "An error occurred while merging your cart.",
        type: TOAST_TYPE.ERROR,
      });
    },
  });
};
