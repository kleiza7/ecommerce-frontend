import { useEffect } from "react";
import { reqFavoritesGetFavoritesListByUser } from "../api/controllers/Favorites.controller";
import { getGuestFavorites } from "../shared/utils/GuestFavorite.util";
import { useFavoriteStore } from "../stores/FavoriteStore";
import { useUserStore } from "../stores/UserStore";

export const useFavoriteHydrate = () => {
  const { user, isHydrated } = useUserStore();
  const setItems = useFavoriteStore((state) => state.setItems);

  const userId = user?.id;

  useEffect(() => {
    if (!isHydrated) return;

    const hydrate = async () => {
      if (userId) {
        const res = await reqFavoritesGetFavoritesListByUser();
        if (res.data) {
          setItems(res.data);
        }
      } else {
        const favorites = getGuestFavorites();
        setItems(favorites.items);
      }
    };

    hydrate();
  }, [isHydrated, userId, setItems]);
};
