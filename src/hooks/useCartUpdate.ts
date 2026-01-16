import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { reqCartUpdate } from "../api/controllers/Cart.controller";
import type { ReqCartUpdatePayload } from "../api/payloads/ReqCartUpdatePayload.model";
import type { ReqCartUpdateResponse } from "../api/responses/ReqCartUpdateResponse.model";
import { TOAST_TYPE } from "../shared/enums/ToastType.enum";
import { showToast } from "../shared/utils/Toast.util";

type ApiErrorResponse = {
  message?: string;
};

export const useCartUpdate = (
  onSuccessCallback?: (data: ReqCartUpdateResponse) => void,
) => {
  return useMutation<
    ReqCartUpdateResponse,
    AxiosError<ApiErrorResponse>,
    ReqCartUpdatePayload
  >({
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

    onError: (error) => {
      const status = error.response?.status;
      const message = error.response?.data?.message;

      if (status === 409) {
        showToast({
          description:
            message ??
            "You have reached the maximum available stock for this product.",
          type: TOAST_TYPE.ERROR,
        });
        return;
      }

      showToast({
        description: "Failed to update the cart item.",
        type: TOAST_TYPE.ERROR,
      });
    },
  });
};
