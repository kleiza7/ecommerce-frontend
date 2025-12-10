import { useMutation } from "@tanstack/react-query";
import { reqCartAdd } from "../api/controllers/Cart.controller";
import type { ReqCartAddPayload } from "../api/payloads/ReqCartAddPayload.model";
import type { ReqCartAddResponse } from "../api/responses/ReqCartAddResponse.model";
import { TOAST_TYPE } from "../shared/enums/ToastType.enum";
import { showToast } from "../shared/utils/Toast.util";

export const useCartAdd = () => {
  return useMutation<ReqCartAddResponse, Error, ReqCartAddPayload>({
    mutationFn: async (payload) => {
      const res = await reqCartAdd(payload);
      return res.data;
    },

    onSuccess: () => {
      showToast({
        title: "Added to cart",
        description: "The item has been successfully added to your cart.",
        type: TOAST_TYPE.SUCCESS,
      });
    },

    onError: () => {
      showToast({
        description: "Failed to add the item to the cart.",
        type: TOAST_TYPE.ERROR,
      });
    },
  });
};
