import type { ReqCategoriesGetAllResponse } from "../../../../../api/responses/ReqCategoriesGetAllResponse.model";
import { GenericDrawer } from "../../../GenericDrawer";
import CategorySelectionDrillDrawerContent from "./components/CategorySelectionDrillDrawerContent";

const CategorySelectionDrillDrawer = ({
  open,
  setOpen,
  initialSelectedCategory,
  onCategorySelected,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialSelectedCategory: ReqCategoriesGetAllResponse[number] | null;
  onCategorySelected: (category: ReqCategoriesGetAllResponse[number]) => void;
}) => {
  return (
    <GenericDrawer
      open={open}
      onOpenChange={setOpen}
      side="bottom"
      className="h-svh"
      showOverlay={false}
    >
      <CategorySelectionDrillDrawerContent
        initialSelectedCategory={initialSelectedCategory}
        onCategorySelected={onCategorySelected}
        close={() => setOpen(false)}
      />
    </GenericDrawer>
  );
};

export default CategorySelectionDrillDrawer;
