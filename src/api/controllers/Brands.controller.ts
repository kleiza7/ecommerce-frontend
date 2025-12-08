import axiosInstance from "../../axios";
import type { ReqBrandsCreatePayload } from "../payloads/ReqBrandsCreatePayload.model";
import type { ReqBrandsUpdatePayload } from "../payloads/ReqBrandsUpdatePayload.model";
import type { ReqBrandsCreateResponse } from "../responses/ReqBrandsCreateResponse.model";
import type { ReqBrandsDeleteResponse } from "../responses/ReqBrandsDeleteResponse.model";
import type { ReqBrandsGetAllResponse } from "../responses/ReqBrandsGetAllResponse.model";
import type { ReqBrandsGetByIdResponse } from "../responses/ReqBrandsGetByIdResponse.model";
import type { ReqBrandsUpdateResponse } from "../responses/ReqBrandsUpdateResponse.model";

const PATH_NAME = "/brands";

export const reqBrandsGetAll = () => {
  return axiosInstance.get<ReqBrandsGetAllResponse>(`${PATH_NAME}/get-all`);
};

export const reqBrandsGetById = (id: number) => {
  return axiosInstance.get<ReqBrandsGetByIdResponse>(
    `${PATH_NAME}/get-by-id/${id}`,
  );
};

export const reqBrandsCreate = (payload: ReqBrandsCreatePayload) => {
  return axiosInstance.post<ReqBrandsCreateResponse>(
    `${PATH_NAME}/create`,
    payload,
  );
};

export const reqBrandsUpdate = (
  id: number,
  payload: ReqBrandsUpdatePayload,
) => {
  return axiosInstance.put<ReqBrandsUpdateResponse>(
    `${PATH_NAME}/update/${id}`,
    payload,
  );
};

export const reqBrandsDelete = (id: number) => {
  return axiosInstance.delete<ReqBrandsDeleteResponse>(
    `${PATH_NAME}/delete/${id}`,
  );
};
