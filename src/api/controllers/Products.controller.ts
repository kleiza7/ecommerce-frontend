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
  return axiosInstance.post<ReqProductsCreateResponse>(
    `${PATH_NAME}/create`,
    payload,
  );
};

export const reqProductsUpdate = (
  id: number,
  payload: ReqProductsUpdatePayload,
) => {
  return axiosInstance.put<ReqProductsUpdateResponse>(
    `${PATH_NAME}/update/${id}`,
    payload,
  );
};

export const reqProductsDelete = (id: number) => {
  return axiosInstance.delete<ReqProductsDeleteResponse>(
    `${PATH_NAME}/delete/${id}`,
  );
};
