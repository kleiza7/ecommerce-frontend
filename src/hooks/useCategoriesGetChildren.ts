import { useQuery } from "@tanstack/react-query";
import { reqCategoriesGetChildren } from "../api/controllers/Categories.controller";
import type { ReqCategoriesGetChildrenResponse } from "../api/responses/ReqCategoriesGetChildrenResponse.model";

export const useCategoriesGetChildren = (id: number) => {
  return useQuery<ReqCategoriesGetChildrenResponse>({
    queryKey: ["categories", "get-children", id],
    queryFn: async () => {
      const res = await reqCategoriesGetChildren(id);
      return res.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};
