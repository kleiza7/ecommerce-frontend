import { useQuery } from "@tanstack/react-query";
import { reqBrandsGetById } from "../api/controllers/Brands.controller";
import type { ReqBrandsGetByIdResponse } from "../api/responses/ReqBrandsGetByIdResponse.model";

export const useBrandsGetById = (id: number) => {
  return useQuery<ReqBrandsGetByIdResponse>({
    queryKey: ["brands", "get-by-id", id],
    queryFn: async () => {
      const res = await reqBrandsGetById(id);
      return res.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};
