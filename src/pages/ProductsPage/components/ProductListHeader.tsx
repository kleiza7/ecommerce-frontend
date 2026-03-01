import { SwapVertIcon, TuneIcon } from "../../../assets/icons";
import { useProductsNavigation } from "../../../hooks/useProductsNavigation";
import GenericSelect from "../../../shared/components/GenericSelect";

const SORT_OPTIONS: { label: string; value: string }[] = [
  { label: "Recommended", value: "recommended" },
  { label: "Lowest Price", value: "price-asc" },
  { label: "Highest Price", value: "price-desc" },
  { label: "Newest", value: "createdAt-desc" },
];

const formatProductCount = (count: number): string => {
  switch (true) {
    case count < 100:
      return `${count}`;

    case count < 1_000: {
      const base = Math.floor(count / 100) * 100;
      return `${base}+`;
    }

    case count < 10_000: {
      const base = Math.floor(count / 1_000) * 1_000;
      return `${base.toLocaleString()}+`;
    }

    case count < 100_000: {
      const base = Math.floor(count / 10_000) * 10_000;
      return `${base.toLocaleString()}+`;
    }

    default: {
      const base = Math.floor(count / 100_000) * 100_000;
      return `${base.toLocaleString()}+`;
    }
  }
};

const ProductListHeader = ({
  selectedCategoryName,
  totalCount,
  openProductsFilterDrawer,
  openProductsSortDrawer,
}: {
  selectedCategoryName?: string;
  totalCount: number;
  openProductsFilterDrawer: () => void;
  openProductsSortDrawer: () => void;
}) => {
  const { sortBy, goToProductsPage } = useProductsNavigation();

  const handleSortChange = (value: string) => {
    goToProductsPage({
      sortBy: value === "recommended" ? undefined : value,
    });
  };

  const selectedValue = sortBy ?? "recommended";
  const formattedTotalCount = formatProductCount(totalCount);

  const selectedSortLabel =
    SORT_OPTIONS.find((option) => option.value === selectedValue)?.label ??
    "Recommended";

  return (
    <div className="flex flex-col items-center md:flex-row md:items-end md:justify-between">
      <div className="flex flex-col items-center gap-x-2 py-2 md:items-start md:py-0">
        <span className="text-s16-l24 md:text-s24-l32 text-text-primary font-medium">
          {selectedCategoryName ?? "Products"}
        </span>

        <span className="text-s12-l16 md:text-s14-l20 text-text-muted font-medium md:font-normal">
          {formattedTotalCount} Products
        </span>
      </div>

      <div className="border-border-primary flex h-[42px] w-full items-center border-y md:hidden">
        <button
          onClick={openProductsFilterDrawer}
          className="flex h-full flex-1 items-center justify-center gap-x-2"
        >
          <TuneIcon className="fill-primary h-5 w-5" />
          <span className="text-s14-l20 text-text-primary font-medium">
            Filter
          </span>
        </button>

        <div className="bg-surface-secondary h-full w-px" />

        <button
          onClick={openProductsSortDrawer}
          className="flex h-full flex-1 items-center justify-center gap-x-2"
        >
          <SwapVertIcon className="fill-primary h-5 w-5" />
          <span className="text-s14-l20 text-text-primary font-medium">
            {selectedSortLabel}
          </span>
        </button>
      </div>

      <GenericSelect
        value={selectedValue}
        options={SORT_OPTIONS}
        onChange={handleSortChange}
        className="hover:border-primary hidden h-9 w-[200px] md:flex"
        triggerIcon={<SwapVertIcon className="fill-primary h-5 w-5" />}
      />
    </div>
  );
};

export default ProductListHeader;
