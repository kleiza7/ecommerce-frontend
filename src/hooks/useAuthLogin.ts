import { useMutation } from "@tanstack/react-query";
import { reqAuthLogin } from "../api/controllers/Auth.controller";
import type { ReqAuthLoginPayload } from "../api/payloads/ReqAuthLoginPayload.model";
import type { ReqAuthLoginResponse } from "../api/responses/ReqAuthLoginResponse.model";

export const useAuthLogin = () => {
  return useMutation<ReqAuthLoginResponse, unknown, ReqAuthLoginPayload>({
    mutationFn: async (payload) => {
      const res = await reqAuthLogin(payload);
      return res.data;
    },
  });
};
