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

const CategorySelectionDrillDrawerContent = ({
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

  const currentNodes: CategoryNode[] = useMemo(() => {
    if (selectedPath.length === 0) {
      return tree;
    }

    const last = selectedPath[selectedPath.length - 1];
    return last.children ?? [];
  }, [tree, selectedPath]);

  const finalSelectedCategory =
    selectedPath.length > 0 &&
    (!selectedPath[selectedPath.length - 1].children ||
      selectedPath[selectedPath.length - 1].children?.length === 0)
      ? selectedPath[selectedPath.length - 1]
      : null;

  return (
    <div className="flex h-full flex-col">
      <div className="border-gray-2 shrink-0 border-b px-4 py-3">
        <div className="text-s18-l28 text-text-primary font-semibold">
          Select Category
        </div>
        <div className="text-s14-l20 text-gray-8">
          Choose a category for this product.
        </div>
      </div>

      <ul className="flex flex-1 flex-col overflow-y-auto">
        {currentNodes.map((node) => {
          const hasChildren = node.children && node.children.length > 0;
          const isSelected =
            selectedPath[selectedPath.length - 1]?.id === node.id;

          return (
            <li
              key={node.id}
              onClick={() => {
                if (hasChildren) {
                  setSelectedPath((prev) => [...prev, node]);
                  return;
                }

                setSelectedPath((prev) => [...prev, node]);
              }}
              className={customTwMerge(
                "flex h-12 cursor-pointer items-center justify-between px-4 transition-colors",
                isSelected ? "bg-orange/10 text-orange" : "text-text-primary",
              )}
            >
              <span className="text-s14-l20 font-medium">{node.name}</span>

              {hasChildren && (
                <KeyboardArrowUpIcon className="fill-gray-8 h-6 w-6 rotate-90" />
              )}
            </li>
          );
        })}
      </ul>

      <div className="border-gray-2 shrink-0 border-t px-4 py-3">
        <div className="flex justify-end gap-x-2">
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
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategorySelectionDrillDrawerContent;
