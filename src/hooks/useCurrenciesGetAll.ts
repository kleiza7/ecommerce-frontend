import { useQuery } from "@tanstack/react-query";
import { reqCurrenciesGetAll } from "../api/controllers/Currencies.controller";
import type { ReqCurrenciesGetAllResponse } from "../api/responses/ReqCurrenciesGetAllResponse.model";

export const useCurrenciesGetAll = () => {
  return useQuery<ReqCurrenciesGetAllResponse>({
    queryKey: ["currencies", "get-all"],
    queryFn: async () => {
      const res = await reqCurrenciesGetAll();
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
