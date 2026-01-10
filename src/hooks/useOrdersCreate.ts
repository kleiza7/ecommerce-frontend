import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reqOrdersCreate } from "../api/controllers/Orders.controller";
import type { ReqOrdersCreateResponse } from "../api/responses/ReqOrdersCreateResponse.model";
import { EVENT_TYPE } from "../shared/enums/EventType.enum";
import { TOAST_TYPE } from "../shared/enums/ToastType.enum";
import { showToast } from "../shared/utils/Toast.util";

export const useOrdersCreate = () => {
  const queryClient = useQueryClient();

  return useMutation<ReqOrdersCreateResponse, Error>({
    mutationFn: async () => {
      const res = await reqOrdersCreate();
      return res.data;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });

      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });

      window.dispatchEvent(
        new CustomEvent<
          WindowEventMap[typeof EVENT_TYPE.ORDER_CREATED]["detail"]
        >(EVENT_TYPE.ORDER_CREATED, {
          detail: data,
        }),
      );

      showToast({
        title: "Order created",
        description: "Your order has been successfully created.",
        type: TOAST_TYPE.SUCCESS,
      });
    },

    onError: () => {
      showToast({
        description: "Failed to create the order.",
        type: TOAST_TYPE.ERROR,
      });
    },
  });
};
