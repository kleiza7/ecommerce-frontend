import type { PublicUser } from "../../api/models/PublicUser.model";

const USER_KEY = "USER";
const TOKEN_KEY = "ACCESS_TOKEN";

export const saveAuthToStorage = (user: PublicUser, accessToken: string) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem(TOKEN_KEY, accessToken);
};

export const getUserFromStorage = (): PublicUser | null => {
  const user = localStorage.getItem(USER_KEY);
  if (!user) return null;

  try {
    return JSON.parse(user) as PublicUser;
  } catch {
    return null;
  }
};

export const getTokenFromStorage = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const clearAuthFromStorage = () => {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(TOKEN_KEY);
};
