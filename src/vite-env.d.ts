/// <reference types="vite/client" />

import type { EVENT_TYPE } from "./shared/enums/EventType.enum";
import type { ToastEventDetail } from "./shared/models/ToastEventDetail.model";

interface WindowEventMap {
  [EVENT_TYPE.SHOW_TOAST]: CustomEvent<ToastEventDetail>;
}
