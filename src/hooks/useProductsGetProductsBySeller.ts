import { useQuery } from "@tanstack/react-query";
import { reqProductsGetProductsBySeller } from "../api/controllers/Products.controller";
import type { ReqProductsGetProductsBySellerPayload } from "../api/payloads/ReqProductsGetProductsBySellerPayload.model";
import type { ReqProductsGetProductsBySellerResponse } from "../api/responses/ReqProductsGetProductsBySellerResponse.model";

export const useProductsGetProductsBySeller = (
  payload: ReqProductsGetProductsBySellerPayload,
) => {
  return useQuery<ReqProductsGetProductsBySellerResponse>({
    queryKey: ["products", "get-products-by-seller", payload],
    queryFn: async () => {
      const res = await reqProductsGetProductsBySeller(payload);
      return res.data;
    },
    enabled: !!payload,
    staleTime: 0,
  });
};
