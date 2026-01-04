export const USER_DOMAIN = {
  PUBLIC: "PUBLIC",
  SELLER: "SELLER",
  ADMIN: "ADMIN",
} as const;

export type USER_DOMAIN = (typeof USER_DOMAIN)[keyof typeof USER_DOMAIN];
