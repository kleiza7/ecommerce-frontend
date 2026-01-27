import { useState } from "react";
import type { ReqAuthGetAllSellersResponse } from "../../../../../../../api/responses/ReqAuthGetAllSellersResponse.model";
import { KeyboardArrowUpIcon } from "../../../../../../../assets/icons";
import { useAuthGetAllSellers } from "../../../../../../../hooks/useAuthGetAllSellers";
import GenericCheckbox from "../../../../../../../shared/components/GenericCheckbox";
import {
  BUTTON_PRIMARY,
  BUTTON_SIZE_LARGE,
} from "../../../../../../../shared/constants/CommonTailwindClasses.constants";
import { customTwMerge } from "../../../../../../../shared/utils/Tailwind.util";

const SellersSelectionDrawerContent = ({
  initialSelectedSellers,
  onSellersSelected,
  close,
}: {
  initialSelectedSellers: ReqAuthGetAllSellersResponse;
  onSellersSelected: (sellers: ReqAuthGetAllSellersResponse) => void;
  close: () => void;
}) => {
  const { data: sellers = [] } = useAuthGetAllSellers();

  const [selectedSellers, setSelectedSellers] =
    useState<ReqAuthGetAllSellersResponse>(initialSelectedSellers);

  const toggleSeller = (seller: ReqAuthGetAllSellersResponse[number]) => {
    setSelectedSellers((prev) => {
      const exists = prev.some((s) => s.id === seller.id);

      if (exists) {
        return prev.filter((s) => s.id !== seller.id);
      }

      return [...prev, seller];
    });
  };

  const clearSellers = () => {
    setSelectedSellers([]);
  };

  return (
    <div className="bg-surface-primary flex h-full flex-col">
      {/* HEADER */}
      <div className="border-gray-2 flex items-center justify-between gap-3 border-b px-4 py-3">
        <button type="button" onClick={close} className="flex items-center">
          <KeyboardArrowUpIcon className="fill-orange h-8 w-8 -rotate-90" />
        </button>

        <span className="text-s16-l24 text-text-primary font-medium">
          Seller
        </span>

        <button
          type="button"
          onClick={clearSellers}
          className="text-orange text-s14-l20 font-medium"
        >
          Clear
        </button>
      </div>

      {/* LIST */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        {sellers.map((seller) => (
          <label
            key={seller.id}
            className="border-gray-2 flex cursor-pointer items-center gap-3 border-b px-4 py-4"
          >
            <GenericCheckbox
              checked={selectedSellers.some((s) => s.id === seller.id)}
              onCheckedChange={() => toggleSeller(seller)}
            />
            <span className="text-s14-l20 text-text-primary select-none">
              {seller.name}
            </span>
          </label>
        ))}
      </div>

      {/* FOOTER */}
      <div className="border-gray-2 border-t p-3">
        <button
          type="button"
          onClick={() => {
            onSellersSelected(selectedSellers);
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

export default SellersSelectionDrawerContent;
