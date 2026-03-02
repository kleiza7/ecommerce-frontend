import { isAxiosError } from "axios";
import { useEffect, useMemo, useRef } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useCurrenciesGetAll } from "../../hooks/useCurrenciesGetAll";
import { useOrdersCompletePayment } from "../../hooks/useOrdersCompletePayment";
import { useOrdersGetById } from "../../hooks/useOrdersGetById";
import { ROUTES } from "../../shared/constants/Routes.constants";
import { TOAST_TYPE } from "../../shared/enums/ToastType.enum";
import { canCheckoutOrder } from "../../shared/utils/Order.util";
import { showToast } from "../../shared/utils/Toast.util";
import type { CheckoutFormType } from "./components/CheckoutForm";
import CheckoutForm from "./components/CheckoutForm";
import CheckoutPageSkeleton from "./components/CheckoutPageSkeleton";
import OrderItemsList from "./components/OrderItemsList";
import OrderSummary from "./components/OrderSummary";

const CheckoutPage = () => {
  const hasSubmittedRef = useRef(false);

  const navigate = useNavigate();
  const { orderId } = useParams();
  const parsedOrderId = Number(orderId);

  const {
    data: order,
    isLoading,
    isError,
    error,
  } = useOrdersGetById(parsedOrderId);

  const { data: currencies = [] } = useCurrenciesGetAll();
  const { mutate: completePayment, isPending } = useOrdersCompletePayment();

  const currencyMap = useMemo(() => {
    const map = new Map<number, string>();
    for (const currency of currencies) {
      map.set(currency.id, currency.code);
    }
    return map;
  }, [currencies]);

  const onSubmit: SubmitHandler<CheckoutFormType> = () => {
    hasSubmittedRef.current = true;

    completePayment(parsedOrderId, {
      onSuccess: () => {
        navigate(ROUTES.ORDER_DETAIL_PAGE.build(parsedOrderId), {
          replace: true,
        });
      },
    });
  };

  useEffect(() => {
    if (isNaN(parsedOrderId)) {
      navigate(ROUTES.NOT_FOUND_PAGE.build(), { replace: true });
    }
  }, [parsedOrderId, navigate]);

  useEffect(() => {
    if (!isError || !isAxiosError(error)) return;

    const status = error.response?.status;

    switch (status) {
      case 403: {
        navigate(ROUTES.HOME_PAGE.build(), { replace: true });
        break;
      }

      case 404: {
        navigate(ROUTES.NOT_FOUND_PAGE.build(), { replace: true });
        break;
      }
    }
  }, [isError, error, navigate]);

  useEffect(() => {
    if (!order || canCheckoutOrder(order.status) || hasSubmittedRef.current)
      return;

    showToast({
      title: "Invalid Checkout",
      description: "This order cannot be paid.",
      type: TOAST_TYPE.ERROR,
    });

    navigate(ROUTES.HOME_PAGE.build(), { replace: true });
  }, [order, navigate]);

  if (isLoading) {
    return <CheckoutPageSkeleton />;
  }

  if (!order) {
    return null;
  }

  return (
    <div className="mx-auto flex w-full max-w-[1380px] flex-col px-3 pt-3 pb-64 md:px-10 md:pt-6 lg:py-10">
      <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
        <span className="text-s32-l40 text-text-primary font-semibold">
          Checkout
        </span>

        <div className="flex items-start gap-x-8">
          <div className="flex min-w-0 flex-1 flex-col gap-4 md:gap-6">
            <OrderItemsList
              orderItems={order.items}
              currencyMap={currencyMap}
            />

            <CheckoutForm onSubmit={onSubmit} isPending={isPending} />
          </div>

          <OrderSummary
            order={order}
            currencyMap={currencyMap}
            isPending={isPending}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
