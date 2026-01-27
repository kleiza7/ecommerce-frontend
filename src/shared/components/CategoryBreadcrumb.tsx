import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { KeyboardArrowUpIcon } from "../../assets/icons";
import { useCategoriesGetAll } from "../../hooks/useCategoriesGetAll";
import type { CategoryNode } from "../models/CategoryNode.model";
import { buildCategoryPath } from "../utils/CategoryTree.util";

const CategoryBreadcrumb = ({
  selectedCategoryId,
  hasClearFilterButton = true,
}: {
  selectedCategoryId?: number;
  hasClearFilterButton?: boolean;
}) => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { data: categories = [], isLoading } = useCategoriesGetAll();

  const breadcrumb: CategoryNode[] = useMemo(() => {
    if (!selectedCategoryId || categories.length === 0) {
      return [];
    }

    return buildCategoryPath(
      categories,
      categories.find((c) => c.id === selectedCategoryId) ?? null,
    );
  }, [categories, selectedCategoryId]);

  if (isLoading || breadcrumb.length === 0) {
    return null;
  }

  const handleNavigate = (slug: string) => {
    const next = new URLSearchParams(params);
    next.set("category", slug);
    navigate(`/products?${next.toString()}`);
  };

  const clearCategoryFilters = () => {
    const next = new URLSearchParams(params);
    next.delete("category");
    navigate(`/products?${next.toString()}`);
  };

  return (
    <nav className="text-s14-l20 text-text-primary hidden items-center gap-x-4 md:flex">
      <ol className="flex flex-wrap items-center gap-1">
        {breadcrumb.map((item, index) => (
          <li key={item.id} className="flex items-center gap-1">
            {index !== 0 && (
              <KeyboardArrowUpIcon className="fill-orange h-4 w-4 rotate-90" />
            )}

            <button
              onClick={() => handleNavigate(item.slug)}
              className={`cursor-pointer ${
                index === breadcrumb.length - 1 ? "font-medium" : "font-normal"
              }`}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ol>

      {hasClearFilterButton && (
        <button
          onClick={clearCategoryFilters}
          className="text-orange text-s12-l16 cursor-pointer font-semibold hover:underline"
        >
          Clear Filter
        </button>
      )}
    </nav>
  );
};

export default CategoryBreadcrumb;
