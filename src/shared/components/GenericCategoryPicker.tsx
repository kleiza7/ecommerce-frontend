import { useState } from "react";
import type { ReqCategoriesGetAllResponse } from "../../api/responses/ReqCategoriesGetAllResponse.model";
import CategorySelectionDialog from "./CategorySelectionDialog/CategorySelectionDialog";

const GenericCategoryPicker = ({
  value,
  onChange,
  disabled = false,
}: {
  value: ReqCategoriesGetAllResponse[number] | null;
  onChange: (category: ReqCategoriesGetAllResponse[number]) => void;
  disabled?: boolean;
}) => {
  const [isCategorySelectionDialogOpen, setIsCategorySelectionDialogOpen] =
    useState(false);

  if (disabled) {
    return (
      <span className="text-s14-l20 text-text-primary flex h-10 items-center truncate opacity-60">
        {value?.name ?? "-"}
      </span>
    );
  }

  return (
    <>
      {!value ? (
        <button
          type="button"
          onClick={() => setIsCategorySelectionDialogOpen(true)}
          className="border-gray-2 text-s14-l20 text-gray-7 hover:bg-gray-12 flex h-10 w-full cursor-pointer items-center justify-center rounded-lg border px-2"
        >
          Select Category
        </button>
      ) : (
        <div className="flex w-full items-center justify-between gap-x-4">
          <span className="text-s14-l20 text-text-primary truncate">
            {value.name}
          </span>

          <button
            type="button"
            onClick={() => setIsCategorySelectionDialogOpen(true)}
            className="border-gray-2 text-s14-l20 text-gray-7 hover:bg-gray-12 flex h-10 flex-1 cursor-pointer items-center justify-center rounded-lg border px-2"
          >
            Change Category
          </button>
        </div>
      )}

      <CategorySelectionDialog
        open={isCategorySelectionDialogOpen}
        setOpen={setIsCategorySelectionDialogOpen}
        initialSelectedCategory={value}
        onCategorySelected={onChange}
      />
    </>
  );
};

export default GenericCategoryPicker;
