import { useMemo, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { KeyboardArrowUpIcon } from "../../../../../assets/icons";
import { useCategoriesGetAll } from "../../../../../hooks/useCategoriesGetAll";
import type { CategoryNode } from "../../../../../shared/models/CategoryNode.model";
import { buildCategoryTreeWithMap } from "../../../../../shared/utils/CategoryTree.util";

const CategoriesMegaMenuContent = ({ close }: { close: () => void }) => {
  const { data: categories = [] } = useCategoriesGetAll();
  const [searchParams] = useSearchParams();
  const activeCategorySlug = searchParams.get("category");

  const { tree } = useMemo(() => {
    return buildCategoryTreeWithMap(categories);
  }, [categories]);

  const [activeParent, setActiveParent] = useState<CategoryNode | null>(() => {
    if (!activeCategorySlug) {
      return tree[0] ?? null;
    }

    return (
      tree.find(
        (parent) =>
          activeCategorySlug === parent.slug ||
          activeCategorySlug.startsWith(`${parent.slug}-`),
      ) ??
      tree[0] ??
      null
    );
  });

  if (!activeParent) return null;

  return (
    <div className="flex min-w-[900px]">
      {/* LEFT */}
      <aside className="border-gray-2 w-56 border-r pr-4">
        <ul className="flex flex-col gap-1">
          {tree.map((parent) => {
            const isActive = activeParent.id === parent.id;

            return (
              <li
                key={parent.id}
                onMouseEnter={() => setActiveParent(parent)}
                className={`flex h-12 cursor-pointer items-center justify-between rounded-md px-3 transition-colors ${
                  isActive
                    ? "bg-orange/10 text-orange"
                    : "text-text-primary hover:bg-orange/10 hover:text-orange"
                }`}
              >
                <span className="text-s14-l20 font-semibold">
                  {parent.name}
                </span>

                {isActive && (
                  <KeyboardArrowUpIcon className="fill-orange h-4 w-4 rotate-90" />
                )}
              </li>
            );
          })}
        </ul>
      </aside>

      {/* RIGHT */}
      <section className="flex-1 pl-6">
        <div className="grid grid-cols-3 gap-8">
          {activeParent.children.map((child) => {
            return (
              <div key={child.id} className="flex flex-col gap-2">
                <NavLink
                  to={`/products?category=${child.slug}`}
                  onClick={close}
                  className="text-s14-l20 text-orange flex items-center gap-x-1 font-medium hover:underline"
                >
                  <span>{child.name}</span>
                  <KeyboardArrowUpIcon className="fill-orange h-4 w-4 rotate-90" />
                </NavLink>

                {child.children.length > 0 && (
                  <ul className="flex flex-col gap-1">
                    {child.children.map((sub) => {
                      const isSubActive = activeCategorySlug === sub.slug;

                      return (
                        <li key={sub.id}>
                          <NavLink
                            to={`/products?category=${sub.slug}`}
                            onClick={close}
                            className={`text-s14-l20 block transition-colors ${
                              isSubActive
                                ? "text-orange underline"
                                : "text-text-primary hover:text-orange hover:underline"
                            }`}
                          >
                            {sub.name}
                          </NavLink>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default CategoriesMegaMenuContent;
