import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { ReqBrandsGetAllResponse } from "../../../api/responses/ReqBrandsGetAllResponse.model";
import type { ReqCategoriesGetAllResponse } from "../../../api/responses/ReqCategoriesGetAllResponse.model";

const ProductsFilterSidebar = ({
  categories,
  brands,
}: {
  categories: ReqCategoriesGetAllResponse;
  brands: ReqBrandsGetAllResponse;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [brandSearch, setBrandSearch] = useState("");

  const selectedCategorySlugs =
    searchParams.get("categories")?.split(",") ?? [];

  const selectedBrandSlugs = searchParams.get("brands")?.split(",") ?? [];

  const toggleParam = (key: "categories" | "brands", slug: string) => {
    const current = searchParams.get(key)?.split(",") ?? [];

    const next = current.includes(slug)
      ? current.filter((s) => s !== slug)
      : [...current, slug];

    const newParams = new URLSearchParams(searchParams);

    if (next.length === 0) {
      newParams.delete(key);
    } else {
      newParams.set(key, next.join(","));
    }

    newParams.delete("page");

    setSearchParams(newParams);
  };

  const filteredBrands = useMemo(() => {
    if (!brands) return [];
    return brands.filter((b) =>
      b.name.toLowerCase().includes(brandSearch.toLowerCase()),
    );
  }, [brands, brandSearch]);

  return (
    <aside className="text-text-primary space-y-6">
      {/* CATEGORIES */}
      <div>
        <h2 className="mb-3 text-base font-semibold">Categories</h2>

        <div className="space-y-2">
          {categories?.map((category) => (
            <label
              key={category.id}
              className="flex cursor-pointer items-center gap-2 text-sm"
            >
              <input
                type="checkbox"
                checked={selectedCategorySlugs.includes(category.slug)}
                onChange={() => toggleParam("categories", category.slug)}
                className="accent-orange"
              />
              <span>{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      <hr />

      {/* BRANDS */}
      <div>
        <h2 className="mb-3 text-base font-semibold">Brands</h2>

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
              className="flex cursor-pointer items-center gap-2 text-sm"
            >
              <input
                type="checkbox"
                checked={selectedBrandSlugs.includes(brand.slug)}
                onChange={() => toggleParam("brands", brand.slug)}
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
