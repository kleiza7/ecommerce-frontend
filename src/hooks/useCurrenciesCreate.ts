import { useMutation } from "@tanstack/react-query";
import { reqCurrenciesCreate } from "../api/controllers/Currencies.controller";
import type { ReqCurrenciesCreatePayload } from "../api/payloads/ReqCurrenciesCreatePayload.model";
import type { ReqCurrenciesCreateResponse } from "../api/responses/ReqCurrenciesCreateResponse.model";
import { TOAST_TYPE } from "../shared/enums/ToastType.enum";
import { showToast } from "../shared/utils/Toast.util";

export const useCurrenciesCreate = () => {
  return useMutation<
    ReqCurrenciesCreateResponse,
    Error,
    ReqCurrenciesCreatePayload
  >({
    mutationFn: async (payload) => {
      const res = await reqCurrenciesCreate(payload);
      return res.data;
    },

    onSuccess: () => {
      showToast({
        title: "Currency created",
        description: "The currency has been successfully added.",
        type: TOAST_TYPE.SUCCESS,
      });
    },

    onError: () => {
      showToast({
        description: "Failed to create the currency.",
        type: TOAST_TYPE.ERROR,
      });
    },
  });
};
