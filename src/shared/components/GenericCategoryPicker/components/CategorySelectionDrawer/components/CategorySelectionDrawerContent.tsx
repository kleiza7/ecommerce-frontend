import { useMemo, useState } from "react";
import type { ReqCategoriesGetAllResponse } from "../../../../../../api/responses/ReqCategoriesGetAllResponse.model";
import { KeyboardArrowUpIcon } from "../../../../../../assets/icons";
import { useCategoriesGetAll } from "../../../../../../hooks/useCategoriesGetAll";
import {
  BUTTON_PRIMARY,
  BUTTON_PRIMARY_OUTLINED,
} from "../../../../../constants/CommonTailwindClasses.constants";
import { customTwMerge } from "../../../../../utils/Tailwind.util";

type CategoryNode = ReqCategoriesGetAllResponse[number] & {
  children?: CategoryNode[];
};

const buildTree = (categories: ReqCategoriesGetAllResponse): CategoryNode[] => {
  const map = new Map<number, CategoryNode>();

  categories.forEach((category) => {
    map.set(category.id, { ...category, children: [] });
  });

  const roots: CategoryNode[] = [];

  map.forEach((node) => {
    if (node.parentId) {
      map.get(node.parentId)?.children?.push(node);
    } else {
      roots.push(node);
    }
  });

  return roots;
};

const CategorySelectionDrawerContent = ({
  initialSelectedCategory,
  onCategorySelected,
  close,
}: {
  initialSelectedCategory: ReqCategoriesGetAllResponse[number] | null;
  onCategorySelected: (category: ReqCategoriesGetAllResponse[number]) => void;
  close: () => void;
}) => {
  const { data: categories = [] } = useCategoriesGetAll();
  const tree = useMemo(() => buildTree(categories), [categories]);

  const [selectedPath, setSelectedPath] = useState<CategoryNode[]>(() => {
    if (!initialSelectedCategory) return [];

    const path: CategoryNode[] = [];
    let current = categories.find(
      (category) => category.id === initialSelectedCategory.id,
    );

    while (current) {
      path.unshift(current);
      current = categories.find(
        (category) => category.id === current?.parentId,
      );
    }

    return path;
  });

  const handleSelect = (node: CategoryNode, level: number) => {
    setSelectedPath((prev) => {
      const next = prev.slice(0, level);
      next.push(node);
      return next;
    });
  };

  const finalSelectedCategory = selectedPath[selectedPath.length - 1] ?? null;

  const columns: CategoryNode[][] = useMemo(() => {
    const result: CategoryNode[][] = [];
    result.push(tree);

    selectedPath.forEach((node) => {
      if (node.children && node.children.length > 0) {
        result.push(node.children);
      }
    });

    return result;
  }, [tree, selectedPath]);

  return (
    <div className="flex h-full flex-col gap-y-4">
      {/* HEADER */}
      <div className="flex shrink-0 flex-col gap-y-1">
        <span className="text-s18-l28 text-text-primary font-semibold">
          Select Category
        </span>
        <span className="text-s14-l20 text-gray-8">
          Choose a category for this product.
        </span>
      </div>

      {/* COLUMNS */}
      <div className="flex flex-1 gap-x-4 overflow-x-auto overflow-y-hidden">
        {columns.map((column, level) => (
          <div
            key={level}
            className="border-gray-2 w-56 shrink-0 border-r pr-4 last:border-r-0"
          >
            <ul className="flex flex-col gap-1">
              {column.map((node) => (
                <li
                  key={node.id}
                  onClick={() => handleSelect(node, level)}
                  className={`flex h-12 cursor-pointer items-center justify-between rounded-md px-3 transition-colors ${
                    selectedPath[level]?.id === node.id
                      ? "bg-orange/10 text-orange"
                      : "text-text-primary hover:bg-orange/10 hover:text-orange"
                  }`}
                >
                  <span className="text-s14-l20 font-semibold">
                    {node.name}
                  </span>

                  {node.children && node.children.length > 0 && (
                    <KeyboardArrowUpIcon className="h-4 w-4 rotate-90 fill-current" />
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ACTIONS */}
      <div className="border-gray-2 bg-surface-primary sticky bottom-0 flex shrink-0 justify-end gap-x-2 border-t">
        <button
          type="button"
          onClick={close}
          className={customTwMerge(BUTTON_PRIMARY_OUTLINED, "px-4")}
        >
          Cancel
        </button>

        <button
          type="button"
          disabled={!finalSelectedCategory}
          onClick={() => {
            if (!finalSelectedCategory) return;
            onCategorySelected(finalSelectedCategory);
            close();
          }}
          className={customTwMerge(BUTTON_PRIMARY, "px-4")}
        >
          Select
        </button>
      </div>
    </div>
  );
};

export default CategorySelectionDrawerContent;
