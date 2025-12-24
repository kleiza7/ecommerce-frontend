import { useQuery } from "@tanstack/react-query";
import { reqBrandsGetAll } from "../api/controllers/Brands.controller";
import type { ReqBrandsGetAllResponse } from "../api/responses/ReqBrandsGetAllResponse.model";

export const useBrandsGetAll = () => {
  return useQuery<ReqBrandsGetAllResponse>({
    queryKey: ["brands", "get-all"],
    queryFn: async () => {
      const res = await reqBrandsGetAll();
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
