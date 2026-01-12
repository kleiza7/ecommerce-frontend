import type { FavoriteItemUI } from "../models/FavoriteItemUI.model";
import type { FavoriteUI } from "../models/FavoriteUI.model";

const STORAGE_KEY = "guest_favorites";

const getEmptyFavorites = (): FavoriteUI => ({
  items: [],
});

const saveGuestFavorites = (favorites: FavoriteUI) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
};

export const getGuestFavorites = (): FavoriteUI => {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return getEmptyFavorites();
  }

  try {
    return JSON.parse(raw) as FavoriteUI;
  } catch {
    return getEmptyFavorites();
  }
};

export const addFavoriteToGuestFavorites = (
  item: FavoriteItemUI,
): FavoriteItemUI => {
  const favorites = getGuestFavorites();

  const exists = favorites.items.find((i) => i.productId === item.productId);

  if (!exists) {
    favorites.items.push(item);
    saveGuestFavorites(favorites);
  }

  return item;
};

export const removeFavoriteFromGuestFavorites = (productId: number): void => {
  const favorites = getGuestFavorites();

  favorites.items = favorites.items.filter(
    (item) => item.productId !== productId,
  );

  saveGuestFavorites(favorites);
};

export const clearGuestFavorites = (): void => {
  const emptyFavorites = getEmptyFavorites();
  saveGuestFavorites(emptyFavorites);
};
