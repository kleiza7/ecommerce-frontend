import { useMemo, useState } from "react";
import type { ReqCategoriesGetAllResponse } from "../../../../../../api/responses/ReqCategoriesGetAllResponse.model";
import {
  ArrowLeftIcon,
  CheckIcon,
  KeyboardArrowUpIcon,
} from "../../../../../../assets/icons";
import { useCategoriesGetAll } from "../../../../../../hooks/useCategoriesGetAll";
import {
  BUTTON_PRIMARY,
  BUTTON_PRIMARY_OUTLINED,
} from "../../../../../constants/CommonTailwindClasses.constants";
import { customTwMerge } from "../../../../../utils/Tailwind.util";

type CategoryNode = ReqCategoriesGetAllResponse[number] & {
  children: CategoryNode[];
};

const buildTreeWithMap = (categories: ReqCategoriesGetAllResponse) => {
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

  return { tree: roots, map };
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

  const { tree, map } = useMemo(
    () => buildTreeWithMap(categories),
    [categories],
  );

  /** 🔹 initial drill path + leaf */
  const { initialDrillPath, initialLeaf } = useMemo(() => {
    if (!initialSelectedCategory) {
      return { initialDrillPath: [] as CategoryNode[], initialLeaf: null };
    }

    const leafNode = map.get(initialSelectedCategory.id) ?? null;
    if (!leafNode) {
      return { initialDrillPath: [] as CategoryNode[], initialLeaf: null };
    }

    const path: CategoryNode[] = [];
    let current = leafNode;

    while (current.parentId) {
      const parent = map.get(current.parentId);
      if (!parent) break;
      path.unshift(parent);
      current = parent;
    }

    return {
      initialDrillPath: path,
      initialLeaf: leafNode.children.length === 0 ? leafNode : null,
    };
  }, [initialSelectedCategory, map]);

  const [drillPath, setDrillPath] = useState<CategoryNode[]>(initialDrillPath);
  const [selectedLeaf, setSelectedLeaf] = useState<CategoryNode | null>(
    initialLeaf,
  );

  /** 🔹 gösterilecek liste */
  const currentNodes: CategoryNode[] = useMemo(() => {
    if (drillPath.length === 0) return tree;
    return drillPath[drillPath.length - 1].children;
  }, [tree, drillPath]);

  return (
    <div className="flex h-full flex-col">
      {/* HEADER */}
      <div className="border-gray-2 flex items-center gap-x-2 border-b px-4 py-3">
        {drillPath.length > 0 && (
          <button
            type="button"
            onClick={() => {
              setSelectedLeaf(null);
              setDrillPath((prev) => prev.slice(0, prev.length - 1));
            }}
            className="hover:bg-gray-1 flex h-8 w-8 items-center justify-center rounded-md"
          >
            <ArrowLeftIcon className="h-6 w-6 fill-current" />
          </button>
        )}

        <div className="flex flex-col">
          <span className="text-s18-l28 text-text-primary font-semibold">
            Select Category
          </span>
          <span className="text-s14-l20 text-gray-8">
            Choose a category for this product.
          </span>
        </div>
      </div>

      {/* LIST */}
      <ul className="flex flex-1 flex-col overflow-y-auto">
        {currentNodes.map((node) => {
          const isLeaf = node.children.length === 0;
          const isSelected = selectedLeaf?.id === node.id;

          return (
            <li
              key={node.id}
              onClick={() => {
                if (isLeaf) {
                  setSelectedLeaf(node);
                  return;
                }

                setSelectedLeaf(null);
                setDrillPath((prev) => [...prev, node]);
              }}
              className={customTwMerge(
                "flex h-12 cursor-pointer items-center justify-between px-4 transition-colors",
                isSelected
                  ? "bg-orange/10 text-orange"
                  : "text-text-primary hover:bg-orange/10 hover:text-orange",
              )}
            >
              <span className="text-s14-l20 font-medium">{node.name}</span>

              {isLeaf ? (
                isSelected ? (
                  <CheckIcon className="text-orange h-4 w-4 fill-current" />
                ) : null
              ) : (
                <KeyboardArrowUpIcon className="text-gray-8 h-5 w-5 rotate-90 fill-current" />
              )}
            </li>
          );
        })}
      </ul>

      {/* ACTIONS */}
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
            disabled={!selectedLeaf}
            onClick={() => {
              if (!selectedLeaf) return;
              onCategorySelected(selectedLeaf);
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
