import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { ReqAuthGetAllSellersResponse } from "../../../../api/responses/ReqAuthGetAllSellersResponse.model";
import type { ReqBrandsGetAllResponse } from "../../../../api/responses/ReqBrandsGetAllResponse.model";
import type { ReqCategoriesGetAllResponse } from "../../../../api/responses/ReqCategoriesGetAllResponse.model";
import { CloseIcon, KeyboardArrowUpIcon } from "../../../../assets/icons";
import { GenericDrawer } from "../../../../shared/components/GenericDrawer";
import {
  BUTTON_PRIMARY,
  BUTTON_SIZE_LARGE,
} from "../../../../shared/constants/CommonTailwindClasses.constants";
import { customTwMerge } from "../../../../shared/utils/Tailwind.util";
import BrandsSelectionDrawer from "./components/BrandsSelectionDrawer/BrandsSelectionDrawer";
import CategorySelectionDrawer from "./components/CategorySelectionDrawer/CategorySelectionDrawer";
import SellersSelectionDrawer from "./components/SellersSelectionDrawer/SellersSelectionDrawer";

/* =======================
   TYPES
======================= */

type FiltersState = {
  category: ReqCategoriesGetAllResponse[number] | null;
  brands: ReqBrandsGetAllResponse;
  sellers: ReqAuthGetAllSellersResponse;
};

type AppliedFilter = {
  key: "category" | "brand" | "seller";
  label: string;
  value: string;
};

/* =======================
   COMPONENT
======================= */

