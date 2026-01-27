import type { ReqCategoriesGetAllResponse } from "../../../../../../api/responses/ReqCategoriesGetAllResponse.model";
import { GenericDrawer } from "../../../../../../shared/components/GenericDrawer";
import CategorySelectionDrawerContent from "./components/CategorySelectionDrawerContent";

const CategorySelectionDrawer = ({
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
      side="right"
      className="h-svh"
      showOverlay={false}
    >
      <CategorySelectionDrawerContent
        initialSelectedCategory={initialSelectedCategory}
        onCategorySelected={onCategorySelected}
        close={() => setOpen(false)}
      />
    </GenericDrawer>
  );
};

export default CategorySelectionDrawer;
