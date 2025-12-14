import { useMutation } from "@tanstack/react-query";
import { reqAuthLogin } from "../api/controllers/Auth.controller";
import type { ReqAuthLoginPayload } from "../api/payloads/ReqAuthLoginPayload.model";
import type { ReqAuthLoginResponse } from "../api/responses/ReqAuthLoginResponse.model";
import { TOAST_TYPE } from "../shared/enums/ToastType.enum";
import { showToast } from "../shared/utils/Toast.util";

export const useAuthLogin = (
  onSuccessCallback?: (data: ReqAuthLoginResponse) => void,
) => {
  return useMutation<ReqAuthLoginResponse, Error, ReqAuthLoginPayload>({
    mutationFn: async (payload) => {
      const response = await reqAuthLogin(payload);
      return response.data;
    },

    onSuccess: (data) => {
      showToast({
        title: "Logged in successfully",
        description: "Welcome back!",
        type: TOAST_TYPE.SUCCESS,
      });

      onSuccessCallback?.(data);
    },

    onError: () => {
      showToast({
        description: "Login failed. Please check your credentials.",
        type: TOAST_TYPE.ERROR,
      });
    },
  });
};
