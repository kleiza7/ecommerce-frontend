import { useMutation } from "@tanstack/react-query";
import { reqProductsCreate } from "../api/controllers/Products.controller";
import type { ReqProductsCreatePayload } from "../api/payloads/ReqProductsCreatePayload.model";
import type { ReqProductsCreateResponse } from "../api/responses/ReqProductsCreateResponse.model";
import { TOAST_TYPE } from "../shared/enums/ToastType.enum";
import { showToast } from "../shared/utils/Toast.util";

export const useProductsCreate = () => {
  return useMutation<
    ReqProductsCreateResponse,
    Error,
    ReqProductsCreatePayload
  >({
    mutationFn: async (payload) => {
      const res = await reqProductsCreate(payload);
      return res.data;
    },

    onSuccess: () => {
      showToast({
        title: "Product created",
        description: "The product has been successfully added.",
        type: TOAST_TYPE.SUCCESS,
      });
    },

    onError: () => {
      showToast({
        description: "Failed to create the product.",
        type: TOAST_TYPE.ERROR,
      });
    },
  });
};
