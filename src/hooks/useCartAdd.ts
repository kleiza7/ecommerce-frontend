import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { reqCartAdd } from "../api/controllers/Cart.controller";
import type { ReqCartAddPayload } from "../api/payloads/ReqCartAddPayload.model";
import type { ApiErrorResponse } from "../api/responses/ApiErrorResponse.model";
import type { ReqCartAddResponse } from "../api/responses/ReqCartAddResponse.model";
import { TOAST_TYPE } from "../shared/enums/ToastType.enum";
import { showToast } from "../shared/utils/Toast.util";

export const useCartAdd = () => {
  return useMutation<
    ReqCartAddResponse,
    AxiosError<ApiErrorResponse>,
    ReqCartAddPayload
  >({
    mutationFn: async (payload) => {
      const res = await reqCartAdd(payload);
      return res.data;
    },

    onSuccess: () => {
      // INFO: commented for optimistic update
      // showToast({
      //   title: "Added to cart",
      //   description: "The item has been successfully added to your cart.",
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
        description: "Failed to add the item to the cart.",
        type: TOAST_TYPE.ERROR,
      });
    },
  });
};
