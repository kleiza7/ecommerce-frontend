import type { ReqOrdersGetByIdResponse } from "../../../api/responses/ReqOrdersGetByIdResponse.model";
import {
  BUTTON_PRIMARY,
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
        "bg-surface-primary border-gray-2 flex flex-col gap-4 border-t p-6",
        "w-full shrink-0 lg:w-[350px]",
        "fixed inset-x-0 bottom-0 z-50 lg:static",
        "lg:rounded-lg lg:border",
      )}
    >
      <span className="text-s22-l28 font-medium">Order Summary</span>

      <div className="text-s14-l20 text-gray-9 flex justify-between">
        <span>Subtotal</span>
        <span>
          {order.totalPrice.toFixed(2)} {currencyCode}
        </span>
      </div>

      <div className="bg-gray-5 h-px" />

      <div className="flex justify-between font-medium">
        <span>Total</span>
        <span className="text-orange">
          {order.totalPrice.toFixed(2)} {currencyCode}
        </span>
      </div>

      <button
        type="submit"
        form="checkout-form"
        disabled={isPending}
        className={customTwMerge(
          BUTTON_PRIMARY,
          BUTTON_SIZE_X_LARGE,
          "text-s18-l28 h-[52px] w-full rounded",
        )}
      >
        Complete Payment
      </button>
    </div>
  );
};

export default OrderSummary;
