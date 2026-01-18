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
    const items = useFavoriteStore.getState().items;

    const snapshotIsFavorited = items.some(
      (item) => item.productId === product.id,
    );

    const newIsFavorited = !snapshotIsFavorited;

    /* ---------- OPTIMISTIC UI ---------- */
    if (newIsFavorited) {
      addItem({ productId: product.id, product });
    } else {
      removeItem(product.id);
    }

    /* ---------- AUTH ---------- */
    if (isAuthenticated) {
      toggleFavoriteMutation.mutate(
        { productId: product.id },
        {
          onSuccess: (res) => {
            // server authoritative
            if (res.isFavorited !== newIsFavorited) {
              if (res.isFavorited) {
                addItem({ productId: product.id, product });
              } else {
                removeItem(product.id);
              }
            }
          },
          onError: () => {
            // 🔥 PRODUCT-LEVEL ROLLBACK
            if (snapshotIsFavorited) {
              addItem({ productId: product.id, product });
            } else {
              removeItem(product.id);
            }

            showToast({
              description: "Failed to update favorites.",
              type: TOAST_TYPE.ERROR,
            });
          },
        },
      );
      return;
    }

    /* ---------- GUEST ---------- */
    try {
      if (newIsFavorited) {
        addFavoriteToGuestFavorites({ productId: product.id, product });
      } else {
        removeFavoriteFromGuestFavorites(product.id);
      }
    } catch {
      // 🔥 PRODUCT-LEVEL ROLLBACK
      if (snapshotIsFavorited) {
        addItem({ productId: product.id, product });
      } else {
        removeItem(product.id);
      }

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

    clearStoreFavorites();
    clearGuestFavorites();
  };

  return {
    getFavorites,
    toggleFavorite,
    clearFavorites,

    isLoading: favoritesGetQuery.isFetching || toggleFavoriteMutation.isPending,
  };
};
