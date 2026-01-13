import { useMemo, useState } from "react";
import type { ReqCategoriesGetAllResponse } from "../../../../api/responses/ReqCategoriesGetAllResponse.model";
import { useCategoriesGetAll } from "../../../../hooks/useCategoriesGetAll";
import {
  GenericDialogClose,
  GenericDialogTitle,
} from "../../../../shared/components/GenericDialog";

type CategoryNode = ReqCategoriesGetAllResponse[number] & {
  children?: CategoryNode[];
};

const buildTree = (categories: ReqCategoriesGetAllResponse): CategoryNode[] => {
  const map = new Map<number, CategoryNode>();

  categories.forEach((c) => map.set(c.id, { ...c, children: [] }));

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

const CategorySelectionDialogContent = ({
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

  const [selectedCategory, setSelectedCategory] = useState<
    ReqCategoriesGetAllResponse[number] | null
  >(initialSelectedCategory);

  const [activeParent, setActiveParent] = useState<CategoryNode | null>(() => {
    if (!initialSelectedCategory || tree.length === 0) return tree[0] ?? null;

    return (
      tree.find((parent) => parent.id === initialSelectedCategory.parentId) ??
      tree.find((parent) =>
        parent.children?.some(
          (child) => child.id === initialSelectedCategory.id,
        ),
      ) ??
      tree[0] ??
      null
    );
  });

  if (!activeParent) return null;

  return (
    <div className="flex h-full flex-col gap-y-6">
      <div className="flex flex-col gap-y-1">
        <GenericDialogTitle>Select Category</GenericDialogTitle>
        <span className="text-s14-l20 text-gray-500">
          Choose a category for this product.
        </span>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-72 shrink-0 overflow-y-auto border-r pr-4">
          <ul className="space-y-1">
            {tree.map((parent) => (
              <li
                key={parent.id}
                onMouseEnter={() => setActiveParent(parent)}
                onClick={() => setSelectedCategory(parent)}
                className={`text-s14-l20 cursor-pointer rounded px-3 py-2 ${
                  selectedCategory?.id === parent.id
                    ? "text-orange bg-orange-50 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {parent.name}
              </li>
            ))}
          </ul>
        </aside>

        <section className="flex-1 overflow-y-auto pl-8">
          <div className="grid grid-cols-3 gap-8">
            {activeParent.children?.map((child) => (
              <div key={child.id}>
                <button
                  type="button"
                  onClick={() => setSelectedCategory(child)}
                  className={`text-s14-l20 mb-2 block font-semibold ${
                    selectedCategory?.id === child.id
                      ? "text-orange"
                      : "hover:text-orange text-gray-900"
                  }`}
                >
                  {child.name}
                </button>

                {child.children && (
                  <ul className="space-y-1">
                    {child.children.map((sub) => (
                      <li key={sub.id}>
                        <button
                          type="button"
                          onClick={() => setSelectedCategory(sub)}
                          className={`text-s14-l20 ${
                            selectedCategory?.id === sub.id
                              ? "text-orange font-medium"
                              : "text-gray-600 hover:text-gray-900"
                          }`}
                        >
                          {sub.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="flex justify-end gap-x-2 border-t pt-4">
        <GenericDialogClose>
          <button
            type="button"
            onClick={close}
            className="text-s14-l20 rounded-md border px-4 py-2 hover:bg-gray-50"
          >
            Cancel
          </button>
        </GenericDialogClose>

        <button
          type="button"
          disabled={!selectedCategory}
          onClick={() => {
            if (!selectedCategory) return;
            onCategorySelected(selectedCategory);
            close();
          }}
          className={`text-s14-l20 rounded-md px-4 py-2 text-white ${
            selectedCategory
              ? "bg-orange hover:bg-orange/90"
              : "bg-orange/40 cursor-not-allowed"
          }`}
        >
          Select
        </button>
      </div>
    </div>
  );
};

export default CategorySelectionDialogContent;
