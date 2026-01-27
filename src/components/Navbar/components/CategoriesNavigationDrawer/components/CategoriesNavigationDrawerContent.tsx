import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ReqCategoriesGetAllResponse } from "../../../../../api/responses/ReqCategoriesGetAllResponse.model";
import { KeyboardArrowUpIcon } from "../../../../../assets/icons";
import { useCategoriesGetAll } from "../../../../../hooks/useCategoriesGetAll";
import { customTwMerge } from "../../../../../shared/utils/Tailwind.util";

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

const CategoriesNavigationDrawerContent = ({
  close,
}: {
  close: () => void;
}) => {
  const navigate = useNavigate();

  const { data: categories = [] } = useCategoriesGetAll();

  const { tree } = useMemo(() => buildTreeWithMap(categories), [categories]);

  const [drillPath, setDrillPath] = useState<CategoryNode[]>([]);

  const currentNodes: CategoryNode[] = useMemo(() => {
    if (drillPath.length === 0) {
      return tree;
    }

    return drillPath[drillPath.length - 1].children;
  }, [tree, drillPath]);

  const handleBack = () => {
    if (drillPath.length === 0) {
      close();
      return;
    }

    setDrillPath((prev) => prev.slice(0, prev.length - 1));
  };

  return (
    <div className="bg-surface-primary flex h-full flex-col">
      {/* HEADER */}
      <div className="border-gray-2 flex items-center justify-between gap-3 border-b px-4 py-3">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center justify-center"
        >
          <KeyboardArrowUpIcon className="fill-orange h-8 w-8 -rotate-90" />
        </button>

        <span className="text-s16-l24 text-text-primary font-medium">
          Categories
        </span>

        <div />
      </div>

      {/* LIST */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        {currentNodes.map((node) => {
          const isLeaf = node.children.length === 0;

          return (
            <button
              key={node.id}
              type="button"
              onClick={() => {
                if (isLeaf) {
                  navigate(`/products?category=${node.slug}`);
                  close();
                  return;
                }

                setDrillPath((prev) => [...prev, node]);
              }}
              className={customTwMerge(
                "border-gray-2 text-text-primary flex w-full items-center justify-between border-b px-4 py-4 text-left",
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
    </div>
  );
};

export default CategoriesNavigationDrawerContent;
