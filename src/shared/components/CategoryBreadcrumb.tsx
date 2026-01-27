import { useCallback, useMemo } from "react";
import { KeyboardArrowUpIcon } from "../../assets/icons";
import { useCategoriesGetAll } from "../../hooks/useCategoriesGetAll";
import { useProductsNavigation } from "../../hooks/useProductsNavigation";
import type { CategoryNode } from "../models/CategoryNode.model";
import { buildCategoryPath } from "../utils/CategoryTree.util";

const CategoryBreadcrumb = ({
  selectedCategoryId,
  hasClearFilterButton = true,
}: {
  selectedCategoryId?: number;
  hasClearFilterButton?: boolean;
}) => {
  const { data: categories = [], isLoading } = useCategoriesGetAll();
  const { goToProductsPage } = useProductsNavigation();

  const breadcrumb: CategoryNode[] = useMemo(() => {
    if (!selectedCategoryId || categories.length === 0) {
      return [];
    }

    return buildCategoryPath(
      categories,
      categories.find((category) => category.id === selectedCategoryId) ?? null,
    );
  }, [categories, selectedCategoryId]);

  /* =======================
     NAVIGATION
  ======================= */

  const handleNavigate = useCallback(
    (slug: string) => {
      goToProductsPage({
        categorySlug: slug,
        overrideParams: true,
      });
    },
    [goToProductsPage],
  );

  const clearCategoryFilters = useCallback(() => {
    goToProductsPage({
      categorySlug: null,
      overrideParams: true,
    });
  }, [goToProductsPage]);

  if (isLoading || breadcrumb.length === 0) {
    return null;
  }

  return (
    <nav className="text-s14-l20 text-text-primary hidden items-center gap-x-4 md:flex">
      <ol className="flex flex-wrap items-center gap-1">
        {breadcrumb.map((item, index) => (
          <li key={item.id} className="flex items-center gap-1">
            {index !== 0 && (
              <KeyboardArrowUpIcon className="fill-orange h-4 w-4 rotate-90" />
            )}

            <button
              type="button"
              onClick={() => handleNavigate(item.slug)}
              className={`cursor-pointer ${
                index === breadcrumb.length - 1
                  ? "font-medium"
                  : "font-normal hover:underline"
              }`}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ol>

      {hasClearFilterButton && (
        <button
          type="button"
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
