import { useMutation } from "@tanstack/react-query";
import { reqCategoriesCreate } from "../api/controllers/Categories.controller";
import type { ReqCategoriesCreatePayload } from "../api/payloads/ReqCategoriesCreatePayload.model";
import type { ReqCategoriesCreateResponse } from "../api/responses/ReqCategoriesCreateResponse.model";

export const useCategoriesCreate = () => {
  return useMutation<
    ReqCategoriesCreateResponse,
    unknown,
    ReqCategoriesCreatePayload
  >({
    mutationFn: async (payload) => {
      const res = await reqCategoriesCreate(payload);
      return res.data;
    },
  });
};
