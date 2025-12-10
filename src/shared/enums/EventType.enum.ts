export const EVENT_TYPE = {
  SHOW_TOAST: "SHOW_TOAST",
} as const;

export type EVENT_TYPE = (typeof EVENT_TYPE)[keyof typeof EVENT_TYPE];
