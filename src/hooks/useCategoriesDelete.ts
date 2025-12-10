import { useMutation } from "@tanstack/react-query";
import { reqCategoriesDelete } from "../api/controllers/Categories.controller";
import type { ReqCategoriesDeleteResponse } from "../api/responses/ReqCategoriesDeleteResponse.model";

export const useCategoriesDelete = () => {
  return useMutation<ReqCategoriesDeleteResponse, unknown, number>({
    mutationFn: async (id) => {
      const res = await reqCategoriesDelete(id);
      return res.data;
    },
  });
};
