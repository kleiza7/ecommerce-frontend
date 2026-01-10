import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reqOrdersCompletePayment } from "../api/controllers/Orders.controller";
import type { ReqOrdersCompletePaymentResponse } from "../api/responses/ReqOrdersCompletePaymentResponse.model";
import { EVENT_TYPE } from "../shared/enums/EventType.enum";
import { TOAST_TYPE } from "../shared/enums/ToastType.enum";
import { showToast } from "../shared/utils/Toast.util";

export const useOrdersCompletePayment = () => {
  const queryClient = useQueryClient();

  return useMutation<ReqOrdersCompletePaymentResponse, Error, number>({
    mutationFn: async (orderId) => {
      const res = await reqOrdersCompletePayment(orderId);
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
        new CustomEvent<WindowEventMap[typeof EVENT_TYPE.ORDER_PAID]["detail"]>(
          EVENT_TYPE.ORDER_PAID,
          {
            detail: { orderId },
          },
        ),
      );

      showToast({
        title: "Payment completed",
        description: "Your payment has been successfully completed.",
        type: TOAST_TYPE.SUCCESS,
      });
    },

    onError: () => {
      showToast({
        description: "Payment failed. Please try again.",
        type: TOAST_TYPE.ERROR,
      });
    },
  });
};
