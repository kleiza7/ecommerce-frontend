import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ORDER_STATUS } from "../api/enums/OrderStatus.enum";
import { CloseIcon, PackageIcon, SearchIcon } from "../assets/icons";
import { useCurrenciesGetAll } from "../hooks/useCurrenciesGetAll";
import { useOrdersGetOrdersListByUser } from "../hooks/useOrdersGetOrdersListByUser";
import GenericSelect from "../shared/components/GenericSelect";
import {
  BUTTON_PRIMARY,
  BUTTON_SIZE_SMALL,
  BUTTON_SIZE_X_LARGE,
  INPUT_BASE,
} from "../shared/constants/CommonTailwindClasses.constants";
import { ORDER_STATUS_TEXT_PAIRS } from "../shared/constants/Order.constants";
import { customTwMerge } from "../shared/utils/Tailwind.util";
import { useUserStore } from "../stores/UserStore";

const DATE_FILTER = {
  ALL: "ALL",
  LAST_30_DAYS: "LAST_30_DAYS",
  LAST_6_MONTHS: "LAST_6_MONTHS",
  LAST_1_YEAR: "LAST_1_YEAR",
} as const;

type DATE_FILTER = (typeof DATE_FILTER)[keyof typeof DATE_FILTER];

const DATE_FILTER_OPTIONS: { label: string; value: DATE_FILTER }[] = [
  { label: "All Dates", value: DATE_FILTER.ALL },
  { label: "Last 30 Days", value: DATE_FILTER.LAST_30_DAYS },
  { label: "Last 6 Months", value: DATE_FILTER.LAST_6_MONTHS },
  { label: "Last 1 Year", value: DATE_FILTER.LAST_1_YEAR },
];

const MyOrdersPage = () => {
  const navigate = useNavigate();
  const { data: orders = [], isLoading } = useOrdersGetOrdersListByUser();
  const { data: currencies = [] } = useCurrenciesGetAll();
  const userName = useUserStore((state) => state.user?.name);

  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<ORDER_STATUS | "ALL">(
    "ALL",
  );
  const [dateFilter, setDateFilter] = useState<DATE_FILTER>(DATE_FILTER.ALL);

  const filteredOrders = useMemo(() => {
    let result = [...orders];

    if (searchText.trim()) {
      const lowerCasedSearchText = searchText.toLowerCase();
      result = result.filter((order) =>
        order.items.some((item) =>
          item.product.name.toLowerCase().includes(lowerCasedSearchText),
        ),
      );
    }

    if (selectedStatus !== "ALL") {
      result = result.filter((order) => order.status === selectedStatus);
    }

    if (dateFilter !== DATE_FILTER.ALL) {
      const now = new Date();

      const dateLimit =
        dateFilter === DATE_FILTER.LAST_30_DAYS
          ? new Date(new Date().setDate(now.getDate() - 30))
          : dateFilter === DATE_FILTER.LAST_6_MONTHS
            ? new Date(new Date().setMonth(now.getMonth() - 6))
            : new Date(new Date().setFullYear(now.getFullYear() - 1));

      result = result.filter((order) => new Date(order.createdAt) >= dateLimit);
    }

    return result;
  }, [orders, searchText, selectedStatus, dateFilter]);

  const currencyMap = useMemo(() => {
    const map = new Map<number, string>();

    for (const currency of currencies) {
      map.set(currency.id, currency.code);
    }

    return map;
  }, [currencies]);

  // TODO: fix loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-full w-full flex-col gap-5 py-5">
      <div className="border-gray-1 flex items-center justify-between rounded-md border px-5 py-4">
        <span className="text-s18-l28 text-text-primary">My Orders</span>

        <div className="relative w-[330px]">
          <SearchIcon className="fill-orange absolute top-1/2 left-3 h-6 w-6 -translate-y-1/2" />

          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search product name"
            className={customTwMerge(
              INPUT_BASE,
              "bg-gray-3 placeholder:text-gray-6 w-full border-none px-10",
            )}
          />

          {searchText && (
            <button
              type="button"
              onClick={() => setSearchText("")}
              className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2"
            >
              <CloseIcon className="fill-text-primary h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setSelectedStatus("ALL")}
          className={`text-s14-l20 h-8 rounded-full border px-4 ${
            selectedStatus === "ALL"
              ? "border-orange text-orange"
              : "text-gray-9"
          }`}
        >
          All
        </button>

        {Object.values(ORDER_STATUS).map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`text-s14-l20 h-8 rounded-full border px-4 ${
              selectedStatus === status
                ? "border-orange text-orange"
                : "text-gray-9"
            }`}
          >
            {ORDER_STATUS_TEXT_PAIRS[status]}
          </button>
        ))}

        <div className="ml-auto w-[180px]">
          <GenericSelect<DATE_FILTER>
            value={dateFilter}
            options={DATE_FILTER_OPTIONS}
            onChange={setDateFilter}
          />
        </div>
      </div>

      {filteredOrders.length > 0 ? (
        <div className="flex min-h-0 flex-1 flex-col gap-y-5 overflow-y-auto">
          {filteredOrders.map((order) => (
            <div key={order.id} className="border-gray-1 rounded-lg border">
              <div className="border-gray-1 bg-gray-3 flex items-center gap-x-5 border-b px-5 py-3">
                <div className="text-text-primary flex flex-1 gap-x-5">
                  <div className="text-s14-l20 flex-1">
                    <div className="font-medium">Order Date</div>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>

                  <div className="text-s14-l20 flex-1">
                    <div className="font-medium">Order Summary</div>
                    {order.items.length} Items
                  </div>

                  <div className="text-s14-l20 flex-1">
                    <div className="font-medium">Recipient</div>
                    {userName ?? ""}
                  </div>

                  <div className="text-s14-l20 flex-1">
                    <div className="font-medium">Total</div>
                    <span className="text-orange">
                      {order.totalPrice.toFixed(2)}{" "}
                      {currencyMap.get(order.currencyId) ?? ""}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/order-detail/${order.id}`)}
                  className={customTwMerge(
                    BUTTON_PRIMARY,
                    BUTTON_SIZE_SMALL,
                    "px-6",
                  )}
                >
                  Details
                </button>
              </div>

              <div className="p-5">
                <div className="border-gray-1 flex items-center gap-x-6 rounded-md border px-5 py-3">
                  <div className="text-s14-l20 w-[30%] shrink-0 font-semibold">
                    {ORDER_STATUS_TEXT_PAIRS[order.status]}
                  </div>

                  <div className="flex-1 overflow-x-auto">
                    <div className="flex min-w-max gap-x-5">
                      {order.items.map((item) => {
                        const img = item.product.images.find(
                          (img) => img.isPrimary,
                        );

                        if (!img) {
                          return null;
                        }

                        return (
                          <img
                            key={item.id}
                            src={img.thumbUrl}
                            alt={item.product.name}
                            onClick={() =>
                              navigate(`/product-detail/${item.product.id}`)
                            }
                            className="h-20 w-20 cursor-pointer rounded object-cover"
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <PackageIcon className="fill-gray-2 h-16 w-16" />

          <div className="text-gray-2 text-s16-l24 font-semibold">
            No orders found
          </div>

          <button
            onClick={() => navigate("/products")}
            className={customTwMerge(BUTTON_PRIMARY, BUTTON_SIZE_X_LARGE)}
          >
            Start Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;
