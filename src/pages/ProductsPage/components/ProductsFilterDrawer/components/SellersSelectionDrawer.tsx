import { useSearchParams } from "react-router-dom";
import type { ReqAuthGetAllSellersResponse } from "../../../../../api/responses/ReqAuthGetAllSellersResponse.model";
import { KeyboardArrowUpIcon } from "../../../../../assets/icons";
import GenericCheckbox from "../../../../../shared/components/GenericCheckbox";
import { GenericDrawer } from "../../../../../shared/components/GenericDrawer";
import {
  BUTTON_PRIMARY,
  BUTTON_SIZE_LARGE,
} from "../../../../../shared/constants/CommonTailwindClasses.constants";
import { customTwMerge } from "../../../../../shared/utils/Tailwind.util";

const SellersSelectionDrawer = ({
  open,
  setOpen,
  sellers,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  sellers: ReqAuthGetAllSellersResponse;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedSellerIds =
    searchParams.get("sellers")?.split(",").map(Number) ?? [];

  const toggleSeller = (id: number) => {
    const next = selectedSellerIds.includes(id)
      ? selectedSellerIds.filter((sellerId) => sellerId !== id)
      : [...selectedSellerIds, id];

    const params = new URLSearchParams(searchParams);

    if (next.length === 0) {
      params.delete("sellers");
    } else {
      params.set("sellers", next.join(","));
    }

    setSearchParams(params);
  };

  const clearSellers = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("sellers");
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
                checked={selectedSellerIds.includes(seller.id)}
                onCheckedChange={() => toggleSeller(seller.id)}
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

export default SellersSelectionDrawer;
