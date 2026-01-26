import { NavLink, useSearchParams } from "react-router-dom";
import { useCategoriesGetAll } from "../../../hooks/useCategoriesGetAll";

const ParentCategories = () => {
  const { data: categories = [] } = useCategoriesGetAll();
  const [searchParams] = useSearchParams();

  const activeCategorySlug = searchParams.get("category");

  const parentCategories = categories
    .filter((category) => category.parentId === null)
    .map((category) => ({
      id: category.id,
      label: category.name,
      slug: category.slug,
    }));

  return (
    <div className="relative min-w-0 flex-1">
      <div className="no-scrollbar flex h-8 items-center gap-x-6 overflow-x-auto pr-10 whitespace-nowrap">
        {parentCategories.map((parent) => {
          const isActive =
            activeCategorySlug === parent.slug ||
            activeCategorySlug?.startsWith(`${parent.slug}-`);

          return (
            <NavLink
              key={parent.id}
              to={`/products?category=${parent.slug}`}
              className={`text-s14-l20 relative flex h-8 shrink-0 items-center font-medium transition-colors ${
                isActive ? "text-orange" : "hover:text-orange text-text-primary"
              }`}
            >
              {parent.label}

              {isActive && (
                <div className="bg-orange absolute bottom-0 left-0 h-0.5 w-full rounded-full" />
              )}
            </NavLink>
          );
        })}
      </div>

      <div className="from-surface-primary pointer-events-none absolute top-0 right-0 h-full w-8 bg-linear-to-l to-transparent" />
    </div>
  );
};

export default ParentCategories;
