import { useQuery } from "@tanstack/react-query";
import { reqCartGetCart } from "../api/controllers/Cart.controller";
import type { ReqCartGetCartResponse } from "../api/responses/ReqCartGetCartResponse.model";

export const useCartGetCart = () => {
  return useQuery<ReqCartGetCartResponse>({
    queryKey: ["cart", "get-cart"],
    queryFn: async () => {
      const res = await reqCartGetCart();
      return res.data;
    },
    staleTime: 1000 * 60 * 1,
    // TODO: bunu araştır
    enabled: false,
  });
};
