import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { ReqCategoriesGetAllResponse } from "../../../../../api/responses/ReqCategoriesGetAllResponse.model";
import { KeyboardArrowUpIcon } from "../../../../../assets/icons";
import { GenericDrawer } from "../../../../../shared/components/GenericDrawer";
import {
  BUTTON_PRIMARY,
  BUTTON_SIZE_LARGE,
} from "../../../../../shared/constants/CommonTailwindClasses.constants";
import type { CategoryNode } from "../../../../../shared/models/CategoryNode.model";
import {
  buildCategorySlugMap,
  buildCategoryTree,
} from "../../../../../shared/utils/CategoryTree.util";
import { customTwMerge } from "../../../../../shared/utils/Tailwind.util";

const CategorySelectionDrawer = ({
  open,
  setOpen,
  categories,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  categories: ReqCategoriesGetAllResponse;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryTree = useMemo(
    () => buildCategoryTree(categories),
    [categories],
  );

  const slugMap = useMemo(
    () => buildCategorySlugMap(categoryTree),
    [categoryTree],
  );

  const selectedCategorySlug = searchParams.get("category");

  const initialNode = selectedCategorySlug
    ? slugMap.get(selectedCategorySlug)
    : null;

  const [currentParentId, setCurrentParentId] = useState<
    number | null | undefined
  >(initialNode?.parentId ?? null);

  const visibleCategories: CategoryNode[] = useMemo(() => {
    if (currentParentId == null) {
      return categoryTree;
    }

    return categoryTree
      .flatMap((category) => {
        if (category.id === currentParentId) {
          return category.children;
        }
        return [];
      })
      .concat(
        categoryTree
          .flatMap((category) => category.children)
          .flatMap((child) =>
            child.id === currentParentId ? child.children : [],
          ),
      );
  }, [categoryTree, currentParentId]);

  const onSelectCategory = (category: CategoryNode) => {
    if (category.children.length > 0) {
      setCurrentParentId(category.id);
      return;
    }

    const params = new URLSearchParams(searchParams);
    params.set("category", category.slug);
    setSearchParams(params);
    setOpen(false);
  };

  const onBack = () => {
    if (currentParentId == null) {
      setOpen(false);
      return;
    }

    const current = categories.find(
      (category) => category.id === currentParentId,
    );

    setCurrentParentId(current?.parentId ?? null);
  };

  return (
    <GenericDrawer
      open={open}
      onOpenChange={setOpen}
      side="right"
      className="h-svh"
    >
      <div className="bg-surface-primary flex h-full flex-col">
        <div className="border-gray-2 flex items-center justify-between gap-3 border-b px-4 py-3">
          <button type="button" onClick={onBack} className="flex items-center">
            <KeyboardArrowUpIcon className="fill-orange h-8 w-8 -rotate-90" />
          </button>

          <span className="text-s16-l24 text-text-primary font-medium">
            Category
          </span>

          <div className="h-8 w-8" />
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto">
          {visibleCategories.map((category) => {
            const isSelected = selectedCategorySlug === category.slug;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onSelectCategory(category)}
                className={customTwMerge(
                  "border-gray-2 flex w-full items-center justify-between border-b px-4 py-4 text-left",
                  isSelected ? "text-orange font-medium" : "text-text-primary",
                )}
              >
                <span className="text-s14-l20">{category.name}</span>

                {category.children.length > 0 && (
                  <KeyboardArrowUpIcon className="fill-orange h-4 w-4 rotate-90" />
                )}
              </button>
            );
          })}
        </div>

        <div className="border-gray-2 border-t p-3">
          <button
            type="button"
            onClick={() => setOpen(false)}
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
    </GenericDrawer>
  );
};

export default CategorySelectionDrawer;
