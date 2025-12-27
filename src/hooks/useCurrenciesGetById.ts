import { useQuery } from "@tanstack/react-query";
import { reqCurrenciesGetById } from "../api/controllers/Currencies.controller";
import type { ReqCurrenciesGetByIdResponse } from "../api/responses/ReqCurrenciesGetByIdResponse.model";

export const useCurrenciesGetById = (id: number) => {
  return useQuery<ReqCurrenciesGetByIdResponse>({
    queryKey: ["currencies", "get-by-id", id],
    queryFn: async () => {
      const res = await reqCurrenciesGetById(id);
      return res.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};
