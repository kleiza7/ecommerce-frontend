import type { TOAST_TYPE } from "../enums/ToastType.enum";

export type ToastEventDetail = {
  title?: string;
  description?: string;
  type: TOAST_TYPE;
};
