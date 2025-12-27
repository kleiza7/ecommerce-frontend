import { useMutation } from "@tanstack/react-query";
import { reqCartUpdate } from "../api/controllers/Cart.controller";
import type { ReqCartUpdatePayload } from "../api/payloads/ReqCartUpdatePayload.model";
import type { ReqCartUpdateResponse } from "../api/responses/ReqCartUpdateResponse.model";
import { TOAST_TYPE } from "../shared/enums/ToastType.enum";
import { showToast } from "../shared/utils/Toast.util";

export const useCartUpdate = (
  onSuccessCallback?: (data: ReqCartUpdateResponse) => void,
) => {
  return useMutation<ReqCartUpdateResponse, Error, ReqCartUpdatePayload>({
    mutationFn: async (payload) => {
      const res = await reqCartUpdate(payload);
      return res.data;
    },

    onSuccess: (data) => {
      showToast({
        title: "Cart updated",
        description: "The item quantity has been successfully updated.",
        type: TOAST_TYPE.SUCCESS,
      });

      onSuccessCallback?.(data);
    },

    onError: () => {
      showToast({
        description: "Failed to update the cart item.",
        type: TOAST_TYPE.ERROR,
      });
    },
  });
};
