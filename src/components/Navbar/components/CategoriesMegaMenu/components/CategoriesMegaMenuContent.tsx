import { useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { KeyboardArrowUpIcon } from "../../../../../assets/icons";

type CategoryNode = {
  id: number;
  label: string;
  slug: string;
  children?: CategoryNode[];
};

const CategoriesMegaMenuContent = ({
  parents,
  closeMenu,
}: {
  parents: CategoryNode[];
  closeMenu: () => void;
}) => {
  const [searchParams] = useSearchParams();
  const activeCategorySlug = searchParams.get("category");

  const [activeParent, setActiveParent] = useState<CategoryNode | null>(
    parents.find(
      (parent) =>
        activeCategorySlug === parent.slug ||
        activeCategorySlug?.startsWith(`${parent.slug}-`),
    ) ??
      parents[0] ??
      null,
  );

  if (!activeParent) return null;

  return (
    <div className="flex min-w-[900px]">
      {/* LEFT */}
      <aside className="border-gray-2 w-56 border-r pr-4">
        <ul className="flex flex-col gap-1">
          {parents.map((parent) => {
            const isActive = activeParent?.id === parent.id;

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
                  {parent.label}
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
          {activeParent.children?.map((child) => {
            return (
              <div key={child.id} className="flex flex-col gap-2">
                <NavLink
                  to={`/products?category=${child.slug}`}
                  onClick={closeMenu}
                  className="text-s14-l20 text-orange flex items-center gap-x-1 font-medium hover:underline"
                >
                  <span>{child.label}</span>
                  <KeyboardArrowUpIcon className="fill-orange h-4 w-4 rotate-90" />
                </NavLink>

                {child.children && (
                  <ul className="flex flex-col gap-1">
                    {child.children.map((sub) => {
                      const isSubActive = activeCategorySlug === sub.slug;

                      return (
                        <li key={sub.id}>
                          <NavLink
                            to={`/products?category=${sub.slug}`}
                            onClick={closeMenu}
                            className={`text-s14-l20 block transition-colors ${
                              isSubActive
                                ? "text-orange underline"
                                : "text-text-primary hover:text-orange hover:underline"
                            }`}
                          >
                            {sub.label}
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
