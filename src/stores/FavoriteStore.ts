import { create } from "zustand";
import type { FavoriteItemUI } from "../shared/models/FavoriteItemUI.model";

type FavoriteStoreState = {
  items: FavoriteItemUI[];
};

type FavoriteStoreActions = {
  setItems: (items: FavoriteItemUI[]) => void;
  addItem: (item: FavoriteItemUI) => void;
  removeItem: (productId: number) => void;
  clearFavorites: () => void;
};

export const useFavoriteStore = create<
  FavoriteStoreState & FavoriteStoreActions
>((set, get) => ({
  items: [],

  setItems: (items) => {
    set({ items });
  },

  addItem: (item) => {
    const { items } = get();

    const exists = items.some((i) => i.productId === item.productId);
    if (exists) {
      return;
    }

    set({
      items: [item, ...items],
    });
  },

  removeItem: (productId) => {
    const { items } = get();

    set({
      items: items.filter((item) => item.productId !== productId),
    });
  },

  clearFavorites: () => {
    set({ items: [] });
  },
}));
