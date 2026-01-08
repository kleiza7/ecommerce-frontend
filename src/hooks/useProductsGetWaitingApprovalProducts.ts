import { useQuery } from "@tanstack/react-query";
import { reqProductsGetWaitingApprovalProducts } from "../api/controllers/Products.controller";
import type { ReqProductsGetWaitingApprovalProductsResponse } from "../api/responses/ReqProductsGetWaitingApprovalProductsResponse.model";

export const useProductsGetWaitingApprovalProducts = () => {
  return useQuery<ReqProductsGetWaitingApprovalProductsResponse>({
    queryKey: ["products", "get-waiting-approval-products"],
    queryFn: async () => {
      const res = await reqProductsGetWaitingApprovalProducts();
      return res.data;
    },
    staleTime: 0,
  });
};
