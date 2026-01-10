export const ORDER_STATUS = {
  PENDING: "PENDING",
  PAID: "PAID",
  COMPLETED: "COMPLETED",
  CANCELED: "CANCELED",
} as const;

export type ORDER_STATUS = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];
