import { useEffect } from "react";
import { reqFavoritesGetFavoritesListByUser } from "../api/controllers/Favorites.controller";
import { USER_ROLE } from "../api/enums/UserRole.enum";
import { getGuestFavorites } from "../shared/utils/GuestFavorite.util";
import { useFavoriteStore } from "../stores/FavoriteStore";
import { useUserStore } from "../stores/UserStore";

export const useFavoriteHydrate = () => {
  const { user, isHydrated } = useUserStore();
  const setItems = useFavoriteStore((state) => state.setItems);

  useEffect(() => {
    if (!isHydrated) return;

    const hydrate = async () => {
      if (!user) {
        const favorites = getGuestFavorites();
        setItems(favorites.items);
        return;
      }

      if (user.role !== USER_ROLE.USER) {
        setItems([]);
        return;
      }

      const res = await reqFavoritesGetFavoritesListByUser();
      if (res.data) {
        setItems(res.data);
      }
    };

    hydrate();
  }, [isHydrated, user, setItems]);
};
