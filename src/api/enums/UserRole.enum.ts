export const USER_ROLE = {
  USER: "USER",
  SELLER: "SELLER",
  ADMIN: "ADMIN",
} as const;

export type USER_ROLE = (typeof USER_ROLE)[keyof typeof USER_ROLE];
