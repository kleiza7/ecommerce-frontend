import { useCallback, useMemo } from "react";
import { KeyboardArrowUpIcon } from "../../assets/icons";
import { useCategoriesGetAll } from "../../hooks/useCategoriesGetAll";
import { useProductsNavigation } from "../../hooks/useProductsNavigation";
import type { CategoryNode } from "../models/CategoryNode.model";
import { buildCategoryPath } from "../utils/CategoryTree.util";

const CategoryBreadcrumb = ({
  selectedCategoryId,
}: {
  selectedCategoryId: number;
}) => {
  const { data: categories = [], isLoading } = useCategoriesGetAll();
  const { goToProductsPage } = useProductsNavigation();

  const breadcrumb: CategoryNode[] = useMemo(() => {
    if (categories.length === 0) {
      return [];
    }

    return buildCategoryPath(
      categories,
      categories.find((category) => category.id === selectedCategoryId) ?? null,
    );
  }, [categories, selectedCategoryId]);

  const handleNavigate = useCallback(
    (slug: string) => {
      goToProductsPage({
        categorySlug: slug,
        overrideParams: true,
      });
    },
    [goToProductsPage],
  );

  if (isLoading || breadcrumb.length === 0) {
    return null;
  }

  return (
    <nav className="hidden items-center gap-x-4 md:flex">
      <ol className="flex flex-wrap items-center gap-1">
        {breadcrumb.map((item, index) => (
          <li key={item.id} className="flex items-center gap-1">
            {index !== 0 && (
              <KeyboardArrowUpIcon className="fill-primary h-4 w-4 rotate-90" />
            )}

            <button
              type="button"
              onClick={() => handleNavigate(item.slug)}
              className={`text-s14-l20 ${
                index === breadcrumb.length - 1
                  ? "text-primary font-medium"
                  : "text-text-primary cursor-pointer hover:underline"
              }`}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default CategoryBreadcrumb;
