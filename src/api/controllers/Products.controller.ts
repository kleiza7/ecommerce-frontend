import axiosInstance from "../../axios";
import type { ReqProductsCreatePayload } from "../payloads/ReqProductsCreatePayload.model";
import type { ReqProductsListPayload } from "../payloads/ReqProductsListPayload.model";
import type { ReqProductsUpdatePayload } from "../payloads/ReqProductsUpdatePayload.model";
import type { ReqProductsCreateResponse } from "../responses/ReqProductsCreateResponse.model";
import type { ReqProductsDeleteResponse } from "../responses/ReqProductsDeleteResponse.model";
import type { ReqProductsGetByIdResponse } from "../responses/ReqProductsGetByIdResponse.model";
import type { ReqProductsListResponse } from "../responses/ReqProductsListResponse.model";
import type { ReqProductsUpdateResponse } from "../responses/ReqProductsUpdateResponse.model";

const PATH_NAME = "/products";

export const reqProductsList = (payload: ReqProductsListPayload) => {
  return axiosInstance.post<ReqProductsListResponse>(
    `${PATH_NAME}/list`,
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
  formData.append("price", String(payload.price));
  formData.append("brandId", String(payload.brandId));
  formData.append("categoryId", String(payload.categoryId));

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

export const reqProductsUpdate = (
  id: number,
  payload: ReqProductsUpdatePayload,
) => {
  const formData = new FormData();

  formData.append("name", payload.name);
  formData.append("description", payload.description);
  formData.append("price", String(payload.price));
  formData.append("brandId", String(payload.brandId));
  formData.append("categoryId", String(payload.categoryId));

  formData.append("deletedImageIds", JSON.stringify(payload.deletedImageIds));

  payload.newAddedImages.forEach((file) => {
    formData.append("newAddedImages", file);
  });

  return axiosInstance.put<ReqProductsUpdateResponse>(
    `${PATH_NAME}/update/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
};

export const reqProductsDelete = (id: number) => {
  return axiosInstance.delete<ReqProductsDeleteResponse>(
    `${PATH_NAME}/delete/${id}`,
  );
};
