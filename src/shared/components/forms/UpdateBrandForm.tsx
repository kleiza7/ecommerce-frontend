import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useBrandsGetById } from "../../../hooks/useBrandsGetById";
import { useBrandsUpdate } from "../../../hooks/useBrandsUpdate";
import {
  BUTTON_PRIMARY,
  BUTTON_PRIMARY_OUTLINED,
} from "../../constants/CommonTailwindClasses.constants";
import { customTwMerge } from "../../utils/Tailwind.util";
import type { BrandFormType } from "../BrandFormFields";
import BrandFormFields from "../BrandFormFields";
import { GenericDialogClose, GenericDialogTitle } from "../GenericDialog";

const UpdateBrandForm = ({
  brandId,
  close,
}: {
  brandId: number;
  close: () => void;
}) => {
  const { data: brand, isLoading } = useBrandsGetById(brandId);
  const { mutate: updateBrand, isPending } = useBrandsUpdate();

  const { control, handleSubmit, reset } = useForm<BrandFormType>({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  const onSubmit: SubmitHandler<BrandFormType> = (values) => {
    updateBrand(
      {
        id: brandId,
        name: values.name,
      },
      {
        onSuccess: () => {
          close();
        },
      },
    );
  };

  useEffect(() => {
    if (!brand) {
      return;
    }

    reset({
      name: brand.name,
    });
  }, [brand, reset]);

  if (isLoading || !brand) {
    return null;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex h-full flex-col gap-y-6"
    >
      <div className="flex shrink-0 flex-col gap-y-1">
        <GenericDialogTitle>Update Brand</GenericDialogTitle>
        <span className="text-s14-l20 text-gray-8">
          Update the brand information.
        </span>
      </div>

      <BrandFormFields control={control} disabled={isPending} />

      <div className="flex shrink-0 justify-end gap-x-2">
        <GenericDialogClose>
          <button
            type="button"
            disabled={isPending}
            onClick={close}
            className={customTwMerge(BUTTON_PRIMARY_OUTLINED, "px-4")}
          >
            Cancel
          </button>
        </GenericDialogClose>

        <button
          type="submit"
          disabled={isPending}
          className={customTwMerge(BUTTON_PRIMARY, "px-4")}
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default UpdateBrandForm;
