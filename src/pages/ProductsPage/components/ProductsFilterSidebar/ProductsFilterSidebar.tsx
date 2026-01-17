import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { ReqBrandsGetAllResponse } from "../../../../api/responses/ReqBrandsGetAllResponse.model";
import type { ReqCategoriesGetAllResponse } from "../../../../api/responses/ReqCategoriesGetAllResponse.model";
import { useAuthGetAllSellers } from "../../../../hooks/useAuthGetAllSellers";
import GenericCheckbox from "../../../../shared/components/GenericCheckbox";
import { INPUT_BASE } from "../../../../shared/constants/CommonTailwindClasses.constants";
import type { CategoryNode } from "../../../../shared/models/CategoryNode.model";
import {
  buildCategorySlugMap,
  buildCategoryTree,
} from "../../../../shared/utils/CategoryTree.util";
import { customTwMerge } from "../../../../shared/utils/Tailwind.util";
import FilterSection from "./components/FilterSection";

const ProductsFilterSidebar = ({
  categories,
  brands,
}: {
  categories: ReqCategoriesGetAllResponse;
  brands: ReqBrandsGetAllResponse;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: sellers = [] } = useAuthGetAllSellers();

  const [brandSearch, setBrandSearch] = useState("");
  const [sellerSearch, setSellerSearch] = useState("");

  const selectedCategorySlug = searchParams.get("category");

  const categoryTree = useMemo(
    () => buildCategoryTree(categories),
    [categories],
  );

  const slugMap = useMemo(
    () => buildCategorySlugMap(categoryTree),
    [categoryTree],
  );

  const visibleCategories: CategoryNode[] = useMemo(() => {
    if (!selectedCategorySlug) return categoryTree;

    const current = slugMap.get(selectedCategorySlug);
    if (!current) return categoryTree;

    if (current.children.length > 0) {
      return current.children;
    }

    if (current.parentId) {
      const parent = categories.find(
        (category) => category.id === current.parentId,
      );
      return parent
        ? (slugMap.get(parent.slug)?.children ?? categoryTree)
        : categoryTree;
    }

    return categoryTree;
  }, [selectedCategorySlug, categoryTree, slugMap, categories]);

  const onSelectCategory = (slug: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", slug);
    params.delete("page");
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

    params.delete("page");
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

    params.delete("page");
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
        <div className="flex flex-col gap-y-2 px-[5px]">
          {visibleCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.slug)}
              className={`block w-full cursor-pointer text-left ${
                selectedCategorySlug === category.slug
                  ? "text-orange font-semibold"
                  : "hover:text-orange"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Brand" defaultOpen>
        <input
          type="text"
          placeholder="Search Brand"
          value={brandSearch}
          onChange={(e) => setBrandSearch(e.target.value)}
          className={customTwMerge(
            INPUT_BASE,
            "text-s12-l16 mb-2.5 h-8 w-full rounded px-3",
          )}
        />

        <div className="max-h-64 space-y-2 overflow-y-auto px-[5px] pr-1">
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
            <div className="text-gray-7 text-xs">No result found.</div>
          )}
        </div>
      </FilterSection>

      <FilterSection title="Seller" defaultOpen>
        <input
          type="text"
          placeholder="Search Seller"
          value={sellerSearch}
          onChange={(e) => setSellerSearch(e.target.value)}
          className={customTwMerge(
            INPUT_BASE,
            "text-s12-l16 mb-2.5 h-8 w-full rounded px-3",
          )}
        />

        <div className="max-h-64 space-y-2 overflow-y-auto px-[5px] pr-1">
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
            <div className="text-gray-7 text-xs">No result found.</div>
          )}
        </div>
      </FilterSection>
    </aside>
  );
};

export default ProductsFilterSidebar;
