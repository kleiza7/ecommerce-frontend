import { useMemo, useState } from "react";
import type { ReqCategoriesGetAllResponse } from "../../../../../../../api/responses/ReqCategoriesGetAllResponse.model";
import { KeyboardArrowUpIcon } from "../../../../../../../assets/icons";
import { useCategoriesGetAll } from "../../../../../../../hooks/useCategoriesGetAll";
import {
  BUTTON_PRIMARY,
  BUTTON_SIZE_LARGE,
} from "../../../../../../../shared/constants/CommonTailwindClasses.constants";
import type { CategoryNode } from "../../../../../../../shared/models/CategoryNode.model";
import { buildCategoryTreeWithMap } from "../../../../../../../shared/utils/CategoryTree.util";
import { customTwMerge } from "../../../../../../../shared/utils/Tailwind.util";

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
    () => buildCategoryTreeWithMap(categories),
    [categories],
  );

  const { initialDrillPath, initialLeafId } = useMemo(() => {
    if (!initialSelectedCategory) {
      return { initialDrillPath: [] as CategoryNode[], initialLeafId: null };
    }

    const leafNode = map.get(initialSelectedCategory.id) ?? null;
    if (!leafNode) {
      return { initialDrillPath: [] as CategoryNode[], initialLeafId: null };
    }

    const path: CategoryNode[] = [];
    let current = leafNode;

    while (current.parentId !== null) {
      const parent = map.get(current.parentId);
      if (!parent) {
        break;
      }
      path.unshift(parent);
      current = parent;
    }

    return {
      initialDrillPath: path,
      initialLeafId: leafNode.children.length === 0 ? leafNode.id : null,
    };
  }, [initialSelectedCategory, map]);

  const [drillPath, setDrillPath] = useState<CategoryNode[]>(initialDrillPath);
  const [selectedLeafId, setSelectedLeafId] = useState<number | null>(
    initialLeafId,
  );

  const currentNodes: CategoryNode[] = useMemo(() => {
    if (drillPath.length === 0) {
      return tree;
    }

    return drillPath[drillPath.length - 1].children;
  }, [tree, drillPath]);

  return (
    <div className="bg-surface-primary flex h-full flex-col">
      <div className="border-gray-2 flex items-center justify-between gap-3 border-b px-4 py-3">
        <button
          type="button"
          onClick={() => {
            if (drillPath.length === 0) {
              close();
              return;
            }

            setSelectedLeafId(null);
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

      <div className="flex flex-1 flex-col overflow-y-auto">
        {currentNodes.map((node) => {
          const isLeaf = node.children.length === 0;
          const isSelected = selectedLeafId === node.id;

          return (
            <button
              key={node.id}
              type="button"
              onClick={() => {
                if (isLeaf) {
                  setSelectedLeafId(node.id);
                  return;
                }

                setSelectedLeafId(null);
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

      <div className="border-gray-2 border-t p-3">
        <button
          type="button"
          disabled={selectedLeafId === null}
          onClick={() => {
            if (selectedLeafId === null) {
              return;
            }

            const selectedCategory = categories.find(
              (category) => category.id === selectedLeafId,
            );

            if (!selectedCategory) {
              return;
            }

            onCategorySelected(selectedCategory);
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
