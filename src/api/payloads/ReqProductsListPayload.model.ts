export type ReqProductsListPayload = {
  page: number;
  limit: number;
  brandIds?: number[];
  categoryIds?: number[];
  sellerIds?: number[];
};
