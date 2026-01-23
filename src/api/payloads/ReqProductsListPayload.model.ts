export type ReqProductsListPayload = {
  page: number;
  limit: number;
  filter?: {
    brandIds?: number[];
    categoryIds?: number[];
    sellerIds?: number[];
    query?: string;
  };
  sort?: {
    field: "id" | "createdAt" | "price";
    order: "asc" | "desc";
  };
};
