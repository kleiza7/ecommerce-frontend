import { useMutation } from "@tanstack/react-query";
import { reqAuthRegisterSeller } from "../api/controllers/Auth.controller";
import type { ReqAuthRegisterSellerPayload } from "../api/payloads/ReqAuthRegisterSellerPayload.model";
import type { ReqAuthRegisterSellerResponse } from "../api/responses/ReqAuthRegisterSellerResponse.model";

export const useAuthRegisterSeller = () => {
  return useMutation<
    ReqAuthRegisterSellerResponse,
    unknown,
    ReqAuthRegisterSellerPayload
  >({
    mutationFn: async (payload) => {
      const res = await reqAuthRegisterSeller(payload);
      return res.data;
    },
  });
};
