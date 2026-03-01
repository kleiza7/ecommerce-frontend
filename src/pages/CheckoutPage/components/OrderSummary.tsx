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
        "bg-surface-primary border-border-secondary flex flex-col border-t",
        "fixed inset-x-0 bottom-0 z-10 w-full shrink-0",
        "gap-4 p-4 lg:static lg:w-[340px] lg:gap-6 lg:rounded-lg lg:border lg:p-6 lg:shadow-lg",
        "xl:w-[440px] xl:gap-8 xl:p-8",
      )}
    >
      <span className="text-text-primary text-s20-l28 lg:text-s22-l28 xl:text-s24-l32 font-bold">
        Order Summary
      </span>

      <div className="flex items-center justify-between">
        <span className="text-text-secondary text-s14-l20 xl:text-s16-l24">
          Subtotal
        </span>
        <span className="text-text-primary text-s14-l20 xl:text-s16-l24 font-bold">
          {order.totalPrice.toFixed(2)} {currencyCode}
        </span>
      </div>

      <div className="border-border-primary h-px border-t border-dashed" />

      <div className="flex justify-between font-medium">
        <span className="text-text-muted text-s24-l32 lg:text-s28-l36 xl:text-s32-l40">
          Total
        </span>
        <span className="text-accent text-s24-l32 lg:text-s28-l36 xl:text-s32-l40 font-bold">
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
          "text-s16-l24 xl:text-s18-l28 h-12 w-full rounded-xl shadow-md xl:h-14",
        )}
      >
        <LockIcon className="fill-surface-primary" />
        Complete Payment
      </button>
    </div>
  );
};

export default OrderSummary;
