import { useMutation } from "@tanstack/react-query";
import { reqAuthRegisterUser } from "../api/controllers/Auth.controller";
import type { ReqAuthRegisterUserPayload } from "../api/payloads/ReqAuthRegisterUserPayload.model";
import type { ReqAuthRegisterUserResponse } from "../api/responses/ReqAuthRegisterUserResponse.model";
import { TOAST_TYPE } from "../shared/enums/ToastType.enum";
import { showToast } from "../shared/utils/Toast.util";

export const useAuthRegisterUser = () => {
  return useMutation<
    ReqAuthRegisterUserResponse,
    Error,
    ReqAuthRegisterUserPayload
  >({
    mutationFn: async (payload) => {
      const res = await reqAuthRegisterUser(payload);
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
