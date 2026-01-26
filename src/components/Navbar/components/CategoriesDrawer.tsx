import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon, KeyboardArrowUpIcon } from "../../../assets/icons";
import { useCategoriesGetAll } from "../../../hooks/useCategoriesGetAll";
import { GenericDrawer } from "../../../shared/components/GenericDrawer";

type CategoryNode = {
  id: number;
  label: string;
  slug: string;
  parentId: number | null;
};

const CategoriesDrawer = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const navigate = useNavigate();
  const { data: categories = [] } = useCategoriesGetAll();

  const nodes: CategoryNode[] = useMemo(() => {
    return categories.map((category) => ({
      id: category.id,
      label: category.name,
      slug: category.slug,
      parentId: category.parentId ?? null,
    }));
  }, [categories]);

  const [path, setPath] = useState<CategoryNode[]>([]);

  const currentParent = path.length > 0 ? path[path.length - 1] : null;

  const currentParentId = currentParent ? currentParent.id : null;

  const visibleCategories = useMemo(() => {
    return nodes.filter((node) => node.parentId === currentParentId);
  }, [nodes, currentParentId]);

  const hasChildren = (categoryId: number) => {
    return nodes.some((node) => node.parentId === categoryId);
  };

  const handleCategoryClick = (category: CategoryNode) => {
    if (hasChildren(category.id)) {
      setPath((prev) => [...prev, category]);
      return;
    }

    onOpenChange(false);
    setPath([]);
    navigate(`/products?category=${category.slug}`);
  };

  const handleBack = () => {
    setPath((prev) => prev.slice(0, -1));
  };

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);

    if (!nextOpen) {
      setPath([]);
    }
  };

  return (
    <GenericDrawer
      open={open}
      onOpenChange={handleOpenChange}
      side="left"
      showCloseButton={true}
      className="h-svh"
    >
      {/* HEADER */}
      <div className="border-gray-2 flex h-14 items-center gap-3 border-b px-4">
        {path.length > 0 && (
          <button
            type="button"
            onClick={handleBack}
            className="flex h-8 w-8 items-center justify-center"
          >
            <ArrowLeftIcon className="fill-text-primary h-7 w-7" />
          </button>
        )}

        <span className="text-s20-l28 font-semibold">
          {currentParent?.label ?? "Categories"}
        </span>
      </div>

      {/* LIST */}
      <ul className="flex flex-col">
        {visibleCategories.map((category) => {
          const expandable = hasChildren(category.id);

          return (
            <li
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className="border-gray-2 hover:bg-gray-3 flex h-[52px] cursor-pointer items-center justify-between border-b px-4 transition-colors"
            >
              <span className="text-s16-l24 text-text-primary">
                {category.label}
              </span>

              {expandable && (
                <KeyboardArrowUpIcon className="fill-gray-8 h-6 w-6 rotate-90" />
              )}
            </li>
          );
        })}
      </ul>
    </GenericDrawer>
  );
};

export default CategoriesDrawer;
