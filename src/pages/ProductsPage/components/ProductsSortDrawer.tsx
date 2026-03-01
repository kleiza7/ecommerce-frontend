import { Fragment, useCallback } from "react";
import { CheckIcon } from "../../../assets/icons";
import { useProductsNavigation } from "../../../hooks/useProductsNavigation";
import { GenericDrawer } from "../../../shared/components/GenericDrawer";

const SORT_OPTIONS: { label: string; value: string }[] = [
  { label: "Recommended", value: "recommended" },
  { label: "Lowest Price", value: "price-asc" },
  { label: "Highest Price", value: "price-desc" },
  { label: "Newest", value: "createdAt-desc" },
];

const ProductsSortDrawer = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const { sortBy, goToProductsPage } = useProductsNavigation();

  const selectedValue = sortBy ?? "recommended";

  const close = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleSelect = useCallback(
    (value: string) => {
      goToProductsPage({
        sortBy: value === "recommended" ? undefined : value,
      });

      close();
    },
    [close, goToProductsPage],
  );

  return (
    <GenericDrawer
      open={open}
      onOpenChange={setOpen}
      side="bottom"
      className="rounded-t-xl"
    >
      <div className="border-border-primary bg-surface-primary flex items-center justify-between border-b px-4 py-3">
        <span className="text-s16-l24 text-text-primary font-semibold">
          Sort
        </span>
      </div>

      <div className="flex flex-col">
        {SORT_OPTIONS.map((option, index) => {
          const isActive = selectedValue === option.value;

          return (
            <Fragment key={option.value}>
              <button
                onClick={() => handleSelect(option.value)}
                className="flex items-center justify-between p-4"
              >
                <span
                  className={`text-s14-l20 text-text-primary ${
                    isActive ? "font-semibold" : ""
                  }`}
                >
                  {option.label}
                </span>

                {isActive && <CheckIcon className="fill-primary h-6 w-6" />}
              </button>
              {index !== SORT_OPTIONS.length - 1 && (
                <div className="bg-surface-secondary h-px" />
              )}
            </Fragment>
          );
        })}
      </div>
    </GenericDrawer>
  );
};

export default ProductsSortDrawer;
