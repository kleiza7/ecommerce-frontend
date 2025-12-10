import { useQuery } from "@tanstack/react-query";
import { reqCategoriesGetById } from "../api/controllers/Categories.controller";
import type { ReqCategoriesGetByIdResponse } from "../api/responses/ReqCategoriesGetByIdResponse.model";

export const useCategoriesGetById = (id: number) => {
  return useQuery<ReqCategoriesGetByIdResponse>({
    queryKey: ["categories", "get-by-id", id],
    queryFn: async () => {
      const res = await reqCategoriesGetById(id);
      return res.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};
