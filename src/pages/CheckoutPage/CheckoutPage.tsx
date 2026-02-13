import { useMemo } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useCurrenciesGetAll } from "../../hooks/useCurrenciesGetAll";
import { useOrdersCompletePayment } from "../../hooks/useOrdersCompletePayment";
import { useOrdersGetById } from "../../hooks/useOrdersGetById";
import { ROUTES } from "../../shared/constants/Routes.constants";
import type { CheckoutFormType } from "./components/CheckoutForm";
import CheckoutForm from "./components/CheckoutForm";
import OrderItemsList from "./components/OrderItemsList";
import OrderSummary from "./components/OrderSummary";

const CheckoutPage = () => {
  const { orderId } = useParams();
  const parsedOrderId = Number(orderId);

  const { data: order } = useOrdersGetById(parsedOrderId);
  const { data: currencies = [] } = useCurrenciesGetAll();
  const { mutate: completePayment, isPending } = useOrdersCompletePayment();

  const currencyMap = useMemo(() => {
    const map = new Map<number, string>();
    for (const currency of currencies) {
      map.set(currency.id, currency.code);
    }
    return map;
  }, [currencies]);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<CheckoutFormType> = () => {
    completePayment(parsedOrderId, {
      onSuccess: () => {
        navigate(ROUTES.ORDER_DETAIL_PAGE.build(parsedOrderId), {
          replace: true,
        });
      },
    });
  };

  if (!order) {
    return null;
  }

  return (
    <div className="mx-auto flex w-full max-w-[1380px] flex-col px-3 pt-3 pb-64 md:px-10 md:pt-6 lg:py-10">
      <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
        <span className="text-s24-l32 text-text-primary font-semibold">
          Checkout
        </span>

        <div className="flex items-start gap-x-5">
          <div className="flex min-w-0 flex-1 flex-col gap-4 md:gap-6 lg:gap-8">
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
