import { useQuery } from "@tanstack/react-query";
import { reqProductsGetById } from "../api/controllers/Products.controller";
import type { ReqProductsGetByIdResponse } from "../api/responses/ReqProductsGetByIdResponse.model";

export const useProductsGetById = (id: number) => {
  return useQuery<ReqProductsGetByIdResponse>({
    queryKey: ["products", "get-by-id", id],
    queryFn: async () => {
      const res = await reqProductsGetById(id);
      return res.data;
    },
    enabled: !!id,
    staleTime: 30 * 1000, // ürün detail sık değişebilir (stok/fiyat) → 30 saniye ideal
  });
};
