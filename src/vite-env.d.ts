/// <reference types="vite/client" />

import type { ReqOrdersCreateResponse } from "./api/responses/ReqOrdersCreateResponse.model";
import type { ReqProductsCreateResponse } from "./api/responses/ReqProductsCreateResponse.model";
import type { ReqProductsUpdateResponse } from "./api/responses/ReqProductsUpdateResponse.model";
import type { EVENT_TYPE } from "./shared/enums/EventType.enum";
import type { ToastEventDetail } from "./shared/models/ToastEventDetail.model";

declare global {
  interface WindowEventMap {
    [EVENT_TYPE.SHOW_TOAST]: CustomEvent<ToastEventDetail>;

    // PRODUCTS
    [EVENT_TYPE.PRODUCT_CREATED]: CustomEvent<ReqProductsCreateResponse>;
    [EVENT_TYPE.PRODUCT_UPDATED]: CustomEvent<ReqProductsUpdateResponse>;
    [EVENT_TYPE.PRODUCT_APPROVED]: CustomEvent<{ productId: number }>;
    [EVENT_TYPE.PRODUCT_REJECTED]: CustomEvent<{ productId: number }>;

    // ORDERS
    [EVENT_TYPE.ORDER_CREATED]: CustomEvent<ReqOrdersCreateResponse>;
    [EVENT_TYPE.ORDER_PAID]: CustomEvent<{ orderId: number }>;
    [EVENT_TYPE.ORDER_CANCELED]: CustomEvent<{ orderId: number }>;
  }
}
