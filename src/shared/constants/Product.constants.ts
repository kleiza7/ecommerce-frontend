import { PRODUCT_STATUS } from "../../api/enums/ProductStatus.enum";

export const PRODUCT_STATUS_TEXT_PAIRS: Record<PRODUCT_STATUS, string> = {
  [PRODUCT_STATUS.APPROVED]: "Approved",
  [PRODUCT_STATUS.WAITING_FOR_APPROVE]: "Waiting For Approve",
  [PRODUCT_STATUS.NOT_APPROVED]: "Not Approved",
  [PRODUCT_STATUS.DELETED]: "Deleted",
};
