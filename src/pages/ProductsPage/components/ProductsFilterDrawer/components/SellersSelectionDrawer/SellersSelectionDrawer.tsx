import type { ReqAuthGetAllSellersResponse } from "../../../../../../api/responses/ReqAuthGetAllSellersResponse.model";
import { GenericDrawer } from "../../../../../../shared/components/GenericDrawer";
import SellersSelectionDrawerContent from "./components/SellersSelectionDrawerContent";

const SellersSelectionDrawer = ({
  open,
  setOpen,
  initialSelectedSellers,
  onSellersSelected,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialSelectedSellers: ReqAuthGetAllSellersResponse;
  onSellersSelected: (sellers: ReqAuthGetAllSellersResponse) => void;
}) => {
  return (
    <GenericDrawer
      open={open}
      onOpenChange={setOpen}
      side="right"
      className="h-svh"
      showCloseButton={false}
    >
      <SellersSelectionDrawerContent
        initialSelectedSellers={initialSelectedSellers}
        onSellersSelected={onSellersSelected}
        close={() => setOpen(false)}
      />
    </GenericDrawer>
  );
};

export default SellersSelectionDrawer;
