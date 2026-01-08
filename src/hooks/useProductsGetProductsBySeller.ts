import { useQuery } from "@tanstack/react-query";
import { reqProductsGetProductsBySeller } from "../api/controllers/Products.controller";
import type { ReqProductsGetProductsBySellerResponse } from "../api/responses/ReqProductsGetProductsBySellerResponse.model";

export const useProductsGetProductsBySeller = () => {
  return useQuery<ReqProductsGetProductsBySellerResponse>({
    queryKey: ["products", "get-products-by-seller"],
    queryFn: async () => {
      const res = await reqProductsGetProductsBySeller();
      return res.data;
    },
    staleTime: 0,
  });
};
