import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { reqProductsList } from "../api/controllers/Products.controller";
import type { ReqProductsListPayload } from "../api/payloads/ReqProductsListPayload.model";
import type { ReqProductsListResponse } from "../api/responses/ReqProductsListResponse.model";

export const useProductsListInfinite = (
  payload: Omit<ReqProductsListPayload, "page">,
) => {
  return useInfiniteQuery<
    ReqProductsListResponse,
    Error,
    InfiniteData<ReqProductsListResponse>,
    (string | object)[],
    number
  >({
    queryKey: ["products", payload],

    initialPageParam: 1,

    queryFn: async ({ pageParam }) => {
      const res = await reqProductsList({
        ...payload,
        page: pageParam,
      });

      return res.data;
    },

    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
  });
};
