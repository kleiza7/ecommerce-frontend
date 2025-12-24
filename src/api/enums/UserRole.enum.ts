export const USER_ROLE = {
  USER: "user",
  SELLER: "seller",
} as const;

export type USER_ROLE = (typeof USER_ROLE)[keyof typeof USER_ROLE];
