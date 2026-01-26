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
import {
  buildCategorySlugMap,
  buildCategoryTree,
} from "../../../../shared/utils/CategoryTree.util";
import { customTwMerge } from "../../../../shared/utils/Tailwind.util";
import BrandsSelectionDrawer from "./components/BrandsSelectionDrawer";
import CategorySelectionDrawer from "./components/CategorySelectionDrawer";
import SellersSelectionDrawer from "./components/SellersSelectionDrawer";

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
  const [searchParams, setSearchParams] = useSearchParams();

  const [isCategorySelectionDrawerOpen, setIsCategorySelectionDrawerOpen] =
    useState(false);
  const [isBrandsSelectionDrawerOpen, setIsBrandsSelectionDrawerOpen] =
    useState(false);
  const [isSellersSelectionDrawerOpen, setIsSellersSelectionDrawerOpen] =
    useState(false);

  const appliedFilters: AppliedFilter[] = useMemo(() => {
    const result: AppliedFilter[] = [];

    const categorySlug = searchParams.get("category");
    if (categorySlug) {
      const tree = buildCategoryTree(categories);
      const slugMap = buildCategorySlugMap(tree);
      const node = slugMap.get(categorySlug);

      if (node) {
        result.push({
          key: "category",
          label: node.name,
          value: categorySlug,
        });
      }
    }

    const brandSlugs = searchParams.get("brands")?.split(",") ?? [];
    brandSlugs.forEach((slug) => {
      const brand = brands.find((b) => b.slug === slug);
      if (brand) {
        result.push({
          key: "brand",
          label: brand.name,
          value: slug,
        });
      }
    });

    const sellerIds = searchParams.get("sellers")?.split(",").map(Number) ?? [];
    sellerIds.forEach((id) => {
      const seller = sellers.find((s) => s.id === id);
      if (seller) {
        result.push({
          key: "seller",
          label: seller.name,
          value: String(id),
        });
      }
    });

    return result;
  }, [searchParams, categories, brands, sellers]);

  const removeAppliedFilter = (filter: AppliedFilter) => {
    const params = new URLSearchParams(searchParams);

    switch (filter.key) {
      case "category": {
        params.delete("category");
        break;
      }

      case "brand": {
        const next =
          params
            .get("brands")
            ?.split(",")
            .filter((slug) => slug !== filter.value) ?? [];

        if (next.length === 0) {
          params.delete("brands");
        } else {
          params.set("brands", next.join(","));
        }
        break;
      }

      case "seller": {
        const next =
          params
            .get("sellers")
            ?.split(",")
            .filter((id) => id !== filter.value) ?? [];

        if (next.length === 0) {
          params.delete("sellers");
        } else {
          params.set("sellers", next.join(","));
        }
        break;
      }
    }

    setSearchParams(params);
  };

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
        categories={categories}
      />

      <BrandsSelectionDrawer
        open={isBrandsSelectionDrawerOpen}
        setOpen={setIsBrandsSelectionDrawerOpen}
        brands={brands}
      />

      <SellersSelectionDrawer
        open={isSellersSelectionDrawerOpen}
        setOpen={setIsSellersSelectionDrawerOpen}
        sellers={sellers}
      />
    </>
  );
};

export default ProductsFilterDrawer;
