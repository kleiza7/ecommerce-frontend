import { useSearchParams } from "react-router-dom";
import type { ReqBrandsGetAllResponse } from "../../../../../api/responses/ReqBrandsGetAllResponse.model";
import { KeyboardArrowUpIcon } from "../../../../../assets/icons";
import GenericCheckbox from "../../../../../shared/components/GenericCheckbox";
import { GenericDrawer } from "../../../../../shared/components/GenericDrawer";
import {
  BUTTON_PRIMARY,
  BUTTON_SIZE_LARGE,
} from "../../../../../shared/constants/CommonTailwindClasses.constants";
import { customTwMerge } from "../../../../../shared/utils/Tailwind.util";

const BrandsSelectionDrawer = ({
  open,
  setOpen,
  brands,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  brands: ReqBrandsGetAllResponse;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedBrandSlugs = searchParams.get("brands")?.split(",") ?? [];

  const toggleBrand = (slug: string) => {
    const next = selectedBrandSlugs.includes(slug)
      ? selectedBrandSlugs.filter((brandSlug) => brandSlug !== slug)
      : [...selectedBrandSlugs, slug];

    const params = new URLSearchParams(searchParams);

    if (next.length === 0) {
      params.delete("brands");
    } else {
      params.set("brands", next.join(","));
    }

    setSearchParams(params);
  };

  const clearBrands = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("brands");
    setSearchParams(params);
  };

  return (
    <GenericDrawer
      open={open}
      onOpenChange={setOpen}
      side="right"
      className="h-svh"
      showCloseButton={false}
    >
      <div className="bg-surface-primary flex h-full flex-col">
        {/* HEADER */}
        <div className="border-gray-2 flex items-center justify-between gap-3 border-b px-4 py-3">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex items-center"
          >
            <KeyboardArrowUpIcon className="fill-orange h-8 w-8 -rotate-90" />
          </button>

          <span className="text-s16-l24 text-text-primary font-medium">
            Brand
          </span>

          <button
            type="button"
            onClick={clearBrands}
            className="text-orange text-s14-l20 font-medium"
          >
            Clear
          </button>
        </div>

        {/* LIST */}
        <div className="flex flex-1 flex-col overflow-y-auto">
          {brands.map((brand) => (
            <label
              key={brand.id}
              className="border-gray-2 flex cursor-pointer items-center gap-3 border-b px-4 py-4"
            >
              <GenericCheckbox
                checked={selectedBrandSlugs.includes(brand.slug)}
                onCheckedChange={() => toggleBrand(brand.slug)}
              />
              <span className="text-s14-l20 text-text-primary select-none">
                {brand.name}
              </span>
            </label>
          ))}
        </div>

        {/* FOOTER */}
        <div className="border-gray-2 border-t p-3">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className={customTwMerge(
              BUTTON_PRIMARY,
              BUTTON_SIZE_LARGE,
              "w-full rounded-sm",
            )}
          >
            Apply
          </button>
        </div>
      </div>
    </GenericDrawer>
  );
};

export default BrandsSelectionDrawer;
