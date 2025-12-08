import axiosInstance from "../../axios";
import type { ReqAuthLoginPayload } from "../payloads/ReqAuthLoginPayload.model";
import type { ReqAuthRegisterSellerPayload } from "../payloads/ReqAuthRegisterSellerPayload.model";
import type { ReqAuthRegisterUserPayload } from "../payloads/ReqAuthRegisterUserPayload.model";
import type { ReqAuthLoginResponse } from "../responses/ReqAuthLoginResponse.model";
import type { ReqAuthRegisterSellerResponse } from "../responses/ReqAuthRegisterSellerResponse.model";
import type { ReqAuthRegisterUserResponse } from "../responses/ReqAuthRegisterUserResponse.model";

const PATH_NAME = "/auth";

export const reqAuthRegisterUser = (payload: ReqAuthRegisterUserPayload) => {
  return axiosInstance.post<ReqAuthRegisterUserResponse>(
    `${PATH_NAME}/register-user`,
    payload,
  );
};

export const reqAuthRegisterSeller = (
  payload: ReqAuthRegisterSellerPayload,
) => {
  return axiosInstance.post<ReqAuthRegisterSellerResponse>(
    `${PATH_NAME}/register-seller`,
    payload,
  );
};

export const reqAuthLogin = (payload: ReqAuthLoginPayload) => {
  return axiosInstance.post<ReqAuthLoginResponse>(
    `${PATH_NAME}/login`,
    payload,
  );
};
