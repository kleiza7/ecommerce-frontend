import { useMutation } from "@tanstack/react-query";
import { reqCurrenciesDelete } from "../api/controllers/Currencies.controller";
import type { ReqCurrenciesDeleteResponse } from "../api/responses/ReqCurrenciesDeleteResponse.model";
import { TOAST_TYPE } from "../shared/enums/ToastType.enum";
import { showToast } from "../shared/utils/Toast.util";

export const useCurrenciesDelete = () => {
  return useMutation<ReqCurrenciesDeleteResponse, Error, number>({
    mutationFn: async (id) => {
      const res = await reqCurrenciesDelete(id);
      return res.data;
    },

    onSuccess: () => {
      showToast({
        title: "Currency deleted",
        description: "The currency has been successfully removed.",
        type: TOAST_TYPE.SUCCESS,
      });
    },

    onError: () => {
      showToast({
        description: "Failed to delete the currency.",
        type: TOAST_TYPE.ERROR,
      });
    },
  });
};
