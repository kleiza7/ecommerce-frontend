import axiosInstance from "../../axios";
import type { ReqFavoritesMergePayload } from "../payloads/ReqFavoritesMergePayload.model";
import type { ReqFavoritesToggleFavoritePayload } from "../payloads/ReqFavoritesToggleFavoritePayload.model";
import type { ReqFavoritesGetFavoritesListByUserResponse } from "../responses/ReqFavoritesGetFavoritesListByUserResponse.model";
import type { ReqFavoritesMergeResponse } from "../responses/ReqFavoritesMergeResponse.model";
import type { ReqFavoritesToggleFavoriteResponse } from "../responses/ReqFavoritesToggleFavoriteResponse.model";

const PATH_NAME = "/favorites";

export const reqFavoritesGetFavoritesListByUser = () => {
  return axiosInstance.get<ReqFavoritesGetFavoritesListByUserResponse>(
    `${PATH_NAME}/get-favorites-list-by-user`,
  );
};

export const reqFavoritesToggleFavorite = (
  payload: ReqFavoritesToggleFavoritePayload,
) => {
  return axiosInstance.post<ReqFavoritesToggleFavoriteResponse>(
    `${PATH_NAME}/toggle-favorite`,
    payload,
  );
};

export const reqFavoritesMerge = (payload: ReqFavoritesMergePayload) => {
  return axiosInstance.post<ReqFavoritesMergeResponse>(
    `${PATH_NAME}/merge`,
    payload,
  );
};
