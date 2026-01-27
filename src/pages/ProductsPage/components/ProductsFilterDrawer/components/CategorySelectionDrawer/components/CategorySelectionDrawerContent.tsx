import { useMemo, useState } from "react";
import type { ReqCategoriesGetAllResponse } from "../../../../../../../api/responses/ReqCategoriesGetAllResponse.model";
import { KeyboardArrowUpIcon } from "../../../../../../../assets/icons";
import { useCategoriesGetAll } from "../../../../../../../hooks/useCategoriesGetAll";
import {
  BUTTON_PRIMARY,
  BUTTON_SIZE_LARGE,
} from "../../../../../../../shared/constants/CommonTailwindClasses.constants";
import { customTwMerge } from "../../../../../../../shared/utils/Tailwind.util";

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
    <div className="bg-surface-primary flex h-full flex-col">
      {/* HEADER */}
      <div className="border-gray-2 flex items-center justify-between gap-3 border-b px-4 py-3">
        <button
          type="button"
          onClick={() => {
            if (drillPath.length === 0) {
              close();
              return;
            }

            setSelectedLeaf(null);
            setDrillPath((prev) => prev.slice(0, prev.length - 1));
          }}
          className="flex items-center justify-center"
        >
          <KeyboardArrowUpIcon className="fill-orange h-8 w-8 -rotate-90" />
        </button>

        <span className="text-s16-l24 text-text-primary font-medium">
          Category
        </span>

        <div />
      </div>

      {/* LIST */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        {currentNodes.map((node) => {
          const isLeaf = node.children.length === 0;
          const isSelected = selectedLeaf?.id === node.id;

          return (
            <button
              key={node.id}
              type="button"
              onClick={() => {
                if (isLeaf) {
                  setSelectedLeaf(node);
                  return;
                }

                setSelectedLeaf(null);
                setDrillPath((prev) => [...prev, node]);
              }}
              className={customTwMerge(
                "border-gray-2 flex w-full items-center justify-between border-b px-4 py-4 text-left",
                isSelected ? "text-orange font-medium" : "text-text-primary",
              )}
            >
              <span className="text-s14-l20">{node.name}</span>

              {!isLeaf && (
                <KeyboardArrowUpIcon className="fill-orange h-4 w-4 rotate-90" />
              )}
            </button>
          );
        })}
      </div>

      {/* ACTIONS */}
      <div className="border-gray-2 border-t p-3">
        <button
          type="button"
          disabled={!selectedLeaf}
          onClick={() => {
            if (!selectedLeaf) return;

            onCategorySelected(selectedLeaf);
            close();
          }}
          className={customTwMerge(
            BUTTON_PRIMARY,
            BUTTON_SIZE_LARGE,
            "w-full rounded-sm",
          )}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default CategorySelectionDrawerContent;
