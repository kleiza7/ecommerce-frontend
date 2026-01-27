import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { ReqAuthGetAllSellersResponse } from "../../../../api/responses/ReqAuthGetAllSellersResponse.model";
import type { ReqBrandsGetAllResponse } from "../../../../api/responses/ReqBrandsGetAllResponse.model";
import type { ReqCategoriesGetAllResponse } from "../../../../api/responses/ReqCategoriesGetAllResponse.model";
import { KeyboardArrowUpIcon } from "../../../../assets/icons";
import GenericCheckbox from "../../../../shared/components/GenericCheckbox";
import { INPUT_BASE } from "../../../../shared/constants/CommonTailwindClasses.constants";
import type { CategoryNode } from "../../../../shared/models/CategoryNode.model";
import {
  buildCategorySlugMap,
  buildCategoryTreeWithMap,
} from "../../../../shared/utils/CategoryTree.util";
import { customTwMerge } from "../../../../shared/utils/Tailwind.util";
import FilterSection from "./components/FilterSection";

const ProductsFilterSidebar = ({
  categories,
  brands,
  sellers,
}: {
  categories: ReqCategoriesGetAllResponse;
  brands: ReqBrandsGetAllResponse;
  sellers: ReqAuthGetAllSellersResponse;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [brandSearch, setBrandSearch] = useState("");
  const [sellerSearch, setSellerSearch] = useState("");

  const selectedCategorySlug = searchParams.get("category");

  const { tree } = useMemo(
    () => buildCategoryTreeWithMap(categories),
    [categories],
  );

  const slugMap = useMemo(() => buildCategorySlugMap(tree), [tree]);

  const visibleCategories: CategoryNode[] = useMemo(() => {
    if (!selectedCategorySlug) return tree;

    const current = slugMap.get(selectedCategorySlug);
    if (!current) return tree;

    if (current.children.length > 0) {
      return current.children;
    }

    if (current.parentId) {
      const parent = categories.find(
        (category) => category.id === current.parentId,
      );
      return parent ? (slugMap.get(parent.slug)?.children ?? tree) : tree;
    }

    return tree;
  }, [selectedCategorySlug, tree, slugMap, categories]);

  const onSelectCategory = (slug: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", slug);
    setSearchParams(params);
  };

  const selectedBrandSlugs = searchParams.get("brands")?.split(",") ?? [];

  const toggleBrand = (slug: string) => {
    const next = selectedBrandSlugs.includes(slug)
      ? selectedBrandSlugs.filter((brandSlug) => brandSlug !== slug)
      : [...selectedBrandSlugs, slug];

    const params = new URLSearchParams(searchParams);

    if (next.length === 0) {
      params.delete("brands");
    } else {
      params.set("brands", next.join(","));
    }

    setSearchParams(params);
  };

  const filteredBrands = useMemo(() => {
    return brands.filter((brand) =>
      brand.name.toLowerCase().includes(brandSearch.toLowerCase()),
    );
  }, [brands, brandSearch]);

  const selectedSellerIds =
    searchParams.get("sellers")?.split(",").map(Number) ?? [];

  const toggleSeller = (id: number) => {
    const next = selectedSellerIds.includes(id)
      ? selectedSellerIds.filter((sellerId) => sellerId !== id)
      : [...selectedSellerIds, id];

    const params = new URLSearchParams(searchParams);

    if (next.length === 0) {
      params.delete("sellers");
    } else {
      params.set("sellers", next.join(","));
    }

    setSearchParams(params);
  };

  const filteredSellers = useMemo(() => {
    return sellers.filter((seller) =>
      seller.name.toLowerCase().includes(sellerSearch.toLowerCase()),
    );
  }, [sellers, sellerSearch]);

  return (
    <aside className="text-text-primary text-s14-l20">
      <FilterSection title="Category" defaultOpen>
        <div className="flex flex-col gap-2 px-[5px]">
          {visibleCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.slug)}
              className="group flex w-full cursor-pointer items-center justify-between"
            >
              <span
                className={customTwMerge(
                  "text-s14-l20 transition-colors",
                  selectedCategorySlug === category.slug
                    ? "text-orange font-semibold"
                    : "text-text-primary group-hover:text-orange",
                )}
              >
                {category.name}
              </span>

              {category.children.length > 0 && (
                <KeyboardArrowUpIcon
                  className={customTwMerge(
                    "h-4 w-4 rotate-90 transition-colors",
                    selectedCategorySlug === category.slug
                      ? "fill-orange"
                      : "fill-gray-7 group-hover:fill-orange",
                  )}
                />
              )}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Brand" defaultOpen>
        <div className="flex flex-col gap-2.5">
          <input
            type="text"
            placeholder="Search Brand"
            value={brandSearch}
            onChange={(e) => setBrandSearch(e.target.value)}
            className={customTwMerge(
              INPUT_BASE,
              "text-s12-l16 h-8 w-full rounded px-3",
            )}
          />

          <div className="flex max-h-64 flex-col gap-2 overflow-y-auto px-[5px] pr-1">
            {filteredBrands.map((brand) => (
              <label
                key={brand.id}
                className="flex cursor-pointer items-center gap-3"
              >
                <GenericCheckbox
                  checked={selectedBrandSlugs.includes(brand.slug)}
                  onCheckedChange={() => toggleBrand(brand.slug)}
                />
                <span className="select-none">{brand.name}</span>
              </label>
            ))}

            {filteredBrands.length === 0 && (
              <div className="text-gray-7 text-s12-l16">No result found.</div>
            )}
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Seller" defaultOpen>
        <div className="flex flex-col gap-2.5">
          <input
            type="text"
            placeholder="Search Seller"
            value={sellerSearch}
            onChange={(e) => setSellerSearch(e.target.value)}
            className={customTwMerge(
              INPUT_BASE,
              "text-s12-l16 h-8 w-full rounded px-3",
            )}
          />

          <div className="flex max-h-64 flex-col gap-2 overflow-y-auto px-[5px] pr-1">
            {filteredSellers.map((seller) => (
              <label
                key={seller.id}
                className="flex cursor-pointer items-center gap-3"
              >
                <GenericCheckbox
                  checked={selectedSellerIds.includes(seller.id)}
                  onCheckedChange={() => toggleSeller(seller.id)}
                />
                <span className="select-none">{seller.name}</span>
              </label>
            ))}

            {filteredSellers.length === 0 && (
              <div className="text-gray-7 text-s12-l16">No result found.</div>
            )}
          </div>
        </div>
      </FilterSection>
    </aside>
  );
};

export default ProductsFilterSidebar;
