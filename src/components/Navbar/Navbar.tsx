import { NavLink, useSearchParams } from "react-router-dom";
import { MenuIcon } from "../../assets/icons";
import { useCategoriesGetAll } from "../../hooks/useCategoriesGetAll";
import GenericNavigationMenu from "../../shared/components/GenericNavigationMenu";
import { useUserStore } from "../../stores/UserStore";
import AuthPopover from "./components/AuthPopover";
import CartLink from "./components/CartLink";
import MegaMenuContent from "./components/MegaMenuContent";
import UserPopover from "./components/UserPopover";

const Navbar = () => {
  const user = useUserStore((state) => state.user);
  const isAuthenticated = Boolean(user);

  const { data: categories = [] } = useCategoriesGetAll();

  const [searchParams] = useSearchParams();
  const activeCategorySlug = searchParams.get("category");

  /**
   * Flat → Tree (parent → child → sub) + SLUG
   */
  const parentCategories = categories
    .filter((cat) => cat.parentId === null)
    .map((cat) => ({
      id: cat.id,
      label: cat.name,
      slug: cat.slug,
      children: categories
        .filter((c) => c.parentId === cat.id)
        .map((child) => ({
          id: child.id,
          label: child.name,
          slug: child.slug,
          children: categories
            .filter((s) => s.parentId === child.id)
            .map((sub) => ({
              id: sub.id,
              label: sub.name,
              slug: sub.slug,
            })),
        })),
    }));

  return (
    <header className="border-gray-1 border-b">
      {/* ================= TOP BAR ================= */}
      <div className="flex h-[72px] items-center justify-between px-[10%]">
        <NavLink
          to="/dashboard"
          className="text-s48-l56 text-text-primary select-none"
        >
          Ecommerce
        </NavLink>

        <div className="flex gap-x-6">
          {isAuthenticated ? <UserPopover /> : <AuthPopover />}
          <CartLink />
        </div>
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="border-gray-1 border-t px-[10%]">
        <div className="flex h-14 items-center gap-x-6">
          {/* TÜM KATEGORİLER → MEGA MENU */}
          <GenericNavigationMenu
            trigger={
              <span className="flex items-center gap-2 font-semibold">
                <MenuIcon className="fill-text-primary" />
                Tüm Kategoriler
              </span>
            }
            content={<MegaMenuContent parents={parentCategories} />}
          />

          {/* SADECE LINK OLAN PARENT’LAR (QUERY PARAM ACTIVE) */}
          {parentCategories.map((parent) => {
            const isActive =
              activeCategorySlug === parent.slug ||
              activeCategorySlug?.startsWith(`${parent.slug}-`);

            return (
              <NavLink
                key={parent.id}
                to={`/products?category=${parent.slug}`}
                className={`text-sm font-medium ${
                  isActive
                    ? "text-orange-500"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                {parent.label}
              </NavLink>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
