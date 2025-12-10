import { useMutation } from "@tanstack/react-query";
import { reqBrandsDelete } from "../api/controllers/Brands.controller";
import type { ReqBrandsDeleteResponse } from "../api/responses/ReqBrandsDeleteResponse.model";

export const useBrandsDelete = () => {
  return useMutation<ReqBrandsDeleteResponse, unknown, number>({
    mutationFn: async (id) => {
      const res = await reqBrandsDelete(id);
      return res.data;
    },
  });
};
