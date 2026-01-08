/// <reference types="vite/client" />

import type { ReqProductsCreateResponse } from "./api/responses/ReqProductsCreateResponse.model";
import type { ReqProductsUpdateResponse } from "./api/responses/ReqProductsUpdateResponse.model";
import type { EVENT_TYPE } from "./shared/enums/EventType.enum";
import type { ToastEventDetail } from "./shared/models/ToastEventDetail.model";

declare global {
  interface WindowEventMap {
    [EVENT_TYPE.SHOW_TOAST]: CustomEvent<ToastEventDetail>;
    [EVENT_TYPE.PRODUCT_CREATED]: CustomEvent<ReqProductsCreateResponse>;
    [EVENT_TYPE.PRODUCT_UPDATED]: CustomEvent<ReqProductsUpdateResponse>;
    [EVENT_TYPE.PRODUCT_APPROVED]: CustomEvent<{ productId: number }>;
    [EVENT_TYPE.PRODUCT_REJECTED]: CustomEvent<{ productId: number }>;
  }
}
