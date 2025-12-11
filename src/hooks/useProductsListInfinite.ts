import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import type { Product } from "../api/models/Product.model";
import type { ReqProductsListPayload } from "../api/payloads/ReqProductsListPayload.model";
import type { ReqProductsListResponse } from "../api/responses/ReqProductsListResponse.model";

// Dummy data
const DUMMY_PRODUCTS: Product[] = Array.from({ length: 100 }).map((_, i) => ({
  id: i + 1,
  name: `Ürün ${i + 1}`,
  description: `Bu ürünün açıklaması ${i + 1}.`,
  price: Math.random() * 1000 + 50,
  brandId: (i % 5) + 1,
  categoryId: (i % 10) + 1,
}));

// Fake API
async function fakeProductsRequest(
  payload: ReqProductsListPayload,
): Promise<ReqProductsListResponse> {
  const { page, limit } = payload;

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const items = DUMMY_PRODUCTS.slice(startIndex, endIndex);

  const total = DUMMY_PRODUCTS.length;
  const totalPages = Math.ceil(total / limit);

  return {
    items,
    pagination: {
      total,
      page,
      limit,
      totalPages,
    },
  };
}

export const useProductsListInfinite = (
  payload: Omit<ReqProductsListPayload, "page">,
) => {
  return useInfiniteQuery<
    ReqProductsListResponse, // queryFn return type
    Error, // error
    InfiniteData<ReqProductsListResponse>, // UI data type
    (string | object)[], // query key
    number // pageParam
  >({
    queryKey: ["products", payload],

    initialPageParam: 1,

    queryFn: ({ pageParam }) =>
      fakeProductsRequest({
        ...payload,
        page: pageParam,
      }),

    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;
      if (page >= totalPages) return undefined;
      return page + 1;
    },
  });
};
