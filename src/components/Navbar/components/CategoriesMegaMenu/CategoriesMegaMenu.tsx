import { useCallback, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { MenuIcon } from "../../../../assets/icons";
import { useCategoriesGetAll } from "../../../../hooks/useCategoriesGetAll";
import GenericNavigationMenu from "../../../../shared/components/GenericNavigationMenu";
import CategoriesMegaMenuContent from "./components/CategoriesMegaMenuContent";

const CategoriesMegaMenu = () => {
  const { data: categories = [] } = useCategoriesGetAll();
  const [searchParams] = useSearchParams();
  const activeCategorySlug = searchParams.get("category");

  const [isNavigationMenuOpen, setIsNavigationMenuOpen] = useState(false);

  const closeMenu = useCallback(() => {
    setIsNavigationMenuOpen(false);
  }, []);

  const parentCategories = categories
    .filter((category) => category.parentId === null)
    .map((category) => ({
      id: category.id,
      label: category.name,
      slug: category.slug,
      children: categories
        .filter((categoryItem) => categoryItem.parentId === category.id)
        .map((child) => ({
          id: child.id,
          label: child.name,
          slug: child.slug,
          children: categories
            .filter((sub) => sub.parentId === child.id)
            .map((subItem) => ({
              id: subItem.id,
              label: subItem.name,
              slug: subItem.slug,
            })),
        })),
    }));

  return (
    <div className="flex h-8 items-center gap-x-6">
      <GenericNavigationMenu
        open={isNavigationMenuOpen}
        setOpen={setIsNavigationMenuOpen}
        trigger={
          <span className="flex items-center gap-2 font-semibold">
            <MenuIcon className="fill-text-primary" />
            All Categories
          </span>
        }
      >
        <CategoriesMegaMenuContent
          parents={parentCategories}
          closeMenu={closeMenu}
        />
      </GenericNavigationMenu>

      {/* TOP LEVEL CATEGORIES */}
      {parentCategories.map((parent) => {
        const isActive =
          activeCategorySlug === parent.slug ||
          activeCategorySlug?.startsWith(`${parent.slug}-`);

        return (
          <NavLink
            key={parent.id}
            to={`/products?category=${parent.slug}`}
            className={`text-s14-l20 relative flex h-8 items-center font-medium transition-colors ${
              isActive ? "text-orange" : "hover:text-orange text-text-primary"
            }`}
          >
            {parent.label}

            {/* ACTIVE BORDER */}
            {isActive && (
              <div className="bg-orange absolute bottom-0 left-0 h-0.5 w-full rounded-full" />
            )}
          </NavLink>
        );
      })}
    </div>
  );
};

export default CategoriesMegaMenu;
