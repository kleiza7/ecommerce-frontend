import { useMutation } from "@tanstack/react-query";
import { reqCartAdd } from "../api/controllers/Cart.controller";
import type { ReqCartAddPayload } from "../api/payloads/ReqCartAddPayload.model";
import type { ReqCartAddResponse } from "../api/responses/ReqCartAddResponse.model";

export const useCartAdd = () => {
  return useMutation<ReqCartAddResponse, unknown, ReqCartAddPayload>({
    mutationFn: async (payload) => {
      const res = await reqCartAdd(payload);
      return res.data;
    },
  });
};
