import type { ReqCategoriesGetAllResponse } from "../../../api/responses/ReqCategoriesGetAllResponse.model";
import { GenericDialog } from "../GenericDialog";
import CategorySelectionDialogContent from "./components/CategorySelectionDialogContent";

const CategorySelectionDialog = ({
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
    <GenericDialog
      open={open}
      onOpenChange={setOpen}
      className="h-[80vh] w-[90vw] max-w-none"
    >
      <CategorySelectionDialogContent
        initialSelectedCategory={initialSelectedCategory}
        onCategorySelected={onCategorySelected}
        close={() => setOpen(false)}
      />
    </GenericDialog>
  );
};

export default CategorySelectionDialog;
