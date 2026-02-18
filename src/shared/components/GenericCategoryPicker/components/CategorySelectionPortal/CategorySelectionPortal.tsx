import type { ReqCategoriesGetAllResponse } from "../../../../../api/responses/ReqCategoriesGetAllResponse.model";
import { useMediaQuery } from "../../../../../hooks/useMediaQuery";
import { MEDIA_QUERY } from "../../../../constants/MediaQuery.constants";
import CategorySelectionColumnDrawer from "./components/CategorySelectionColumnDrawer/CategorySelectionColumnDrawer";
import CategorySelectionDialog from "./components/CategorySelectionDialog/CategorySelectionDialog";
import CategorySelectionDrillDrawer from "./components/CategorySelectionDrillDrawer/CategorySelectionDrillDrawer";

const CategorySelectionPortal = ({
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
  const isMobile = useMediaQuery(MEDIA_QUERY.BELOW_MD);
  const isTablet = useMediaQuery(MEDIA_QUERY.BELOW_LG) && !isMobile;

  if (isMobile) {
    return (
      <CategorySelectionDrillDrawer
        open={open}
        setOpen={setOpen}
        initialSelectedCategory={initialSelectedCategory}
        onCategorySelected={onCategorySelected}
      />
    );
  }

  if (isTablet) {
    return (
      <CategorySelectionColumnDrawer
        open={open}
        setOpen={setOpen}
        initialSelectedCategory={initialSelectedCategory}
        onCategorySelected={onCategorySelected}
      />
    );
  }

  return (
    <CategorySelectionDialog
      open={open}
      setOpen={setOpen}
      initialSelectedCategory={initialSelectedCategory}
      onCategorySelected={onCategorySelected}
    />
  );
};

export default CategorySelectionPortal;
