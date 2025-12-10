import { useMutation } from "@tanstack/react-query";
import { reqCartClear } from "../api/controllers/Cart.controller";
import type { ReqCartClearResponse } from "../api/responses/ReqCartClearResponse.model";

export const useCartClear = () => {
  return useMutation<ReqCartClearResponse, unknown, void>({
    mutationFn: async () => {
      const res = await reqCartClear();
      return res.data;
    },
  });
};
