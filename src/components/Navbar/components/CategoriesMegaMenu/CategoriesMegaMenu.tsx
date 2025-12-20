import { NavLink, useSearchParams } from "react-router-dom";
import { MenuIcon } from "../../../../assets/icons";
import { useCategoriesGetAll } from "../../../../hooks/useCategoriesGetAll";
import GenericNavigationMenu from "../../../../shared/components/GenericNavigationMenu";
import CategoriesMegaMenuContent from "./components/CategoriesMegaMenuContent";

const CategoriesMegaMenu = () => {
  const { data: categories = [] } = useCategoriesGetAll();

  const [searchParams] = useSearchParams();
  const activeCategorySlug = searchParams.get("category");

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
        trigger={
          <span className="flex items-center gap-2 font-semibold">
            <MenuIcon className="fill-text-primary" />
            All Categories
          </span>
        }
        content={<CategoriesMegaMenuContent parents={parentCategories} />}
      />

      {parentCategories.map((parent) => {
        const isActive =
          activeCategorySlug === parent.slug ||
          activeCategorySlug?.startsWith(`${parent.slug}-`);

        return (
          <NavLink
            key={parent.id}
            to={`/products?category=${parent.slug}`}
            className={`text-sm font-medium ${
              isActive ? "text-orange" : "text-gray-700 hover:text-gray-900"
            }`}
          >
            {parent.label}
          </NavLink>
        );
      })}
    </div>
  );
};

export default CategoriesMegaMenu;
