import { useQuery } from "@tanstack/react-query";
import { reqProductsList } from "../api/controllers/Products.controller";
import type { ReqProductsListPayload } from "../api/payloads/ReqProductsListPayload.model";
import type { ReqProductsListResponse } from "../api/responses/ReqProductsListResponse.model";

export const useProductsList = (payload: ReqProductsListPayload) => {
  return useQuery<ReqProductsListResponse>({
    queryKey: ["products", "list", payload],
    queryFn: async () => {
      const res = await reqProductsList(payload);
      return res.data;
    },
    enabled: !!payload,
    staleTime: 0,
  });
};
