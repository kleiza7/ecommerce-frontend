import { useMutation } from "@tanstack/react-query";
import { reqCartUpdate } from "../api/controllers/Cart.controller";
import type { ReqCartUpdatePayload } from "../api/payloads/ReqCartUpdatePayload.model";
import type { ReqCartUpdateResponse } from "../api/responses/ReqCartUpdateResponse.model";

export const useCartUpdate = () => {
  return useMutation<
    ReqCartUpdateResponse,
    unknown,
    { id: number; payload: ReqCartUpdatePayload }
  >({
    mutationFn: async ({ id, payload }) => {
      const res = await reqCartUpdate(id, payload);
      return res.data;
    },
  });
};
