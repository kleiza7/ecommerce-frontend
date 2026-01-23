import { useSearchParams } from "react-router-dom";
import { SwapVertIcon } from "../../../../../assets/icons";
import GenericSelect from "../../../../../shared/components/GenericSelect";

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
}: {
  selectedCategoryName?: string;
  totalCount: number;
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

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        <span className="text-s18-l28 text-text-primary font-medium">
          {selectedCategoryName ?? "Products"}
        </span>

        <span className="text-s14-l20 text-gray-8">
          {formattedTotalCount} Products
        </span>
      </div>

      <GenericSelect
        value={selectedValue}
        options={SORT_OPTIONS}
        onChange={handleSortChange}
        className="hover:border-orange h-8 w-[220px] rounded-full"
        triggerIcon={<SwapVertIcon className="fill-orange h-5 w-5" />}
      />
    </div>
  );
};

export default ProductListHeader;
