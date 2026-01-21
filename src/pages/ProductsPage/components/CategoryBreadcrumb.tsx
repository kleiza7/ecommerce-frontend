import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { ReqCategoriesGetAllResponse } from "../../../api/responses/ReqCategoriesGetAllResponse.model";
import { KeyboardArrowUpIcon } from "../../../assets/icons";
import type { CategoryNode } from "../../../shared/models/CategoryNode.model";
import {
  buildCategorySlugMap,
  buildCategoryTree,
} from "../../../shared/utils/CategoryTree.util";

const buildPath = (
  node: CategoryNode,
  slugMap: Map<string, CategoryNode>,
): CategoryNode[] => {
  const path: CategoryNode[] = [];
  let current: CategoryNode | undefined = node;

  while (current) {
    path.unshift(current);
    current = current.parentId
      ? Array.from(slugMap.values()).find(
          (categoryNode) => categoryNode.id === current!.parentId,
        )
      : undefined;
  }

  return path;
};

const CategoryBreadcrumb = ({
  categories,
}: {
  categories: ReqCategoriesGetAllResponse;
}) => {
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
    setParams(next);
  };

  return (
    <nav className="text-s14-l20 text-text-primary flex items-center gap-x-4 px-[120px]">
      <ol className="flex flex-wrap items-center gap-1">
        {breadcrumb.map((item, index) => (
          <li key={item.id} className="flex items-center gap-1">
            {index !== 0 && (
              <KeyboardArrowUpIcon className="fill-orange h-4 w-4 rotate-90" />
            )}

            <button
              onClick={() => {
                const next = new URLSearchParams(params);
                next.set("category", item.slug);
                setParams(next);
              }}
              className={`cursor-pointer ${
                index === breadcrumb.length - 1 ? "font-medium" : "font-normal"
              }`}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ol>

      <button
        onClick={clearCategoryFilters}
        className="text-orange text-s12-l16 cursor-pointer font-semibold hover:underline"
      >
        Clear Filter
      </button>
    </nav>
  );
};

export default CategoryBreadcrumb;
