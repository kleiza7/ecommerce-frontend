import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCategoriesGetAll } from "../../../hooks/useCategoriesGetAll";
import type { CategoryNode } from "../../../shared/models/CategoryNode.model";
import {
  buildCategorySlugMap,
  buildCategoryTree,
} from "../../../shared/utils/CategoryTree.util";

const buildPathById = (
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

const CategoryBreadcrumb = ({ categoryId }: { categoryId: number }) => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { data: categories, isLoading } = useCategoriesGetAll();

  const breadcrumb = useMemo(() => {
    if (!categories || !categoryId) return [];

    const tree = buildCategoryTree(categories);
    const slugMap = buildCategorySlugMap(tree);

    const node = Array.from(slugMap.values()).find((c) => c.id === categoryId);

    if (!node) return [];

    return buildPathById(node, slugMap);
  }, [categories, categoryId]);

  if (isLoading || breadcrumb.length === 0) return null;

  return (
    <nav className="text-s14-l20 flex items-center gap-x-4 py-[15px] text-gray-700">
      <ol className="flex flex-wrap items-center gap-1 font-semibold">
        {breadcrumb.map((item, index) => (
          <li key={item.id} className="flex items-center gap-1">
            {index !== 0 && <span className="mx-1">›</span>}

            <button
              onClick={() => {
                const next = new URLSearchParams(params);
                next.set("category", item.slug);
                next.delete("page");

                navigate(`/products?${next.toString()}`);
              }}
              className="hover:text-orange cursor-pointer hover:underline"
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
