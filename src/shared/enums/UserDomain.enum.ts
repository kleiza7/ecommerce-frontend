export const USER_DOMAIN = {
  GUEST: "GUEST",
  USER: "USER",
  SELLER: "SELLER",
  ADMIN: "ADMIN",
} as const;

export type USER_DOMAIN = (typeof USER_DOMAIN)[keyof typeof USER_DOMAIN];
