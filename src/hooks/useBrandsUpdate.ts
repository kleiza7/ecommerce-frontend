import { useMutation } from "@tanstack/react-query";
import { reqBrandsUpdate } from "../api/controllers/Brands.controller";
import type { ReqBrandsUpdatePayload } from "../api/payloads/ReqBrandsUpdatePayload.model";
import type { ReqBrandsUpdateResponse } from "../api/responses/ReqBrandsUpdateResponse.model";

export const useBrandsUpdate = () => {
  return useMutation<
    ReqBrandsUpdateResponse,
    unknown,
    { id: number; payload: ReqBrandsUpdatePayload }
  >({
    mutationFn: async ({ id, payload }) => {
      const res = await reqBrandsUpdate(id, payload);
      return res.data;
    },
  });
};
