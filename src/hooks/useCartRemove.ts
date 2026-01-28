import { useMutation } from "@tanstack/react-query";
import { reqCartRemove } from "../api/controllers/Cart.controller";
import type { ReqCartRemoveResponse } from "../api/responses/ReqCartRemoveResponse.model";
import { TOAST_TYPE } from "../shared/enums/ToastType.enum";
import { showToast } from "../shared/utils/Toast.util";

export const useCartRemove = () => {
  return useMutation<ReqCartRemoveResponse, Error, number>({
    mutationFn: async (id) => {
      const res = await reqCartRemove(id);
      return res.data;
    },

    onSuccess: () => {
      // INFO: commented for optimistic update
      // showToast({
      //   title: "Item removed",
      //   description: "The item has been successfully removed from your cart.",
      //   type: TOAST_TYPE.SUCCESS,
      // });
    },

    onError: () => {
      showToast({
        description: "Failed to remove the item from your cart.",
        type: TOAST_TYPE.ERROR,
      });
    },
  });
};
