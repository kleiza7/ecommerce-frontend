import { useSearchParams } from "react-router-dom";
import { SwapVertIcon, TuneIcon } from "../../../assets/icons";
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
  openProductsSortPortal,
  openProductsFilterPortal,
}: {
  selectedCategoryName?: string;
  totalCount: number;
  openProductsSortPortal: () => void;
  openProductsFilterPortal: () => void;
}) => {
  const [params, setSearchParams] = useSearchParams();

  const handleSortChange = (value: string) => {
    const nextParams = new URLSearchParams(params);

    if (value === "recommended") {
      nextParams.delete("sortBy");
    } else {
      nextParams.set("sortBy", value);
    }

    setSearchParams(nextParams);
  };

  const selectedValue = params.get("sortBy") ?? "recommended";
  const formattedTotalCount = formatProductCount(totalCount);

  const selectedSortLabel =
    SORT_OPTIONS.find((option) => option.value === selectedValue)?.label ??
    "Recommended";

  return (
    <div className="flex flex-col items-center justify-center md:flex-row md:justify-between">
      <div className="flex flex-col items-center gap-x-2 py-2 md:flex-row md:py-0">
        <span className="text-s16-l24 md:text-s18-l28 text-text-primary font-medium">
          {selectedCategoryName ?? "Products"}
        </span>

        <span className="text-s12-l16 md:text-s14-l20 text-gray-8 font-medium md:font-normal">
          {formattedTotalCount} Products
        </span>
      </div>

      <div className="border-gray-2 flex h-[42px] w-full items-center border-y md:hidden">
        <button
          onClick={openProductsSortPortal}
          className="flex h-full flex-1 items-center justify-center gap-x-2"
        >
          <SwapVertIcon className="fill-orange h-5 w-5" />
          <span className="text-s14-l20 text-text-primary font-medium">
            {selectedSortLabel}
          </span>
        </button>

        <div className="bg-gray-2 h-full w-px" />

        <button
          onClick={openProductsFilterPortal}
          className="flex h-full flex-1 items-center justify-center gap-x-2"
        >
          <TuneIcon className="fill-orange h-5 w-5" />
          <span className="text-s14-l20 text-text-primary font-medium">
            Filter
          </span>
        </button>
      </div>

      <GenericSelect
        value={selectedValue}
        options={SORT_OPTIONS}
        onChange={handleSortChange}
        className="hover:border-orange hidden h-8 w-[220px] rounded-full md:flex"
        triggerIcon={<SwapVertIcon className="fill-orange h-5 w-5" />}
      />
    </div>
  );
};

export default ProductListHeader;
