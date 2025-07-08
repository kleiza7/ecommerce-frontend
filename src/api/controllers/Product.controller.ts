import axiosInstance from '../../axios';
import type { ReqProductsGetAllResponse } from '../responses/ReqProductsGetAllResponse.model';
import type { ReqProductsGetByIdResponse } from '../responses/ReqProductsGetByIdResponse.model';

const PATH_NAME = '/products';

export const reqProductsGetAll = () => {
  return axiosInstance.get<ReqProductsGetAllResponse>(`${PATH_NAME}/get-all`);
};

export const reqProductsGetById = (id: number) => {
  return axiosInstance.get<ReqProductsGetByIdResponse>(`${PATH_NAME}/get-by-id/${id}`);
};
