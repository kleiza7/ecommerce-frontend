import { useQuery } from "@tanstack/react-query";
import { reqFavoritesGetFavoritesListByUser } from "../api/controllers/Favorites.controller";
import type { ReqFavoritesGetFavoritesListByUserResponse } from "../api/responses/ReqFavoritesGetFavoritesListByUserResponse.model";

export const useFavoritesGetFavoritesListByUser = () => {
  return useQuery<ReqFavoritesGetFavoritesListByUserResponse>({
    queryKey: ["favorites", "get-favorites-list-by-user"],
    queryFn: async () => {
      const res = await reqFavoritesGetFavoritesListByUser();
      return res.data;
    },
    staleTime: 1000 * 60 * 1,
    enabled: false,
  });
};
