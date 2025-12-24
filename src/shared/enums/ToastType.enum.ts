export const TOAST_TYPE = {
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  INFO: "INFO",
} as const;

export type TOAST_TYPE = (typeof TOAST_TYPE)[keyof typeof TOAST_TYPE];
