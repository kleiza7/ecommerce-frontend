import { useMutation } from "@tanstack/react-query";
import { reqCurrenciesUpdate } from "../api/controllers/Currencies.controller";
import type { ReqCurrenciesUpdatePayload } from "../api/payloads/ReqCurrenciesUpdatePayload.model";
import type { ReqCurrenciesUpdateResponse } from "../api/responses/ReqCurrenciesUpdateResponse.model";
import { TOAST_TYPE } from "../shared/enums/ToastType.enum";
import { showToast } from "../shared/utils/Toast.util";

export const useCurrenciesUpdate = () => {
  return useMutation<
    ReqCurrenciesUpdateResponse,
    Error,
    ReqCurrenciesUpdatePayload
  >({
    mutationFn: async (payload) => {
      const res = await reqCurrenciesUpdate(payload);
      return res.data;
    },

    onSuccess: () => {
      showToast({
        title: "Currency updated",
        description: "The currency has been successfully updated.",
        type: TOAST_TYPE.SUCCESS,
      });
    },

    onError: () => {
      showToast({
        description: "Failed to update the currency.",
        type: TOAST_TYPE.ERROR,
      });
    },
  });
};
