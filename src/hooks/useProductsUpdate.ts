import { useMutation } from "@tanstack/react-query";
import { reqProductsUpdate } from "../api/controllers/Products.controller";
import type { ReqProductsUpdatePayload } from "../api/payloads/ReqProductsUpdatePayload.model";
import type { ReqProductsUpdateResponse } from "../api/responses/ReqProductsUpdateResponse.model";

export const useProductsUpdate = () => {
  return useMutation<
    ReqProductsUpdateResponse,
    unknown,
    { id: number; payload: ReqProductsUpdatePayload }
  >({
    mutationFn: async ({ id, payload }) => {
      const res = await reqProductsUpdate(id, payload);
      return res.data;
    },
  });
};
