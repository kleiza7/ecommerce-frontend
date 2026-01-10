import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "../assets/icons";
import { useAuthGetAllSellers } from "../hooks/useAuthGetAllSellers";
import { useBrandsGetAll } from "../hooks/useBrandsGetAll";
import { useOrdersGetById } from "../hooks/useOrdersGetById";
import { ORDER_STATUS_TEXT_PAIRS } from "../shared/constants/Order.constants";

const OrderDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const orderId = Number(id);

  const { data: order, isLoading } = useOrdersGetById(orderId);
  const { data: sellers = [] } = useAuthGetAllSellers();
  const { data: brands = [] } = useBrandsGetAll();

  const groupedBySeller = useMemo(() => {
    if (!order) return [];

    const map = new Map<number, typeof order.items>();

    order.items.forEach((item) => {
      const sellerId = item.product.sellerId;
      if (!map.has(sellerId)) {
        map.set(sellerId, []);
      }
      map.get(sellerId)!.push(item);
    });

    return Array.from(map.entries()).map(([sellerId, items]) => ({
      seller: sellers.find((s) => s.id === sellerId),
      items,
    }));
  }, [order, sellers]);

  // TODO: loading state
  if (isLoading || !order) return <div>Loading...</div>;

  return (
    <div className="flex h-full w-full flex-col gap-5 py-5">
      <div className="flex items-center gap-x-2">
        <button
          type="button"
          onClick={() => navigate("/my-orders")}
          className="flex items-center gap-x-2 text-sm"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          All Orders
        </button>
      </div>

      <div className="border-gray-1 rounded-md border px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="text-s16-l24 font-semibold">Order Summary:</div>

          <div className="text-s12-l16 flex gap-x-20">
            <div>
              <div className="font-medium">Order Date</div>
              <div>{new Date(order.createdAt).toLocaleDateString()}</div>
            </div>

            <div>
              <div className="font-medium">Order Summary</div>
              <div>{order.items.length} items</div>
            </div>

            <div>
              <div className="font-medium">Order Status</div>
              <div>{ORDER_STATUS_TEXT_PAIRS[order.status]}</div>
            </div>
          </div>
        </div>
      </div>

      {groupedBySeller.map(({ seller, items }) => (
        <div
          key={seller?.id}
          className="border-gray-1 flex flex-col gap-y-4 rounded-md border p-4"
        >
          <div className="text-s14-l20 bg-gray-3 flex items-center rounded-md px-4 py-1.5">
            <span>Seller:&nbsp;</span>
            <span className="font-medium">{seller?.name ?? "-"}</span>
          </div>

          <div className="overflow-x-auto">
            <div className="flex min-w-max gap-x-5">
              {items.map((item) => {
                const img = item.product.images.find((i) => i.isPrimary);
                const brand = brands.find((b) => b.id === item.product.brandId);

                if (!img) return null;

                return (
                  <div
                    key={item.id}
                    className="border-gray-1 flex w-[470px] shrink-0 gap-x-4 rounded-md border p-3"
                  >
                    <img
                      src={img.thumbUrl}
                      alt={item.product.name}
                      className="h-[110px] rounded object-cover"
                    />
                    <div className="flex flex-col py-2">
                      {brand && (
                        <div className="text-s14-l20 text-text-primary">
                          {brand.name}
                        </div>
                      )}

                      <div className="text-s14-l20 text-text-primary">
                        {item.product.name}
                      </div>

                      <div className="text-s14-l20 text-text-primary">
                        Quantity: {item.quantity}
                      </div>

                      <div className="text-s14-l20 text-orange mt-auto font-medium">
                        {item.priceSnapshot.toFixed(2)} TL
                      </div>
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
