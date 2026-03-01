import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ORDER_STATUS } from "../../api/enums/OrderStatus.enum";
import {
  CalendarIcon,
  CloseIcon,
  PackageIcon,
  SearchIcon,
} from "../../assets/icons";
import { useCurrenciesGetAll } from "../../hooks/useCurrenciesGetAll";
import { useOrdersGetOrdersListByUser } from "../../hooks/useOrdersGetOrdersListByUser";
import GenericSelect from "../../shared/components/GenericSelect";
import {
  BUTTON_PRIMARY,
  BUTTON_SIZE_X_LARGE,
  INPUT_BASE,
} from "../../shared/constants/CommonTailwindClasses.constants";
import { ORDER_STATUS_TEXT_PAIRS } from "../../shared/constants/Order.constants";
import { ROUTES } from "../../shared/constants/Routes.constants";
import { customTwMerge } from "../../shared/utils/Tailwind.util";
import OrderCard from "./components/OrderCard";
import OrderCardSkeleton from "./components/OrderCardSkeleton";

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

  const statusOptions = useMemo(() => {
    const baseOptions: { label: string; value: ORDER_STATUS | "ALL" }[] = [
      { label: "All Orders", value: "ALL" },
      ...Object.values(ORDER_STATUS).map((status) => ({
        label: ORDER_STATUS_TEXT_PAIRS[status],
        value: status,
      })),
    ];

    return baseOptions.map((option) => {
      const count =
        option.value === "ALL"
          ? orders.length
          : orders.filter((order) => order.status === option.value).length;

      return {
        label: option.label,
        value: option.value,
        count,
      };
    });
  }, [orders]);

  const currencyMap = useMemo(() => {
    const map = new Map<number, string>();

    for (const currency of currencies) {
      map.set(currency.id, currency.code);
    }

    return map;
  }, [currencies]);

  return (
    <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-3 p-3 lg:gap-8 lg:p-10">
      <span className="text-s32-l40 text-text-primary font-semibold">
        My Orders
      </span>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-x-4">
        <div className="relative w-full">
          <SearchIcon className="fill-text-disabled absolute top-1/2 left-3 h-6 w-6 -translate-y-1/2" />

          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search product name"
            className={customTwMerge(INPUT_BASE, "w-full px-10 shadow-sm")}
          />

          {searchText && (
            <button
              type="button"
              onClick={() => setSearchText("")}
              className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 cursor-pointer"
            >
              <CloseIcon className="fill-text-muted h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex w-full gap-3 lg:w-auto">
          <GenericSelect<ORDER_STATUS | "ALL">
            value={selectedStatus}
            options={statusOptions.map((opt) => ({
              label: `${opt.label} (${opt.count})`,
              value: opt.value,
            }))}
            onChange={setSelectedStatus}
            className="w-1/2 shadow-sm lg:hidden"
          />

          <GenericSelect<DATE_FILTER>
            value={dateFilter}
            options={DATE_FILTER_OPTIONS}
            onChange={setDateFilter}
            className="w-1/2 shadow-sm lg:w-[200px]"
            triggerIcon={
              <CalendarIcon className="fill-text-disabled h-5 w-5" />
            }
          />
        </div>
      </div>

      <div className="border-border-secondary hidden items-center gap-6 border-b lg:flex">
        {statusOptions.map((option) => {
          const isSelected = selectedStatus === option.value;

          return (
            <button
              key={option.value}
              onClick={() => setSelectedStatus(option.value)}
              className={`text-s14-l20 flex cursor-pointer items-center gap-x-2 border-b-2 px-2 pt-3 pb-2 ${
                isSelected
                  ? "text-primary border-primary"
                  : "text-text-muted border-transparent"
              }`}
            >
              {option.label}

              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full ${
                  isSelected ? "bg-primary/10" : "bg-surface-secondary"
                }`}
              >
                <span
                  className={`text-s12-l16 font-medium ${
                    isSelected ? "text-primary" : "text-text-muted"
                  }`}
                >
                  {option.count}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {isLoading ? (
        <div className="flex min-h-0 flex-1 flex-col gap-y-3 overflow-y-auto lg:gap-y-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <OrderCardSkeleton key={index} />
          ))}
        </div>
      ) : filteredOrders.length > 0 ? (
        <div className="flex min-h-0 flex-1 flex-col gap-y-3 overflow-y-auto lg:gap-y-6">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              currencyCode={currencyMap.get(order.currencyId) ?? ""}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <PackageIcon className="fill-text-disabled h-16 w-16" />

          <div className="text-text-disabled text-s16-l24 font-semibold">
            No orders found
          </div>

          <button
            onClick={() => navigate(ROUTES.PRODUCTS_PAGE.build())}
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
