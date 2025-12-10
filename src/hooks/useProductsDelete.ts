import { useMutation } from "@tanstack/react-query";
import { reqProductsDelete } from "../api/controllers/Products.controller";
import type { ReqProductsDeleteResponse } from "../api/responses/ReqProductsDeleteResponse.model";

export const useProductsDelete = () => {
  return useMutation<ReqProductsDeleteResponse, unknown, number>({
    mutationFn: async (id) => {
      const res = await reqProductsDelete(id);
      return res.data;
    },
  });
};
