import { useQuery } from "@tanstack/react-query";
import { reqOrdersGetById } from "../api/controllers/Orders.controller";
import type { ReqOrdersGetByIdResponse } from "../api/responses/ReqOrdersGetByIdResponse.model";

export const useOrdersGetById = (id: number) => {
  return useQuery<ReqOrdersGetByIdResponse>({
    queryKey: ["orders", "get-by-id", id],
    queryFn: async () => {
      const res = await reqOrdersGetById(id);
      return res.data;
    },
    enabled: !!id,
    staleTime: 30 * 1000,
  });
};
