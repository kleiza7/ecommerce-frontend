import axiosInstance from '../../axios';
import type { ReqGetAllProductsResponse } from '../responses/ReqGetAllProductsResponse.model';

const PATH_NAME = '/products';

export const reqGetAllProducts = () => {
  return axiosInstance.get<ReqGetAllProductsResponse>(`${PATH_NAME}/get-all`);
};
