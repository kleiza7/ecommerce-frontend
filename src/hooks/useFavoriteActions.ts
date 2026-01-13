import { TOAST_TYPE } from "../shared/enums/ToastType.enum";
import type { FavoriteItemUI } from "../shared/models/FavoriteItemUI.model";
import {
  addFavoriteToGuestFavorites,
  clearGuestFavorites,
  getGuestFavorites,
  removeFavoriteFromGuestFavorites,
} from "../shared/utils/GuestFavorite.util";
import { showToast } from "../shared/utils/Toast.util";
import { useFavoriteStore } from "../stores/FavoriteStore";
import { useUserStore } from "../stores/UserStore";
import { useFavoritesGetFavoritesListByUser } from "./useFavoritesGetFavoritesListByUser";
import { useFavoritesToggleFavorite } from "./useFavoritesToggleFavorite";

export const useFavoriteActions = () => {
  const setItems = useFavoriteStore((state) => state.setItems);
  const addItem = useFavoriteStore((state) => state.addItem);
  const removeItem = useFavoriteStore((state) => state.removeItem);
  const clearStoreFavorites = useFavoriteStore((state) => state.clearFavorites);

  const user = useUserStore((state) => state.user);
  const isAuthenticated = Boolean(user);

  const favoritesGetQuery = useFavoritesGetFavoritesListByUser();
  const toggleFavoriteMutation = useFavoritesToggleFavorite();

  const getFavorites = async () => {
    if (isAuthenticated) {
      const result = await favoritesGetQuery.refetch();
      if (result.data) {
        setItems(result.data);
      }
      return;
    }

    const favorites = getGuestFavorites();
    setItems(favorites.items);
  };

  const toggleFavorite = (product: FavoriteItemUI["product"]) => {
    if (isAuthenticated) {
      toggleFavoriteMutation.mutate(
        { productId: product.id },
        {
          onSuccess: (res) => {
            if (res.isFavorited) {
              addItem({
                id: undefined,
                productId: product.id,
                product,
              });
            } else {
              removeItem(product.id);
            }
          },
        },
      );
      return;
    }

    try {
      const favorites = getGuestFavorites();

      const exists = favorites.items.find(
        (item) => item.productId === product.id,
      );

      if (exists) {
        removeFavoriteFromGuestFavorites(product.id);
        removeItem(product.id);
      } else {
        const item: FavoriteItemUI = {
          productId: product.id,
          product,
        };

        addFavoriteToGuestFavorites(item);
        addItem(item);
      }
    } catch {
      showToast({
        description: "Failed to update favorites.",
        type: TOAST_TYPE.ERROR,
      });
    }
  };

  const clearFavorites = () => {
    if (isAuthenticated) {
      clearStoreFavorites();
      return;
    }

    clearGuestFavorites();
    clearStoreFavorites();
  };

  return {
    getFavorites,
    toggleFavorite,
    clearFavorites,

    isLoading: favoritesGetQuery.isFetching || toggleFavoriteMutation.isPending,
  };
};
