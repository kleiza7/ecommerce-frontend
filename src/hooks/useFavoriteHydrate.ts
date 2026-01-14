import { useEffect, useRef } from "react";
import { reqFavoritesGetFavoritesListByUser } from "../api/controllers/Favorites.controller";
import { getGuestFavorites } from "../shared/utils/GuestFavorite.util";
import { useFavoriteStore } from "../stores/FavoriteStore";
import { useUserStore } from "../stores/UserStore";

export const useFavoriteHydrate = () => {
  const { user, isHydrated } = useUserStore();
  const setItems = useFavoriteStore((state) => state.setItems);

  const hydratedRef = useRef(false);

  useEffect(() => {
    if (!isHydrated) return;
    if (hydratedRef.current) return;

    const hydrate = async () => {
      if (user) {
        const res = await reqFavoritesGetFavoritesListByUser();
        if (res.data) {
          setItems(res.data);
        }
      } else {
        const favorites = getGuestFavorites();
        setItems(favorites.items);
      }

      hydratedRef.current = true;
    };

    hydrate();
  }, [isHydrated, user, setItems]);
};
