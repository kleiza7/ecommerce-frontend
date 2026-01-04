import { useQuery } from "@tanstack/react-query";
import { reqAuthGetAllSellers } from "../api/controllers/Auth.controller";
import type { ReqAuthGetAllSellersResponse } from "../api/responses/ReqAuthGetAllSellersResponse.model";

export const useAuthGetAllSellers = () => {
  return useQuery<ReqAuthGetAllSellersResponse>({
    queryKey: ["auth", "get-all-sellers"],
    queryFn: async () => {
      const res = await reqAuthGetAllSellers();
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
