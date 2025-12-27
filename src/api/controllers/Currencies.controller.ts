import axiosInstance from "../../axios";
import type { ReqCurrenciesCreatePayload } from "../payloads/ReqCurrenciesCreatePayload.model";
import type { ReqCurrenciesUpdatePayload } from "../payloads/ReqCurrenciesUpdatePayload.model";
import type { ReqCurrenciesCreateResponse } from "../responses/ReqCurrenciesCreateResponse.model";
import type { ReqCurrenciesDeleteResponse } from "../responses/ReqCurrenciesDeleteResponse.model";
import type { ReqCurrenciesGetAllResponse } from "../responses/ReqCurrenciesGetAllResponse.model";
import type { ReqCurrenciesGetByIdResponse } from "../responses/ReqCurrenciesGetByIdResponse.model";
import type { ReqCurrenciesUpdateResponse } from "../responses/ReqCurrenciesUpdateResponse.model";

const PATH_NAME = "/currencies";

export const reqCurrenciesGetAll = () => {
  return axiosInstance.get<ReqCurrenciesGetAllResponse>(`${PATH_NAME}/get-all`);
};

export const reqCurrenciesGetById = (id: number) => {
  return axiosInstance.get<ReqCurrenciesGetByIdResponse>(
    `${PATH_NAME}/get-by-id/${id}`,
  );
};

export const reqCurrenciesCreate = (payload: ReqCurrenciesCreatePayload) => {
  return axiosInstance.post<ReqCurrenciesCreateResponse>(
    `${PATH_NAME}/create`,
    payload,
  );
};

export const reqCurrenciesUpdate = (payload: ReqCurrenciesUpdatePayload) => {
  return axiosInstance.put<ReqCurrenciesUpdateResponse>(
    `${PATH_NAME}/update`,
    payload,
  );
};

export const reqCurrenciesDelete = (id: number) => {
  return axiosInstance.delete<ReqCurrenciesDeleteResponse>(
    `${PATH_NAME}/delete/${id}`,
  );
};
