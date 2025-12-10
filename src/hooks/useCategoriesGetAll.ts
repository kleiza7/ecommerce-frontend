import { useQuery } from "@tanstack/react-query";
import { reqCategoriesGetAll } from "../api/controllers/Categories.controller";
import type { ReqCategoriesGetAllResponse } from "../api/responses/ReqCategoriesGetAllResponse.model";

export const useCategoriesGetAll = () => {
  return useQuery<ReqCategoriesGetAllResponse>({
    queryKey: ["categories", "get-all"],
    queryFn: async () => {
      const res = await reqCategoriesGetAll();
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // Kategoriler çok değişmez → 5 dk mantıklı
  });
};
