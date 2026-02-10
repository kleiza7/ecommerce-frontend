import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reqBrandsCreate } from "../api/controllers/Brands.controller";
import type { ReqBrandsCreatePayload } from "../api/payloads/ReqBrandsCreatePayload.model";
import type { ReqBrandsCreateResponse } from "../api/responses/ReqBrandsCreateResponse.model";
import { EVENT_TYPE } from "../shared/enums/EventType.enum";
import { TOAST_TYPE } from "../shared/enums/ToastType.enum";
import { showToast } from "../shared/utils/Toast.util";

export const useBrandsCreate = () => {
  const queryClient = useQueryClient();

  return useMutation<ReqBrandsCreateResponse, Error, ReqBrandsCreatePayload>({
    mutationFn: async (payload) => {
      const res = await reqBrandsCreate(payload);
      return res.data;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["brands"],
      });

      window.dispatchEvent(
        new CustomEvent<
          WindowEventMap[typeof EVENT_TYPE.BRAND_CREATED]["detail"]
        >(EVENT_TYPE.BRAND_CREATED, {
          detail: data,
        }),
      );

      showToast({
        title: "Brand created",
        description: "The brand has been successfully added.",
        type: TOAST_TYPE.SUCCESS,
      });
    },

    onError: () => {
      showToast({
        description: "Failed to create the brand.",
        type: TOAST_TYPE.ERROR,
      });
    },
  });
};
