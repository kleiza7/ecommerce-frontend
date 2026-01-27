import type { ReqBrandsGetAllResponse } from "../../../../../../api/responses/ReqBrandsGetAllResponse.model";
import { GenericDrawer } from "../../../../../../shared/components/GenericDrawer";
import BrandsSelectionDrawerContent from "./components/BrandsSelectionDrawerContent";

const BrandsSelectionDrawer = ({
  open,
  setOpen,
  initialSelectedBrands,
  onBrandsSelected,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialSelectedBrands: ReqBrandsGetAllResponse;
  onBrandsSelected: (brands: ReqBrandsGetAllResponse) => void;
}) => {
  return (
    <GenericDrawer
      open={open}
      onOpenChange={setOpen}
      side="right"
      className="h-svh"
      showCloseButton={false}
    >
      <BrandsSelectionDrawerContent
        initialSelectedBrands={initialSelectedBrands}
        onBrandsSelected={onBrandsSelected}
        close={() => setOpen(false)}
      />
    </GenericDrawer>
  );
};

export default BrandsSelectionDrawer;
