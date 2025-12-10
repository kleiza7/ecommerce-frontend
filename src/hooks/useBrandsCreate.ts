import { useMutation } from "@tanstack/react-query";
import { reqBrandsCreate } from "../api/controllers/Brands.controller";
import type { ReqBrandsCreatePayload } from "../api/payloads/ReqBrandsCreatePayload.model";
import type { ReqBrandsCreateResponse } from "../api/responses/ReqBrandsCreateResponse.model";

export const useBrandsCreate = () => {
  return useMutation<ReqBrandsCreateResponse, unknown, ReqBrandsCreatePayload>({
    mutationFn: async (payload) => {
      const res = await reqBrandsCreate(payload);
      return res.data;
    },
  });
};
