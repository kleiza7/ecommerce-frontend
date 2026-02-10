import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reqBrandsUpdate } from "../api/controllers/Brands.controller";
import type { ReqBrandsUpdatePayload } from "../api/payloads/ReqBrandsUpdatePayload.model";
import type { ReqBrandsUpdateResponse } from "../api/responses/ReqBrandsUpdateResponse.model";
import { EVENT_TYPE } from "../shared/enums/EventType.enum";
import { TOAST_TYPE } from "../shared/enums/ToastType.enum";
import { showToast } from "../shared/utils/Toast.util";

export const useBrandsUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation<ReqBrandsUpdateResponse, Error, ReqBrandsUpdatePayload>({
    mutationFn: async (payload) => {
      const res = await reqBrandsUpdate(payload);
      return res.data;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["brands"],
      });

      window.dispatchEvent(
        new CustomEvent<
          WindowEventMap[typeof EVENT_TYPE.BRAND_UPDATED]["detail"]
        >(EVENT_TYPE.BRAND_UPDATED, {
          detail: data,
        }),
      );

      showToast({
        title: "Brand updated",
        description: "The brand has been successfully updated.",
        type: TOAST_TYPE.SUCCESS,
      });
    },

    onError: () => {
      showToast({
        description: "Failed to update the brand.",
        type: TOAST_TYPE.ERROR,
      });
    },
  });
};
