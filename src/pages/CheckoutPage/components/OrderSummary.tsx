import type { ReqOrdersGetByIdResponse } from "../../../api/responses/ReqOrdersGetByIdResponse.model";
import { LockIcon } from "../../../assets/icons";
import {
  BUTTON_ACCENT,
  BUTTON_SIZE_X_LARGE,
} from "../../../shared/constants/CommonTailwindClasses.constants";
import { customTwMerge } from "../../../shared/utils/Tailwind.util";

const OrderSummary = ({
  order,
  currencyMap,
  isPending,
}: {
  order: ReqOrdersGetByIdResponse;
  currencyMap: Map<number, string>;
  isPending: boolean;
}) => {
  // TODO: remove it
  const currencyCode = order ? (currencyMap.get(order.currencyId) ?? "") : "";

  return (
    <div
      className={customTwMerge(
        "bg-surface-primary border-border-secondary flex flex-col gap-8 border-t p-8",
        "w-full shrink-0 lg:w-[440px]",
        "fixed inset-x-0 bottom-0 z-10 lg:static",
        "lg:rounded-lg lg:border lg:shadow-lg",
      )}
    >
      <span className="text-s24-l32 text-text-primary font-bold">
        Order Summary
      </span>

      <div className="flex items-center justify-between">
        <span className="text-s16-l24 text-text-secondary">Subtotal</span>
        <span className="text-s16-l24 text-text-primary font-bold">
          {order.totalPrice.toFixed(2)} {currencyCode}
        </span>
      </div>

      <div className="border-border-primary h-px border-t border-dashed" />

      <div className="flex justify-between font-medium">
        <span className="text-text-muted text-s32-l40">Total</span>
        <span className="text-accent text-s32-l40 font-bold">
          {order.totalPrice.toFixed(2)} {currencyCode}
        </span>
      </div>

      <button
        type="submit"
        form="checkout-form"
        disabled={isPending}
        className={customTwMerge(
          BUTTON_ACCENT,
          BUTTON_SIZE_X_LARGE,
          "text-s18-l28 h-14 w-full rounded-xl shadow-md",
        )}
      >
        <LockIcon className="fill-surface-primary" />
        Complete Payment
      </button>
    </div>
  );
};

export default OrderSummary;
