import { useState } from "react";
import { MenuIcon } from "../../../../assets/icons";
import { useCategoriesGetAll } from "../../../../hooks/useCategoriesGetAll";
import GenericNavigationMenu from "../../../../shared/components/GenericNavigationMenu";
import CategoriesMegaMenuContent from "./components/CategoriesMegaMenuContent";

const CategoriesMegaMenu = () => {
  const { data: categories = [] } = useCategoriesGetAll();

  const [isNavigationMenuOpen, setIsNavigationMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsNavigationMenuOpen(false);
  };

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
    <GenericNavigationMenu
      open={isNavigationMenuOpen}
      setOpen={setIsNavigationMenuOpen}
      trigger={
        <span className="flex shrink-0 items-center gap-2 font-semibold">
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
  );
};

export default CategoriesMegaMenu;
