import axiosInstance from "../../axios";
import type { ReqCategoriesCreatePayload } from "../payloads/ReqCategoriesCreatePayload.model";
import type { ReqCategoriesUpdatePayload } from "../payloads/ReqCategoriesUpdatePayload.model";
import type { ReqCategoriesCreateResponse } from "../responses/ReqCategoriesCreateResponse.model";
import type { ReqCategoriesDeleteResponse } from "../responses/ReqCategoriesDeleteResponse.model";
import type { ReqCategoriesGetAllResponse } from "../responses/ReqCategoriesGetAllResponse.model";
import type { ReqCategoriesGetByIdResponse } from "../responses/ReqCategoriesGetByIdResponse.model";
import type { ReqCategoriesGetChildrenResponse } from "../responses/ReqCategoriesGetChildrenResponse.model";
import type { ReqCategoriesUpdateResponse } from "../responses/ReqCategoriesUpdateResponse.model";

const PATH_NAME = "/categories";

export const reqCategoriesGetAll = () => {
  return axiosInstance.get<ReqCategoriesGetAllResponse>(`${PATH_NAME}/get-all`);
};

export const reqCategoriesGetById = (id: number) => {
  return axiosInstance.get<ReqCategoriesGetByIdResponse>(
    `${PATH_NAME}/get-by-id/${id}`,
  );
};

export const reqCategoriesGetChildren = (id: number) => {
  return axiosInstance.get<ReqCategoriesGetChildrenResponse>(
    `${PATH_NAME}/get-children/${id}`,
  );
};

export const reqCategoriesCreate = (payload: ReqCategoriesCreatePayload) => {
  return axiosInstance.post<ReqCategoriesCreateResponse>(
    `${PATH_NAME}/create`,
    payload,
  );
};

export const reqCategoriesUpdate = (
  id: number,
  payload: ReqCategoriesUpdatePayload,
) => {
  return axiosInstance.put<ReqCategoriesUpdateResponse>(
    `${PATH_NAME}/update/${id}`,
    payload,
  );
};

export const reqCategoriesDelete = (id: number) => {
  return axiosInstance.delete<ReqCategoriesDeleteResponse>(
    `${PATH_NAME}/delete/${id}`,
  );
};
