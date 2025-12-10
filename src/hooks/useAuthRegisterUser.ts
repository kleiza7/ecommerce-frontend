import { useMutation } from "@tanstack/react-query";
import { reqAuthRegisterUser } from "../api/controllers/Auth.controller";
import type { ReqAuthRegisterUserPayload } from "../api/payloads/ReqAuthRegisterUserPayload.model";
import type { ReqAuthRegisterUserResponse } from "../api/responses/ReqAuthRegisterUserResponse.model";

export const useAuthRegisterUser = () => {
  return useMutation<
    ReqAuthRegisterUserResponse,
    unknown,
    ReqAuthRegisterUserPayload
  >({
    mutationFn: async (payload) => {
      const res = await reqAuthRegisterUser(payload);
      return res.data;
    },
  });
};
