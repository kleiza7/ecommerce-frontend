import { useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";

type CategoryNode = {
  id: number;
  label: string;
  slug: string;
  children?: CategoryNode[];
};

type CategoriesMegaMenuContentProps = {
  parents: CategoryNode[];
};

const CategoriesMegaMenuContent = ({
  parents,
}: CategoriesMegaMenuContentProps) => {
  const [searchParams] = useSearchParams();
  const activeCategorySlug = searchParams.get("category");

  const [activeParent, setActiveParent] = useState<CategoryNode | null>(
    parents.find(
      (p) =>
        activeCategorySlug === p.slug ||
        activeCategorySlug?.startsWith(`${p.slug}-`),
    ) ??
      parents[0] ??
      null,
  );

  if (!activeParent) return null;

  return (
    <div className="flex min-w-[900px]">
      <aside className="w-56 border-r pr-4">
        <ul className="space-y-1">
          {parents.map((parent) => {
            const isActive =
              activeCategorySlug === parent.slug ||
              activeCategorySlug?.startsWith(`${parent.slug}-`);

            return (
              <li
                key={parent.id}
                onMouseEnter={() => setActiveParent(parent)}
                className={`text-s14-l20 cursor-pointer rounded px-3 py-2 ${
                  isActive
                    ? "text-orange bg-orange-50 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {parent.label}
              </li>
            );
          })}
        </ul>
      </aside>

      <section className="flex-1 pl-6">
        <div className="grid grid-cols-3 gap-8">
          {activeParent.children?.map((child) => {
            const isChildActive =
              activeCategorySlug === child.slug ||
              activeCategorySlug?.startsWith(`${child.slug}-`);

            return (
              <div key={child.id}>
                <NavLink
                  to={`/products?category=${child.slug}`}
                  className={`text-s14-l20 mb-2 block font-semibold ${
                    isChildActive
                      ? "text-orange"
                      : "hover:text-orange text-gray-900"
                  }`}
                >
                  {child.label}
                </NavLink>

                {child.children && (
                  <ul className="space-y-1">
                    {child.children.map((sub) => {
                      const isSubActive = activeCategorySlug === sub.slug;

                      return (
                        <li key={sub.id}>
                          <NavLink
                            to={`/products?category=${sub.slug}`}
                            className={`text-s14-l20 ${
                              isSubActive
                                ? "text-orange"
                                : "text-gray-600 hover:text-gray-900"
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
