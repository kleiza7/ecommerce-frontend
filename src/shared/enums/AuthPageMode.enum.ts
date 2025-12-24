export const AUTH_PAGE_MODE = {
  LOGIN: "login",
  REGISTER: "register",
} as const;

export type AUTH_PAGE_MODE =
  (typeof AUTH_PAGE_MODE)[keyof typeof AUTH_PAGE_MODE];
