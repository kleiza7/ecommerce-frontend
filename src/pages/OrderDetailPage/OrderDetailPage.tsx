import { isAxiosError } from "axios";
import { useCallback, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon, StoreFrontIcon } from "../../assets/icons";
import { useCurrenciesGetAll } from "../../hooks/useCurrenciesGetAll";
import { useOrdersGetById } from "../../hooks/useOrdersGetById";
import { useProductsNavigation } from "../../hooks/useProductsNavigation";
import OrderStatusLabel from "../../shared/components/OrderStatusLabel";
import {
  BUTTON_PRIMARY,
  BUTTON_SIZE_LARGE,
} from "../../shared/constants/CommonTailwindClasses.constants";
import { ROUTES } from "../../shared/constants/Routes.constants";
import { canCheckoutOrder } from "../../shared/utils/Order.util";
import { customTwMerge } from "../../shared/utils/Tailwind.util";
import OrderDetailPageSkeleton from "./components/OrderDetailPageSkeleton";

const OrderDetailPage = () => {
  const { goToProductsPage } = useProductsNavigation();
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

  const groupedBySeller = useMemo(() => {
    if (!order) return [];

    const map = new Map<number, typeof order.items>();

    order.items.forEach((item) => {
      const sellerId = item.product.seller.id;
      if (!map.has(sellerId)) {
        map.set(sellerId, []);
      }
      map.get(sellerId)!.push(item);
    });

    return Array.from(map.values()).map((items) => ({
      seller: items[0].product.seller,
      items,
    }));
  }, [order]);

  const currencyMap = useMemo(() => {
    const map = new Map<number, string>();
    for (const currency of currencies) {
      map.set(currency.id, currency.code);
    }
    return map;
  }, [currencies]);

  const onSellerClick = useCallback(
    (sellerId: number) => {
      goToProductsPage({
        sellerIds: [sellerId],
        overrideParams: true,
      });
    },
    [goToProductsPage],
  );

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

  if (isLoading) {
    return <OrderDetailPageSkeleton />;
  }

  if (!order) {
    return null;
  }

  return (
    <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-3 p-3 md:gap-8 md:px-10 md:py-8">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(ROUTES.MY_ORDERS_PAGE.build())}
          className="flex cursor-pointer items-center gap-x-2"
        >
          <ArrowLeftIcon className="fill-text-primary h-4 w-4" />
          <span className="text-s14-l20 text-text-primary font-medium">
            All Orders
          </span>
        </button>

        {canCheckoutOrder(order.status) && (
          <button
            onClick={() => navigate(ROUTES.CHECKOUT_PAGE.build(order.id))}
            className={customTwMerge(BUTTON_PRIMARY, BUTTON_SIZE_LARGE, "px-6")}
          >
            Pay Now
          </button>
        )}
      </div>

      <div className="flex items-center gap-x-8">
        <div className="border-border-secondary flex w-full items-start justify-between rounded-md border px-8 py-6">
          <span className="text-s16-l24 text-text-primary font-semibold">
            Order Summary:
          </span>

          <div className="flex flex-col gap-y-4 md:flex-row md:items-start md:gap-x-16 md:gap-y-0">
            <div className="flex flex-col gap-y-1">
              <span className="text-s12-l16 text-text-muted font-medium">
                Order Date
              </span>
              <span className="text-s14-l20 text-text-primary font-medium">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="flex flex-col gap-y-1">
              <span className="text-s12-l16 text-text-muted font-medium">
                Order Summary
              </span>
              <span className="text-s14-l20 text-text-primary font-medium">
                {order.items.length} {order.items.length > 1 ? "Items" : "Item"}
              </span>
            </div>

            <div className="flex flex-col items-start gap-y-1">
              <span className="text-s12-l16 text-text-muted font-medium">
                Order Status
              </span>

              <OrderStatusLabel status={order.status} />
            </div>
          </div>
        </div>
      </div>

      {groupedBySeller.map(({ seller, items }) => (
        <div
          key={seller.id}
          className="border-border-primary flex flex-col overflow-hidden rounded-md border"
        >
          <div className="border-border-primary bg-surface-muted flex items-center gap-x-3 border-b px-5 py-3.5">
            <StoreFrontIcon className="fill-text-disabled h-5 w-5" />

            <div className="flex items-center gap-x-1">
              <span className="text-s14-l20 text-text-primary font-medium">
                SOLD BY
              </span>

              <button
                type="button"
                onClick={() => onSellerClick(seller.id)}
                className="text-s14-l20 text-primary cursor-pointer font-medium hover:underline"
              >
                {seller.name}
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="flex min-w-max gap-x-3 p-6 md:gap-x-6">
              {items.map((item) => {
                const img = item.product.images.find((img) => img.isPrimary);
                if (!img) return null;

                return (
                  <div
                    key={item.id}
                    className="border-border-primary flex w-[280px] shrink-0 gap-x-4 rounded-md border p-4 md:w-[360px] 2xl:w-[470px]"
                  >
                    <img
                      src={img.thumbUrl}
                      alt={item.product.name}
                      className="h-[110px] rounded object-cover"
                    />

                    <div className="flex min-w-0 flex-col py-2">
                      <span className="text-s12-l16 text-text-muted truncate">
                        {item.product.brand.name}
                      </span>

                      <span className="text-s14-l20 text-text-primary font-bold whitespace-normal">
                        {item.product.name}
                      </span>

                      <span className="text-s12-l16 text-text-muted truncate">
                        Quantity: {item.quantity}
                      </span>

                      <span className="text-s20-l28 text-accent mt-auto truncate font-bold">
                        {item.priceSnapshot.toFixed(2)}{" "}
                        {currencyMap.get(item.currencyId) ?? ""}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderDetailPage;
