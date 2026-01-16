import { useQuery } from "@tanstack/react-query";
import { reqSearch } from "../api/controllers/Search.controller";
import type { ReqSearchResponse } from "../api/responses/ReqSearchResponse.model";

export const useSearch = (q: string) => {
  return useQuery<ReqSearchResponse>({
    queryKey: ["search", q],
    queryFn: async () => {
      const res = await reqSearch(q);
      return res.data;
    },
    enabled: q.trim().length > 0,
    staleTime: 10 * 1000,
  });
};
