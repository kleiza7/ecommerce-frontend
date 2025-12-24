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
    <nav className="text-s14-l20 flex items-center gap-x-4 px-[120px] py-2 text-gray-700">
      <ol className="flex flex-wrap items-center gap-1 font-semibold">
        {breadcrumb.map((item, index) => (
          <li key={item.id} className="flex items-center gap-1">
            {index !== 0 && <span className="mx-1 font-semibold">›</span>}

            <button
              onClick={() => {
                const next = new URLSearchParams(params);
                next.set("category", item.slug);
                next.delete("page");
                setParams(next);
              }}
              className="hover:text-orange cursor-pointer hover:underline"
            >
              {item.name}
            </button>
          </li>
        ))}
      </ol>

      <button
        onClick={clearCategoryFilters}
        className="text-orange cursor-pointer text-xs font-semibold hover:underline"
      >
        Clear Filter
      </button>
    </nav>
  );
};

export default CategoryBreadcrumb;
