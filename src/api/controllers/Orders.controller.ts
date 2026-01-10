import axiosInstance from "../../axios";
import type { ReqOrdersCancelResponse } from "../responses/ReqOrdersCancelResponse.model";
import type { ReqOrdersCompletePaymentResponse } from "../responses/ReqOrdersCompletePaymentResponse.model";
import type { ReqOrdersCreateResponse } from "../responses/ReqOrdersCreateResponse.model";
import type { ReqOrdersGetByIdResponse } from "../responses/ReqOrdersGetByIdResponse.model";
import type { ReqOrdersGetOrdersListByUserResponse } from "../responses/ReqOrdersGetOrdersListByUserResponse.model";

const PATH_NAME = "/orders";

export const reqOrdersCreate = () => {
  return axiosInstance.post<ReqOrdersCreateResponse>(`${PATH_NAME}/create`, {});
};

export const reqOrdersCompletePayment = (id: number) => {
  return axiosInstance.post<ReqOrdersCompletePaymentResponse>(
    `${PATH_NAME}/complete-payment/${id}`,
  );
};

export const reqOrdersCancel = (id: number) => {
  return axiosInstance.post<ReqOrdersCancelResponse>(
    `${PATH_NAME}/cancel/${id}`,
  );
};

export const reqOrdersGetOrdersListByUser = () => {
  return axiosInstance.get<ReqOrdersGetOrdersListByUserResponse>(
    `${PATH_NAME}/get-orders-list-by-user`,
  );
};

export const reqOrdersGetById = (id: number) => {
  return axiosInstance.get<ReqOrdersGetByIdResponse>(
    `${PATH_NAME}/get-by-id/${id}`,
  );
};
