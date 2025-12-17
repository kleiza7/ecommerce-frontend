import { useMutation } from "@tanstack/react-query";
import { reqCartClear } from "../api/controllers/Cart.controller";
import type { ReqCartClearResponse } from "../api/responses/ReqCartClearResponse.model";
import { TOAST_TYPE } from "../shared/enums/ToastType.enum";
import { showToast } from "../shared/utils/Toast.util";

export const useCartClear = (
  onSuccessCallback?: (data: ReqCartClearResponse) => void,
) => {
  return useMutation<ReqCartClearResponse, Error, void>({
    mutationFn: async () => {
      const res = await reqCartClear();
      return res.data;
    },

    onSuccess: (data) => {
      showToast({
        title: "Cart cleared",
        description: "All items have been removed from your cart.",
        type: TOAST_TYPE.SUCCESS,
      });

      onSuccessCallback?.(data);
    },

    onError: () => {
      showToast({
        description: "Failed to clear the cart.",
        type: TOAST_TYPE.ERROR,
      });
    },
  });
};
