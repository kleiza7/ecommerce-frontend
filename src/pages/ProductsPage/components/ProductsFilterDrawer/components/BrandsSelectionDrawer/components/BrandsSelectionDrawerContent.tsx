import { useState } from "react";
import type { ReqBrandsGetAllResponse } from "../../../../../../../api/responses/ReqBrandsGetAllResponse.model";
import { KeyboardArrowUpIcon } from "../../../../../../../assets/icons";
import { useBrandsGetAll } from "../../../../../../../hooks/useBrandsGetAll";
import GenericCheckbox from "../../../../../../../shared/components/GenericCheckbox";
import {
  BUTTON_PRIMARY,
  BUTTON_SIZE_LARGE,
} from "../../../../../../../shared/constants/CommonTailwindClasses.constants";
import { customTwMerge } from "../../../../../../../shared/utils/Tailwind.util";

const BrandsSelectionDrawerContent = ({
  initialSelectedBrands,
  onBrandsSelected,
  close,
}: {
  initialSelectedBrands: ReqBrandsGetAllResponse;
  onBrandsSelected: (brands: ReqBrandsGetAllResponse) => void;
  close: () => void;
}) => {
  const { data: brands = [] } = useBrandsGetAll();

  const [selectedBrands, setSelectedBrands] = useState<ReqBrandsGetAllResponse>(
    initialSelectedBrands,
  );

  const toggleBrand = (brand: ReqBrandsGetAllResponse[number]) => {
    setSelectedBrands((prev) => {
      const exists = prev.some((b) => b.id === brand.id);

      if (exists) {
        return prev.filter((b) => b.id !== brand.id);
      }

      return [...prev, brand];
    });
  };

  const clearBrands = () => {
    setSelectedBrands([]);
  };

  return (
    <div className="bg-surface-primary flex h-full flex-col">
      <div className="border-border-primary flex items-center justify-between gap-3 border-b px-4 py-3">
        <button type="button" onClick={close} className="flex items-center">
          <KeyboardArrowUpIcon className="fill-primary h-8 w-8 -rotate-90" />
        </button>

        <span className="text-s16-l24 text-text-primary font-medium">
          Brand
        </span>

        <button
          type="button"
          onClick={clearBrands}
          className="text-primary text-s14-l20 font-medium"
        >
          Clear
        </button>
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto">
        {brands.map((brand) => (
          <label
            key={brand.id}
            className="border-border-primary flex cursor-pointer items-center gap-3 border-b p-4"
          >
            <GenericCheckbox
              checked={selectedBrands.some((b) => b.id === brand.id)}
              onCheckedChange={() => toggleBrand(brand)}
            />
            <span className="text-s14-l20 text-text-primary select-none">
              {brand.name}
            </span>
          </label>
        ))}
      </div>

      <div className="border-border-primary border-t p-3">
        <button
          type="button"
          onClick={() => {
            onBrandsSelected(selectedBrands);
            close();
          }}
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
  );
};

export default BrandsSelectionDrawerContent;
