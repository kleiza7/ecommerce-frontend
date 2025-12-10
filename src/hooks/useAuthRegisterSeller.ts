import { useMutation } from "@tanstack/react-query";
import { reqAuthRegisterSeller } from "../api/controllers/Auth.controller";
import type { ReqAuthRegisterSellerPayload } from "../api/payloads/ReqAuthRegisterSellerPayload.model";
import type { ReqAuthRegisterSellerResponse } from "../api/responses/ReqAuthRegisterSellerResponse.model";
import { TOAST_TYPE } from "../shared/enums/ToastType.enum";
import { showToast } from "../shared/utils/Toast.util";

export const useAuthRegisterSeller = () => {
  return useMutation<
    ReqAuthRegisterSellerResponse,
    Error,
    ReqAuthRegisterSellerPayload
  >({
    mutationFn: async (payload) => {
      const res = await reqAuthRegisterSeller(payload);
      return res.data;
    },

    onSuccess: () => {
      showToast({
        title: "Registered successfully",
        description: "Your account has been created.",
        type: TOAST_TYPE.SUCCESS,
      });
    },

    onError: () => {
      showToast({
        description: "Registration failed.",
        type: TOAST_TYPE.ERROR,
      });
    },
  });
};
