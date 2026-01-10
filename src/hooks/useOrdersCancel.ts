import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reqOrdersCancel } from "../api/controllers/Orders.controller";
import type { ReqOrdersCancelResponse } from "../api/responses/ReqOrdersCancelResponse.model";
import { EVENT_TYPE } from "../shared/enums/EventType.enum";
import { TOAST_TYPE } from "../shared/enums/ToastType.enum";
import { showToast } from "../shared/utils/Toast.util";

export const useOrdersCancel = () => {
  const queryClient = useQueryClient();

  return useMutation<ReqOrdersCancelResponse, Error, number>({
    mutationFn: async (orderId) => {
      const res = await reqOrdersCancel(orderId);
      return res.data;
    },

    onSuccess: (_data, orderId) => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });

      queryClient.invalidateQueries({
        queryKey: ["order", orderId],
      });

      window.dispatchEvent(
        new CustomEvent<
          WindowEventMap[typeof EVENT_TYPE.ORDER_CANCELED]["detail"]
        >(EVENT_TYPE.ORDER_CANCELED, {
          detail: { orderId },
        }),
      );

      showToast({
        title: "Order canceled",
        description: "Your order has been successfully canceled.",
        type: TOAST_TYPE.SUCCESS,
      });
    },

    onError: () => {
      showToast({
        description: "Failed to cancel the order.",
        type: TOAST_TYPE.ERROR,
      });
    },
  });
};
