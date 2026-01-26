import { useMemo, useState } from "react";
import type { ReqCategoriesGetAllResponse } from "../../../../../../api/responses/ReqCategoriesGetAllResponse.model";
import { CheckIcon, KeyboardArrowUpIcon } from "../../../../../../assets/icons";
import { useCategoriesGetAll } from "../../../../../../hooks/useCategoriesGetAll";
import {
  BUTTON_PRIMARY,
  BUTTON_PRIMARY_OUTLINED,
} from "../../../../../constants/CommonTailwindClasses.constants";
import { customTwMerge } from "../../../../../utils/Tailwind.util";

type CategoryNode = ReqCategoriesGetAllResponse[number] & {
  children: CategoryNode[];
};

const buildTree = (categories: ReqCategoriesGetAllResponse): CategoryNode[] => {
  const map = new Map<number, CategoryNode>();

  categories.forEach((category) => {
    map.set(category.id, { ...category, children: [] });
  });

  const roots: CategoryNode[] = [];

  map.forEach((node) => {
    if (node.parentId) {
      map.get(node.parentId)?.children.push(node);
    } else {
      roots.push(node);
    }
  });

  return roots;
};

const buildInitialPath = (
  categories: ReqCategoriesGetAllResponse,
  initialSelectedCategory: ReqCategoriesGetAllResponse[number] | null,
): CategoryNode[] => {
  if (!initialSelectedCategory || categories.length === 0) {
    return [];
  }

  const map = new Map<number, CategoryNode>();

  categories.forEach((category) => {
    map.set(category.id, { ...category, children: [] });
  });

  categories.forEach((category) => {
    if (category.parentId) {
      map.get(category.parentId)?.children.push(map.get(category.id)!);
    }
  });

  const path: CategoryNode[] = [];
  let current = map.get(initialSelectedCategory.id);

  while (current) {
    path.unshift(current);
    if (!current.parentId) break;
    current = map.get(current.parentId);
  }

  return path;
};

const CategorySelectionColumnDrawerContent = ({
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

  const [selectedPath, setSelectedPath] = useState<CategoryNode[]>(() =>
    buildInitialPath(categories, initialSelectedCategory),
  );

  const handleSelect = (node: CategoryNode, level: number) => {
    setSelectedPath((prev) => {
      const next = prev.slice(0, level);
      next.push(node);
      return next;
    });
  };

  const lastSelectedNode = selectedPath[selectedPath.length - 1] ?? null;
  const isLeafSelected =
    !!lastSelectedNode && lastSelectedNode.children.length === 0;

  const finalSelectedCategory = isLeafSelected ? lastSelectedNode : null;

  const columns: CategoryNode[][] = useMemo(() => {
    const result: CategoryNode[][] = [];
    result.push(tree);

    selectedPath.forEach((node) => {
      if (node.children.length > 0) {
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
      <div className="flex flex-1 gap-x-6 overflow-x-auto overflow-y-hidden">
        {columns.map((column, level) => {
          const columnKey =
            level === 0
              ? "root"
              : (selectedPath[level - 1]?.id ?? crypto.randomUUID());

          return (
            <div key={columnKey} className="flex gap-x-4">
              {/* 👇 w-56 → w-52 (UI telafisi) */}
              <div className="w-52 shrink-0">
                <ul className="flex flex-col gap-1">
                  {column.map((node) => {
                    const isSelected = selectedPath[level]?.id === node.id;
                    const isLeaf = node.children.length === 0;

                    return (
                      <li
                        key={node.id}
                        onClick={() => handleSelect(node, level)}
                        className={`flex h-12 cursor-pointer items-center justify-between rounded-md px-3 transition-colors ${
                          isSelected
                            ? "bg-orange/10 text-orange"
                            : "text-text-primary hover:bg-orange/10 hover:text-orange"
                        }`}
                      >
                        <span className="text-s14-l20 font-semibold">
                          {node.name}
                        </span>

                        {isLeaf ? (
                          isSelected ? (
                            <CheckIcon className="text-orange h-4 w-4 fill-current" />
                          ) : null
                        ) : (
                          <KeyboardArrowUpIcon className="h-4 w-4 rotate-90 fill-current" />
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>

              {level < columns.length - 1 && (
                <div className="bg-gray-2 h-full w-px" />
              )}
            </div>
          );
        })}
      </div>

      {/* ACTIONS */}
      <div className="bg-surface-primary sticky bottom-0 flex shrink-0 justify-end gap-x-2">
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

export default CategorySelectionColumnDrawerContent;
