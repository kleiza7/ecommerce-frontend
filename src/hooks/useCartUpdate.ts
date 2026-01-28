import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { reqCartUpdate } from "../api/controllers/Cart.controller";
import type { ReqCartUpdatePayload } from "../api/payloads/ReqCartUpdatePayload.model";
import type { ApiErrorResponse } from "../api/responses/ApiErrorResponse.model";
import type { ReqCartUpdateResponse } from "../api/responses/ReqCartUpdateResponse.model";
import { TOAST_TYPE } from "../shared/enums/ToastType.enum";
import { showToast } from "../shared/utils/Toast.util";

export const useCartUpdate = () => {
  return useMutation<
    ReqCartUpdateResponse,
    AxiosError<ApiErrorResponse>,
    ReqCartUpdatePayload
  >({
    mutationFn: async (payload) => {
      const res = await reqCartUpdate(payload);
      return res.data;
    },

    onSuccess: () => {
      // INFO: commented for optimistic update
      // showToast({
      //   title: "Cart updated",
      //   description: "The item quantity has been successfully updated.",
      //   type: TOAST_TYPE.SUCCESS,
      // });
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
