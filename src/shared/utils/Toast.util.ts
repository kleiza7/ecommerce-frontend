import { EVENT_TYPE } from "../enums/EventType.enum";
import type { ToastEventDetail } from "../models/ToastEventDetail.model";

export const showToast = (detail: ToastEventDetail) => {
  window.dispatchEvent(new CustomEvent(EVENT_TYPE.SHOW_TOAST, { detail }));
};
