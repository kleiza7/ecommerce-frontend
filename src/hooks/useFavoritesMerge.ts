import { useMutation } from "@tanstack/react-query";
import { reqFavoritesMerge } from "../api/controllers/Favorites.controller";
import type { ReqFavoritesMergePayload } from "../api/payloads/ReqFavoritesMergePayload.model";
import type { ReqFavoritesMergeResponse } from "../api/responses/ReqFavoritesMergeResponse.model";
import { TOAST_TYPE } from "../shared/enums/ToastType.enum";
import { showToast } from "../shared/utils/Toast.util";

export const useFavoritesMerge = () => {
  return useMutation<
    ReqFavoritesMergeResponse,
    Error,
    ReqFavoritesMergePayload
  >({
    mutationFn: async (payload) => {
      const res = await reqFavoritesMerge(payload);
      return res.data;
    },

    onError: () => {
      showToast({
        description: "An error occurred while merging your favorites.",
        type: TOAST_TYPE.ERROR,
      });
    },
  });
};
