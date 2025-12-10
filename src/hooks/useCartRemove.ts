import { useMutation } from "@tanstack/react-query";
import { reqCartRemove } from "../api/controllers/Cart.controller";
import type { ReqCartRemoveResponse } from "../api/responses/ReqCartRemoveResponse.model";

export const useCartRemove = () => {
  return useMutation<ReqCartRemoveResponse, unknown, number>({
    mutationFn: async (id) => {
      const res = await reqCartRemove(id);
      return res.data;
    },
  });
};