const ProductsFilterDrawer = ({
  open,
  setOpen,
  categories,
  brands,
  sellers,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  categories: ReqCategoriesGetAllResponse;
  brands: ReqBrandsGetAllResponse;
  sellers: ReqAuthGetAllSellersResponse;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  /* drawer open states */
  const [isCategorySelectionDrawerOpen, setIsCategorySelectionDrawerOpen] =
    useState(false);
  const [isBrandsSelectionDrawerOpen, setIsBrandsSelectionDrawerOpen] =
    useState(false);
  const [isSellersSelectionDrawerOpen, setIsSellersSelectionDrawerOpen] =
    useState(false);

  /* =======================
     INITIAL FILTERS
  ======================= */

  const initialFilters: FiltersState = useMemo(() => {
    let selectedCategory: FiltersState["category"] = null;

    const categorySlug = searchParams.get("category");
    if (categorySlug) {
      selectedCategory =
        categories.find((category) => category.slug === categorySlug) ?? null;
    }

    const brandSlugs = searchParams.get("brands")?.split(",") ?? [];
    const selectedBrands = brands.filter((brand) =>
      brandSlugs.includes(brand.slug),
    );

    const sellerIds = searchParams.get("sellers")?.split(",").map(Number) ?? [];
    const selectedSellers = sellers.filter((seller) =>
      sellerIds.includes(seller.id),
    );

    return {
      category: selectedCategory,
      brands: selectedBrands,
      sellers: selectedSellers,
    };
  }, [searchParams, categories, brands, sellers]);

  /* =======================
     SINGLE SOURCE OF TRUTH
  ======================= */

  const [filters, setFilters] = useState<FiltersState>(initialFilters);

  /* =======================
     HANDLERS
  ======================= */

  const onCategorySelected = (
    category: ReqCategoriesGetAllResponse[number],
  ) => {
    setFilters((prev) => ({ ...prev, category }));
  };

  const onBrandsSelected = (selectedBrands: ReqBrandsGetAllResponse) => {
    setFilters((prev) => ({ ...prev, brands: selectedBrands }));
  };

  const onSellersSelected = (selectedSellers: ReqAuthGetAllSellersResponse) => {
    setFilters((prev) => ({ ...prev, sellers: selectedSellers }));
  };

  /* =======================
     APPLIED FILTERS
  ======================= */

  const appliedFilters: AppliedFilter[] = useMemo(() => {
    const result: AppliedFilter[] = [];

    if (filters.category) {
      result.push({
        key: "category",
        label: filters.category.name,
        value: filters.category.slug,
      });
    }

    filters.brands.forEach((brand) => {
      result.push({
        key: "brand",
        label: brand.name,
        value: brand.slug,
      });
    });

    filters.sellers.forEach((seller) => {
      result.push({
        key: "seller",
        label: seller.name,
        value: String(seller.id),
      });
    });

    return result;
  }, [filters]);

  /* =======================
     REMOVE FILTER
  ======================= */

  const removeAppliedFilter = (filter: AppliedFilter) => {
    setFilters((prev) => {
      switch (filter.key) {
        case "category": {
          return { ...prev, category: null };
        }
        case "brand": {
          return {
            ...prev,
            brands: prev.brands.filter((brand) => brand.slug !== filter.value),
          };
        }
        case "seller": {
          return {
            ...prev,
            sellers: prev.sellers.filter(
              (seller) => seller.id !== Number(filter.value),
            ),
          };
        }
      }
    });
  };

  /* =======================
     APPLY TO URL
  ======================= */

  const applyFiltersToParams = () => {
    const params = new URLSearchParams();

    if (filters.category) {
      params.set("category", filters.category.slug);
    }

    if (filters.brands.length > 0) {
      params.set("brands", filters.brands.map((brand) => brand.slug).join(","));
    }

    if (filters.sellers.length > 0) {
      params.set(
        "sellers",
        filters.sellers.map((seller) => String(seller.id)).join(","),
      );
    }

    setSearchParams(params);
    setOpen(false);
  };

  /* =======================
     RENDER
  ======================= */

  return (
    <>
      <GenericDrawer
        open={open}
        onOpenChange={setOpen}
        side="bottom"
        className="h-svh"
      >
        <div className="bg-gray-3 flex h-full flex-col gap-y-3">
          <div className="border-gray-2 bg-surface-primary flex items-center justify-between border-b px-4 py-3">
            <span className="text-s16-l24 text-text-primary font-medium">
              Filter
            </span>
          </div>

          {appliedFilters.length > 0 && (
            <div className="bg-surface-primary border-gray-2 flex flex-col gap-2 border-y p-4">
              <span className="text-s14-l20 text-text-primary font-medium">
                Applied Filters
              </span>

              <div className="flex flex-wrap gap-2">
                {appliedFilters.map((filter) => (
                  <button
                    key={`${filter.key}-${filter.value}`}
                    onClick={() => removeAppliedFilter(filter)}
                    className="border-orange flex items-center gap-1 rounded-full border px-3 py-1"
                  >
                    <span className="text-text-primary text-s12-l16">
                      {filter.label}
                    </span>
                    <CloseIcon className="fill-orange h-4 w-4" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="border-gray-2 border-y">
            <button
              type="button"
              onClick={() => setIsCategorySelectionDrawerOpen(true)}
              className="bg-surface-primary flex w-full items-center justify-between px-4 py-4"
            >
              <span className="text-s14-l20 text-text-primary">Category</span>
              <KeyboardArrowUpIcon className="fill-orange h-6 w-6 rotate-90" />
            </button>

            <div className="bg-gray-2 h-px" />

            <button
              type="button"
              onClick={() => setIsBrandsSelectionDrawerOpen(true)}
              className="bg-surface-primary flex w-full items-center justify-between px-4 py-4"
            >
              <span className="text-s14-l20 text-text-primary">Brand</span>
              <KeyboardArrowUpIcon className="fill-orange h-6 w-6 rotate-90" />
            </button>

            <div className="bg-gray-2 h-px" />

            <button
              type="button"
              onClick={() => setIsSellersSelectionDrawerOpen(true)}
              className="bg-surface-primary flex w-full items-center justify-between px-4 py-4"
            >
              <span className="text-s14-l20 text-text-primary">Seller</span>
              <KeyboardArrowUpIcon className="fill-orange h-6 w-6 rotate-90" />
            </button>
          </div>

          <div className="border-gray-2 mt-auto border-t p-2.5">
            <button
              type="button"
              onClick={applyFiltersToParams}
              className={customTwMerge(
                BUTTON_PRIMARY,
                BUTTON_SIZE_LARGE,
                "w-full rounded-sm",
              )}
            >
              Show All Results
            </button>
          </div>
        </div>
      </GenericDrawer>

      <CategorySelectionDrawer
        open={isCategorySelectionDrawerOpen}
        setOpen={setIsCategorySelectionDrawerOpen}
        initialSelectedCategory={filters.category}
        onCategorySelected={onCategorySelected}
      />

      <BrandsSelectionDrawer
        open={isBrandsSelectionDrawerOpen}
        setOpen={setIsBrandsSelectionDrawerOpen}
        initialSelectedBrands={filters.brands}
        onBrandsSelected={onBrandsSelected}
      />

      <SellersSelectionDrawer
        open={isSellersSelectionDrawerOpen}
        setOpen={setIsSellersSelectionDrawerOpen}
        initialSelectedSellers={filters.sellers}
        onSellersSelected={onSellersSelected}
      />
    </>
  );
};

export default ProductsFilterDrawer;
