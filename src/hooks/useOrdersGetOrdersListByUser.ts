import { useQuery } from "@tanstack/react-query";
import { reqOrdersGetOrdersListByUser } from "../api/controllers/Orders.controller";
import type { ReqOrdersGetOrdersListByUserResponse } from "../api/responses/ReqOrdersGetOrdersListByUserResponse.model";

export const useOrdersGetOrdersListByUser = () => {
  return useQuery<ReqOrdersGetOrdersListByUserResponse>({
    queryKey: ["orders", "get-orders-list-by-user"],
    queryFn: async () => {
      const res = await reqOrdersGetOrdersListByUser();
      return res.data;
    },
    staleTime: 0,
  });
};
