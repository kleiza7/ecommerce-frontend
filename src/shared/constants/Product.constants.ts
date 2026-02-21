import { PRODUCT_STATUS } from "../../api/enums/ProductStatus.enum";

export const PRODUCT_STATUS_TEXT_PAIRS: Record<PRODUCT_STATUS, string> = {
  [PRODUCT_STATUS.APPROVED]: "Approved",
  [PRODUCT_STATUS.WAITING_FOR_APPROVE]: "Waiting For Approve",
  [PRODUCT_STATUS.NOT_APPROVED]: "Not Approved",
  [PRODUCT_STATUS.DELETED]: "Deleted",
};

export const PRODUCT_STATUS_COLOR_PAIRS: Record<
  PRODUCT_STATUS,
  {
    primary: string;
    secondary: string;
    muted: string;
  }
> = {
  [PRODUCT_STATUS.APPROVED]: {
    primary: "var(--color-status-success-primary)",
    secondary: "var(--color-status-success-secondary)",
    muted: "var(--color-status-success-muted)",
  },
  [PRODUCT_STATUS.WAITING_FOR_APPROVE]: {
    primary: "var(--color-status-info-primary)",
    secondary: "var(--color-status-info-secondary)",
    muted: "var(--color-status-info-muted)",
  },
  [PRODUCT_STATUS.NOT_APPROVED]: {
    primary: "var(--color-status-error-primary)",
    secondary: "var(--color-status-error-secondary)",
    muted: "var(--color-status-error-muted)",
  },
  [PRODUCT_STATUS.DELETED]: {
    primary: "var(--color-status-neutral-primary)",
    secondary: "var(--color-status-neutral-secondary)",
    muted: "var(--color-status-neutral-muted)",
  },
};
