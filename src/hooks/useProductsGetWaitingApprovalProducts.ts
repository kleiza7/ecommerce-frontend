import { useQuery } from "@tanstack/react-query";
import { reqProductsGetWaitingApprovalProducts } from "../api/controllers/Products.controller";
import type { ReqProductsGetWaitingApprovalProductsPayload } from "../api/payloads/ReqProductsGetWaitingApprovalProductsPayload.model";
import type { ReqProductsGetWaitingApprovalProductsResponse } from "../api/responses/ReqProductsGetWaitingApprovalProductsResponse.model";

export const useProductsGetWaitingApprovalProducts = (
  payload: ReqProductsGetWaitingApprovalProductsPayload,
) => {
  return useQuery<ReqProductsGetWaitingApprovalProductsResponse>({
    queryKey: ["products", "get-waiting-approval-products", payload],
    queryFn: async () => {
      const res = await reqProductsGetWaitingApprovalProducts(payload);
      return res.data;
    },
    enabled: !!payload,
    staleTime: 0,
  });
};
