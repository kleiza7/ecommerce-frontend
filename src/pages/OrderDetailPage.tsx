import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "../assets/icons";
import { useCurrenciesGetAll } from "../hooks/useCurrenciesGetAll";
import { useOrdersGetById } from "../hooks/useOrdersGetById";
import { ORDER_STATUS_TEXT_PAIRS } from "../shared/constants/Order.constants";

const OrderDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const orderId = Number(id);

  const { data: order, isLoading } = useOrdersGetById(orderId);
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

  // TODO: loading state
  if (isLoading || !order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-3 p-3 md:gap-5 md:px-10 md:py-9">
      <div className="flex items-center gap-x-2">
        <button
          type="button"
          onClick={() => navigate("/my-orders")}
          className="flex cursor-pointer items-center gap-x-2"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          <span className="text-s14-l20 text-text-primary">All Orders</span>
        </button>
      </div>

      <div className="border-gray-1 flex flex-col gap-y-2 rounded-md border px-5 py-4 md:flex-row md:items-center md:justify-between md:gap-y-0">
        <span className="text-s16-l24 font-semibold">Order Summary:</span>

        <div className="flex justify-between md:justify-start md:gap-x-20">
          <div className="flex flex-col">
            <span className="text-s12-l16 font-medium">Order Date</span>
            <span className="text-s12-l16">
              {new Date(order.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-s12-l16 font-medium">Order Summary</span>
            <span className="text-s12-l16">{order.items.length} items</span>
          </div>

          <div className="flex flex-col">
            <span className="text-s12-l16 font-medium">Order Status</span>
            <span className="text-s12-l16">
              {ORDER_STATUS_TEXT_PAIRS[order.status]}
            </span>
          </div>
        </div>
      </div>

      {groupedBySeller.map(({ seller, items }) => (
        <div
          key={seller.id}
          className="border-gray-1 flex flex-col gap-y-4 rounded-md border p-4"
        >
          <div className="text-s14-l20 bg-gray-3 flex items-center rounded-md px-4 py-1.5">
            <span>Seller:&nbsp;</span>
            <span className="font-medium">{seller.name}</span>
          </div>

          <div className="overflow-x-auto">
            <div className="flex min-w-max gap-x-3 md:gap-x-5">
              {items.map((item) => {
                const img = item.product.images.find((img) => img.isPrimary);
                if (!img) return null;

                return (
                  <div
                    key={item.id}
                    className="border-gray-1 flex w-[280px] shrink-0 gap-x-4 rounded-md border p-3 md:w-[360px] 2xl:w-[470px]"
                  >
                    <img
                      src={img.thumbUrl}
                      alt={item.product.name}
                      className="h-[110px] rounded object-cover"
                    />

                    <div className="flex min-w-0 flex-col py-2">
                      <span className="text-s14-l20 text-text-primary truncate">
                        {item.product.brand.name}
                      </span>

                      <span className="text-s14-l20 text-text-primary truncate">
                        {item.product.name}
                      </span>

                      <span className="text-s14-l20 text-text-primary truncate">
                        Quantity: {item.quantity}
                      </span>

                      <span className="text-s14-l20 text-orange mt-auto truncate font-medium">
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
