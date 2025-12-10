import { useMutation } from "@tanstack/react-query";
import { reqCategoriesUpdate } from "../api/controllers/Categories.controller";
import type { ReqCategoriesUpdatePayload } from "../api/payloads/ReqCategoriesUpdatePayload.model";
import type { ReqCategoriesUpdateResponse } from "../api/responses/ReqCategoriesUpdateResponse.model";

export const useCategoriesUpdate = () => {
  return useMutation<
    ReqCategoriesUpdateResponse,
    unknown,
    { id: number; payload: ReqCategoriesUpdatePayload }
  >({
    mutationFn: async ({ id, payload }) => {
      const res = await reqCategoriesUpdate(id, payload);
      return res.data;
    },
  });
};
