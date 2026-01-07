import { useMutation } from "@tanstack/react-query";
import { reqProductsUpdate } from "../api/controllers/Products.controller";
import type { ReqProductsUpdatePayload } from "../api/payloads/ReqProductsUpdatePayload.model";
import type { ReqProductsUpdateResponse } from "../api/responses/ReqProductsUpdateResponse.model";
import { EVENT_TYPE } from "../shared/enums/EventType.enum";
import { TOAST_TYPE } from "../shared/enums/ToastType.enum";
import { showToast } from "../shared/utils/Toast.util";

export const useProductsUpdate = () => {
  return useMutation<
    ReqProductsUpdateResponse,
    Error,
    ReqProductsUpdatePayload
  >({
    mutationFn: async (payload) => {
      const formData = new FormData();

      formData.append("id", String(payload.id));
      formData.append("name", payload.name);
      formData.append("description", payload.description);
      formData.append("stockCount", String(payload.stockCount));
      formData.append("price", String(payload.price));
      formData.append("brandId", String(payload.brandId));
      formData.append("categoryId", String(payload.categoryId));
      formData.append("currencyId", String(payload.currencyId));

      payload.newAddedImages.forEach((file) => {
        formData.append("newAddedImages", file);
      });

      formData.append(
        "deletedImageIds",
        JSON.stringify(payload.deletedImageIds),
      );

      const res = await reqProductsUpdate(formData);
      return res.data;
    },

    onSuccess: (data) => {
      window.dispatchEvent(
        new CustomEvent<
          WindowEventMap[typeof EVENT_TYPE.PRODUCT_UPDATED]["detail"]
        >(EVENT_TYPE.PRODUCT_UPDATED, {
          detail: data,
        }),
      );

      showToast({
        title: "Product updated",
        description: "The product has been successfully updated.",
        type: TOAST_TYPE.SUCCESS,
      });
    },

    onError: () => {
      showToast({
        description: "Failed to update the product.",
        type: TOAST_TYPE.ERROR,
      });
    },
  });
};
