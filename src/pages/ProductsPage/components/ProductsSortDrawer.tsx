import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { CheckIcon } from "../../../assets/icons";
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
  const [params, setSearchParams] = useSearchParams();

  const selectedValue = params.get("sortBy") ?? "recommended";

  const close = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleSelect = (value: string) => {
    const nextParams = new URLSearchParams(params);

    if (value === "recommended") {
      nextParams.delete("sortBy");
    } else {
      nextParams.set("sortBy", value);
    }

    setSearchParams(nextParams);
    close();
  };

  return (
    <GenericDrawer
      open={open}
      onOpenChange={setOpen}
      side="bottom"
      className="rounded-t-xl"
    >
      <div className="border-gray-2 flex items-center justify-between border-b px-5 py-4">
        <span className="text-s16-l24 text-text-primary font-semibold">
          Sort
        </span>
      </div>

      <div className="flex flex-col px-5 py-2">
        {SORT_OPTIONS.map((option) => {
          const isActive = selectedValue === option.value;

          return (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="flex items-center justify-between py-1.5"
            >
              <span
                className={`text-s14-l20 text-text-primary ${isActive ? "font-semibold" : ""}`}
              >
                {option.label}
              </span>

              {isActive && <CheckIcon className="fill-orange h-5 w-5" />}
            </button>
          );
        })}
      </div>
    </GenericDrawer>
  );
};

export default ProductsSortDrawer;
