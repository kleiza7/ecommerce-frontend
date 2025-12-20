import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { ReqBrandsGetAllResponse } from "../../../api/responses/ReqBrandsGetAllResponse.model";
import type { ReqCategoriesGetAllResponse } from "../../../api/responses/ReqCategoriesGetAllResponse.model";
import type { CategoryNode } from "../../../shared/models/CategoryNode.model";
import {
  buildCategorySlugMap,
  buildCategoryTree,
} from "../../../shared/utils/CategoryTree.util";

const ProductsFilterSidebar = ({
  categories,
  brands,
}: {
  categories: ReqCategoriesGetAllResponse;
  brands: ReqBrandsGetAllResponse;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [brandSearch, setBrandSearch] = useState("");

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
      const parent = categories.find((c) => c.id === current.parentId);
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
      ? selectedBrandSlugs.filter((s) => s !== slug)
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

  return (
    <aside className="text-text-primary space-y-6 text-sm">
      <div>
        <h2 className="mb-3 font-semibold">Categories</h2>

        <div className="space-y-2">
          {visibleCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.slug)}
              className={`block w-full text-left ${
                selectedCategorySlug === category.slug
                  ? "text-orange font-semibold"
                  : "hover:text-orange"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <hr />

      <div>
        <h2 className="mb-3 font-semibold">Brands</h2>

        <input
          type="text"
          placeholder="Marka Ara"
          value={brandSearch}
          onChange={(e) => setBrandSearch(e.target.value)}
          className="mb-3 w-full rounded border px-3 py-2 text-sm outline-none focus:ring-1"
        />

        <div className="max-h-64 space-y-2 overflow-y-auto pr-1">
          {filteredBrands.map((brand) => (
            <label
              key={brand.id}
              className="flex cursor-pointer items-center gap-2"
            >
              <input
                type="checkbox"
                checked={selectedBrandSlugs.includes(brand.slug)}
                onChange={() => toggleBrand(brand.slug)}
                className="accent-orange"
              />
              <span>{brand.name}</span>
            </label>
          ))}

          {filteredBrands.length === 0 && (
            <div className="text-xs text-gray-400">No result found.</div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default ProductsFilterSidebar;
