import { create } from "zustand";
import type { PublicUser } from "../api/models/PublicUser.model";
import {
  clearAuthFromStorage,
  getTokenFromStorage,
  getUserFromStorage,
  saveAuthToStorage,
} from "../shared/utils/Auth.util";

export type UserStoreState = {
  user: PublicUser | null;
  accessToken: string | null;
  isHydrated: boolean; // 🔥
};

type UserStoreActions = {
  login: (user: PublicUser, accessToken: string) => void;
  logout: () => void;
  hydrate: () => void;
};

export const useUserStore = create<UserStoreState & UserStoreActions>(
  (set) => ({
    user: null,
    accessToken: null,
    isHydrated: false, // 🔥

    login(user, accessToken) {
      saveAuthToStorage(user, accessToken);

      set({
        user,
        accessToken,
        isHydrated: true,
      });
    },

    logout() {
      clearAuthFromStorage();

      set({
        user: null,
        accessToken: null,
        isHydrated: true,
      });
    },

    hydrate() {
      const user = getUserFromStorage();
      const token = getTokenFromStorage();

      set({
        user: user && token ? user : null,
        accessToken: token ?? null,
        isHydrated: true, // 🔥 KRİTİK
      });
    },
  }),
);
