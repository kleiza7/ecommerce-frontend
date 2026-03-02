import { useMemo, useState } from "react";
import type { ReqAuthGetAllSellersResponse } from "../../../../api/responses/ReqAuthGetAllSellersResponse.model";
import type { ReqBrandsGetAllResponse } from "../../../../api/responses/ReqBrandsGetAllResponse.model";
import type { ReqCategoriesGetAllResponse } from "../../../../api/responses/ReqCategoriesGetAllResponse.model";
import { CloseIcon, KeyboardArrowUpIcon } from "../../../../assets/icons";
import { useProductsNavigation } from "../../../../hooks/useProductsNavigation";
import { GenericDrawer } from "../../../../shared/components/GenericDrawer";
import {
  BUTTON_PRIMARY,
  BUTTON_SIZE_LARGE,
} from "../../../../shared/constants/CommonTailwindClasses.constants";
import { customTwMerge } from "../../../../shared/utils/Tailwind.util";
import BrandsSelectionDrawer from "./components/BrandsSelectionDrawer/BrandsSelectionDrawer";
import CategorySelectionDrawer from "./components/CategorySelectionDrawer/CategorySelectionDrawer";
import SellersSelectionDrawer from "./components/SellersSelectionDrawer/SellersSelectionDrawer";

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
  const {
    selectedCategorySlug,
    selectedBrandSlugs,
    selectedSellerIds,
    goToProductsPage,
  } = useProductsNavigation();

  const [isCategorySelectionDrawerOpen, setIsCategorySelectionDrawerOpen] =
    useState(false);
  const [isBrandsSelectionDrawerOpen, setIsBrandsSelectionDrawerOpen] =
    useState(false);
  const [isSellersSelectionDrawerOpen, setIsSellersSelectionDrawerOpen] =
    useState(false);

  const [filters, setFilters] = useState<FiltersState>(() => {
    let selectedCategory: FiltersState["category"] = null;

    if (selectedCategorySlug) {
      selectedCategory =
        categories.find((category) => category.slug === selectedCategorySlug) ??
        null;
    }

    const selectedBrands = brands.filter((brand) =>
      selectedBrandSlugs.includes(brand.slug),
    );

    const selectedSellers = sellers.filter((seller) =>
      selectedSellerIds.includes(seller.id),
    );

    return {
      category: selectedCategory,
      brands: selectedBrands,
      sellers: selectedSellers,
    };
  });

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

  const clearAllFilters = () => {
    setFilters({
      category: null,
      brands: [],
      sellers: [],
    });
  };

  const applyFiltersToParams = () => {
    goToProductsPage({
      categorySlug: filters.category?.slug ?? null,
      brandSlugs: filters.brands.map((brand) => brand.slug),
      sellerIds: filters.sellers.map((seller) => seller.id),
    });

    setOpen(false);
  };

  return (
    <>
      <GenericDrawer
        open={open}
        onOpenChange={setOpen}
        side="bottom"
        className="h-svh"
      >
        <div className="bg-surface-secondary flex h-full flex-col gap-y-3">
          <div className="border-border-primary bg-surface-primary flex items-center justify-between border-b px-4 py-3">
            <span className="text-s16-l24 text-text-primary font-medium">
              Filter
            </span>
          </div>

          {appliedFilters.length > 0 && (
            <div className="bg-surface-primary border-border-primary flex flex-col gap-2 border-y p-4">
              <div className="flex items-center justify-between">
                <span className="text-s14-l20 text-text-primary font-medium">
                  Applied Filters
                </span>

                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="text-s12-l16 text-primary cursor-pointer font-medium"
                >
                  Clear all
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {appliedFilters.map((filter) => (
                  <button
                    key={`${filter.key}-${filter.value}`}
                    onClick={() => removeAppliedFilter(filter)}
                    className="border-status-info-secondary bg-status-info-muted flex items-center gap-1 rounded-full border px-3 py-1"
                  >
                    <span className="text-status-info-primary text-s12-l16">
                      {filter.label}
                    </span>
                    <CloseIcon className="fill-text-muted h-4 w-4" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="border-border-primary border-y">
            <button
              type="button"
              onClick={() => setIsCategorySelectionDrawerOpen(true)}
              className="bg-surface-primary flex w-full items-center justify-between p-4"
            >
              <span className="text-s14-l20 text-text-primary">Category</span>
              <KeyboardArrowUpIcon className="fill-primary h-6 w-6 rotate-90" />
            </button>

            <div className="bg-surface-secondary h-px" />

            <button
              type="button"
              onClick={() => setIsBrandsSelectionDrawerOpen(true)}
              className="bg-surface-primary flex w-full items-center justify-between p-4"
            >
              <span className="text-s14-l20 text-text-primary">Brand</span>
              <KeyboardArrowUpIcon className="fill-primary h-6 w-6 rotate-90" />
            </button>

            <div className="bg-surface-secondary h-px" />

            <button
              type="button"
              onClick={() => setIsSellersSelectionDrawerOpen(true)}
              className="bg-surface-primary flex w-full items-center justify-between p-4"
            >
              <span className="text-s14-l20 text-text-primary">Seller</span>
              <KeyboardArrowUpIcon className="fill-primary h-6 w-6 rotate-90" />
            </button>
          </div>

          <div className="border-border-primary mt-auto border-t p-2.5">
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
