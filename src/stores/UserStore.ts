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
  isAuthenticated: boolean;
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
    isAuthenticated: false,

    login(user, accessToken) {
      saveAuthToStorage(user, accessToken);

      set({
        user,
        accessToken,
        isAuthenticated: true,
      });
    },

    logout() {
      clearAuthFromStorage();

      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
      });
    },

    hydrate() {
      const user = getUserFromStorage();
      const token = getTokenFromStorage();

      if (user && token) {
        set({
          user,
          accessToken: token,
          isAuthenticated: true,
        });
      } else {
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
        });
      }
    },
  }),
);
