import { useMutation } from "@tanstack/react-query";
import { reqProductsCreate } from "../api/controllers/Products.controller";
import type { ReqProductsCreatePayload } from "../api/payloads/ReqProductsCreatePayload.model";
import type { ReqProductsCreateResponse } from "../api/responses/ReqProductsCreateResponse.model";

export const useProductsCreate = () => {
  return useMutation<
    ReqProductsCreateResponse,
    unknown,
    ReqProductsCreatePayload
  >({
    mutationFn: async (payload) => {
      const res = await reqProductsCreate(payload);
      return res.data;
    },
  });
};
