import type { FC, SVGProps } from "react";
import { ORDER_STATUS } from "../../api/enums/OrderStatus.enum";
import {
  CancelIcon,
  CheckCircleIcon,
  PaymentsIcon,
  ScheduleIcon,
} from "../../assets/icons";

export const ORDER_STATUS_TEXT_PAIRS: Record<ORDER_STATUS, string> = {
  [ORDER_STATUS.PENDING]: "Pending",
  [ORDER_STATUS.PAID]: "Paid",
  [ORDER_STATUS.COMPLETED]: "Completed",
  [ORDER_STATUS.CANCELED]: "Canceled",
};

export const ORDER_STATUS_COLOR_PAIRS: Record<
  ORDER_STATUS,
  {
    primary: string;
    secondary: string;
    muted: string;
  }
> = {
  [ORDER_STATUS.PENDING]: {
    primary: "var(--color-status-info-primary)",
    secondary: "var(--color-status-info-secondary)",
    muted: "var(--color-status-info-muted)",
  },
  [ORDER_STATUS.PAID]: {
    primary: "var(--color-status-warning-primary)",
    secondary: "var(--color-status-warning-secondary)",
    muted: "var(--color-status-warning-muted)",
  },
  [ORDER_STATUS.COMPLETED]: {
    primary: "var(--color-status-success-primary)",
    secondary: "var(--color-status-success-secondary)",
    muted: "var(--color-status-success-muted)",
  },
  [ORDER_STATUS.CANCELED]: {
    primary: "var(--color-status-neutral-primary)",
    secondary: "var(--color-status-neutral-secondary)",
    muted: "var(--color-status-neutral-muted)",
  },
};

export const ORDER_STATUS_ICON_PAIRS: Record<
  ORDER_STATUS,
  FC<SVGProps<SVGSVGElement>>
> = {
  [ORDER_STATUS.PENDING]: ScheduleIcon,
  [ORDER_STATUS.PAID]: PaymentsIcon,
  [ORDER_STATUS.COMPLETED]: CheckCircleIcon,
  [ORDER_STATUS.CANCELED]: CancelIcon,
};
