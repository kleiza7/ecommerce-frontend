import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { ReqCategoriesGetAllResponse } from "../../../api/responses/ReqCategoriesGetAllResponse.model";
import type { CategoryNode } from "../../../shared/models/CategoryNode.model";
import {
  buildCategorySlugMap,
  buildCategoryTree,
} from "../../../shared/utils/CategoryTree.util";

type Props = {
  categories: ReqCategoriesGetAllResponse;
};

const buildPath = (
  node: CategoryNode,
  slugMap: Map<string, CategoryNode>,
): CategoryNode[] => {
  const path: CategoryNode[] = [];
  let current: CategoryNode | undefined = node;

  while (current) {
    path.unshift(current);
    current = current.parentId
      ? Array.from(slugMap.values()).find((c) => c.id === current!.parentId)
      : undefined;
  }

  return path;
};

const CategoryBreadcrumb = ({ categories }: Props) => {
  const [params, setParams] = useSearchParams();
  const selectedSlug = params.get("category");

  const breadcrumb = useMemo(() => {
    if (!selectedSlug) return [];

    const tree = buildCategoryTree(categories);
    const slugMap = buildCategorySlugMap(tree);

    const node = slugMap.get(selectedSlug);
    if (!node) return [];

    return buildPath(node, slugMap);
  }, [categories, selectedSlug]);

  if (breadcrumb.length === 0) return null;

  const clearCategoryFilters = () => {
    const next = new URLSearchParams(params);
    next.delete("category");
    next.delete("page");
    setParams(next);
  };

  return (
    <nav className="flex items-center gap-x-4 px-2 py-1 text-sm text-gray-700">
      {/* LEFT – BREADCRUMB */}
      <ol className="flex flex-wrap items-center gap-1 font-semibold">
        {breadcrumb.map((cat, index) => (
          <li key={cat.id} className="flex items-center gap-1">
            {index !== 0 && <span className="mx-1 font-semibold">›</span>}

            <button
              onClick={() => {
                const next = new URLSearchParams(params);
                next.set("category", cat.slug);
                next.delete("page");
                setParams(next);
              }}
              className="hover:text-orange-600 hover:underline"
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ol>

      {/* RIGHT – CLEAR FILTER */}
      <button
        onClick={clearCategoryFilters}
        className="text-xs font-semibold text-orange-600 hover:underline"
      >
        Filtreyi Temizle
      </button>
    </nav>
  );
};

export default CategoryBreadcrumb;
