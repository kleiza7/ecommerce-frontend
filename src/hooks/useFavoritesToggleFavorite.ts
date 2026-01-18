import { useMutation } from "@tanstack/react-query";
import { reqFavoritesToggleFavorite } from "../api/controllers/Favorites.controller";
import type { ReqFavoritesToggleFavoritePayload } from "../api/payloads/ReqFavoritesToggleFavoritePayload.model";
import type { ReqFavoritesToggleFavoriteResponse } from "../api/responses/ReqFavoritesToggleFavoriteResponse.model";
import { TOAST_TYPE } from "../shared/enums/ToastType.enum";
import { showToast } from "../shared/utils/Toast.util";

export const useFavoritesToggleFavorite = (
  onSuccessCallback?: (data: ReqFavoritesToggleFavoriteResponse) => void,
) => {
  return useMutation<
    ReqFavoritesToggleFavoriteResponse,
    Error,
    ReqFavoritesToggleFavoritePayload
  >({
    mutationFn: async (payload) => {
      const res = await reqFavoritesToggleFavorite(payload);
      return res.data;
    },

    onSuccess: (data) => {
      // INFO: commented for optimistic update
      // showToast({
      //   title: data.isFavorited
      //     ? "Added to favorites"
      //     : "Removed from favorites",
      //   description: data.isFavorited
      //     ? "The product has been added to your favorites."
      //     : "The product has been removed from your favorites.",
      //   type: TOAST_TYPE.SUCCESS,
      // });

      onSuccessCallback?.(data);
    },

    onError: () => {
      showToast({
        description: "Failed to update favorites.",
        type: TOAST_TYPE.ERROR,
      });
    },
  });
};
