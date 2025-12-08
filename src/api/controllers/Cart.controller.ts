import axiosInstance from "../../axios";
import type { ReqCartAddPayload } from "../payloads/ReqCartAddPayload.model";
import type { ReqCartUpdatePayload } from "../payloads/ReqCartUpdatePayload.model";
import type { ReqCartAddResponse } from "../responses/ReqCartAddResponse.model";
import type { ReqCartClearResponse } from "../responses/ReqCartClearResponse.model";
import type { ReqCartGetCartResponse } from "../responses/ReqCartGetCartResponse.model";
import type { ReqCartRemoveResponse } from "../responses/ReqCartRemoveResponse.model";
import type { ReqCartUpdateResponse } from "../responses/ReqCartUpdateResponse.model";

const PATH_NAME = "/cart";

export const reqCartGetCart = () => {
  return axiosInstance.get<ReqCartGetCartResponse>(`${PATH_NAME}/get-cart`);
};

export const reqCartAdd = (payload: ReqCartAddPayload) => {
  return axiosInstance.post<ReqCartAddResponse>(`${PATH_NAME}/add`, payload);
};

export const reqCartUpdate = (id: number, payload: ReqCartUpdatePayload) => {
  return axiosInstance.put<ReqCartUpdateResponse>(
    `${PATH_NAME}/update/${id}`,
    payload,
  );
};

export const reqCartRemove = (id: number) => {
  return axiosInstance.delete<ReqCartRemoveResponse>(
    `${PATH_NAME}/remove/${id}`,
  );
};

export const reqCartClear = () => {
  return axiosInstance.delete<ReqCartClearResponse>(`${PATH_NAME}/clear`);
};
