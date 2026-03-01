import axiosInstance from "../../axios";
import type { ReqProductReviewsCreatePayload } from "../payloads/ReqProductReviewsCreatePayload.model";
import type { ReqProductReviewsUpdatePayload } from "../payloads/ReqProductReviewsUpdatePayload.model";
import type { ReqProductReviewsCreateResponse } from "../responses/ReqProductReviewsCreateResponse.model";
import type { ReqProductReviewsDeleteResponse } from "../responses/ReqProductReviewsDeleteResponse.model";
import type { ReqProductReviewsGetReviewsByProductIdResponse } from "../responses/ReqProductReviewsGetReviewsByProductIdResponse.model";
import type { ReqProductReviewsUpdateResponse } from "../responses/ReqProductReviewsUpdateResponse.model";

const PATH_NAME = "/product-reviews";

export const reqProductReviewsGetReviewsByProductId = (productId: number) => {
  return axiosInstance.get<ReqProductReviewsGetReviewsByProductIdResponse>(
    `${PATH_NAME}/get-reviews-by-product-id/${productId}`,
  );
};

export const reqProductReviewsCreate = (
  payload: ReqProductReviewsCreatePayload,
) => {
  return axiosInstance.post<ReqProductReviewsCreateResponse>(
    `${PATH_NAME}/create`,
    payload,
  );
};

export const reqProductReviewsUpdate = (
  payload: ReqProductReviewsUpdatePayload,
) => {
  return axiosInstance.put<ReqProductReviewsUpdateResponse>(
    `${PATH_NAME}/update`,
    payload,
  );
};

export const reqProductReviewsDelete = (id: number) => {
  return axiosInstance.delete<ReqProductReviewsDeleteResponse>(
    `${PATH_NAME}/delete/${id}`,
  );
};
