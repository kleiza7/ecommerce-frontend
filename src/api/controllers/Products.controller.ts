import axiosInstance from "../../axios";
import type { ReqProductsCreatePayload } from "../payloads/ReqProductsCreatePayload.model";
import type { ReqProductsGetProductsBySellerPayload } from "../payloads/ReqProductsGetProductsBySellerPayload.model";
import type { ReqProductsGetWaitingApprovalProductsPayload } from "../payloads/ReqProductsGetWaitingApprovalProductsPayload.model";
import type { ReqProductsListPayload } from "../payloads/ReqProductsListPayload.model";
import type { ReqProductsUpdatePayload } from "../payloads/ReqProductsUpdatePayload.model";
import type { ReqProductsApproveResponse } from "../responses/ReqProductsApproveResponse.model";
import type { ReqProductsCreateResponse } from "../responses/ReqProductsCreateResponse.model";
import type { ReqProductsDeleteResponse } from "../responses/ReqProductsDeleteResponse.model";
import type { ReqProductsGetByIdResponse } from "../responses/ReqProductsGetByIdResponse.model";
import type { ReqProductsGetProductsBySellerResponse } from "../responses/ReqProductsGetProductsBySellerResponse.model";
import type { ReqProductsGetWaitingApprovalProductsResponse } from "../responses/ReqProductsGetWaitingApprovalProductsResponse.model";
import type { ReqProductsListResponse } from "../responses/ReqProductsListResponse.model";
import type { ReqProductsRejectResponse } from "../responses/ReqProductsRejectResponse.model";
import type { ReqProductsUpdateResponse } from "../responses/ReqProductsUpdateResponse.model";

const PATH_NAME = "/products";

export const reqProductsList = (payload: ReqProductsListPayload) => {
  return axiosInstance.post<ReqProductsListResponse>(
    `${PATH_NAME}/list`,
    payload,
  );
};

export const reqProductsGetProductsBySeller = (
  payload: ReqProductsGetProductsBySellerPayload,
) => {
  return axiosInstance.post<ReqProductsGetProductsBySellerResponse>(
    `${PATH_NAME}/get-products-by-seller`,
    payload,
  );
};

export const reqProductsGetWaitingApprovalProducts = (
  payload: ReqProductsGetWaitingApprovalProductsPayload,
) => {
  return axiosInstance.post<ReqProductsGetWaitingApprovalProductsResponse>(
    `${PATH_NAME}/get-waiting-approval-products`,
    payload,
  );
};

export const reqProductsGetById = (id: number) => {
  return axiosInstance.get<ReqProductsGetByIdResponse>(
    `${PATH_NAME}/get-by-id/${id}`,
  );
};

export const reqProductsCreate = (payload: ReqProductsCreatePayload) => {
  const formData = new FormData();

  formData.append("name", payload.name);
  formData.append("description", payload.description);
  formData.append("stockCount", String(payload.stockCount));
  formData.append("price", String(payload.price));
  formData.append("brandId", String(payload.brandId));
  formData.append("categoryId", String(payload.categoryId));
  formData.append("currencyId", String(payload.currencyId));

  payload.images.forEach((file) => {
    formData.append("images", file);
  });

  return axiosInstance.post<ReqProductsCreateResponse>(
    `${PATH_NAME}/create`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
};

export const reqProductsUpdate = (payload: ReqProductsUpdatePayload) => {
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

  formData.append("deletedImageIds", JSON.stringify(payload.deletedImageIds));

  return axiosInstance.put<ReqProductsUpdateResponse>(
    `${PATH_NAME}/update`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
};

export const reqProductsApprove = (id: number) => {
  return axiosInstance.put<ReqProductsApproveResponse>(
    `${PATH_NAME}/approve/${id}`,
  );
};

export const reqProductsReject = (id: number) => {
  return axiosInstance.put<ReqProductsRejectResponse>(
    `${PATH_NAME}/reject/${id}`,
  );
};

export const reqProductsDelete = (id: number) => {
  return axiosInstance.delete<ReqProductsDeleteResponse>(
    `${PATH_NAME}/delete/${id}`,
  );
};
