import { useForm, type SubmitHandler } from "react-hook-form";
import { useBrandsCreate } from "../../../hooks/useBrandsCreate";
import {
  BUTTON_PRIMARY,
  BUTTON_PRIMARY_OUTLINED,
} from "../../constants/CommonTailwindClasses.constants";
import { customTwMerge } from "../../utils/Tailwind.util";
import type { BrandFormType } from "../BrandFormFields";
import BrandFormFields from "../BrandFormFields";
import { GenericDialogClose, GenericDialogTitle } from "../GenericDialog";

const NewBrandForm = ({ close }: { close: () => void }) => {
  const { mutate: createBrand, isPending } = useBrandsCreate();

  const { control, handleSubmit } = useForm<BrandFormType>({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  const onSubmit: SubmitHandler<BrandFormType> = (values) => {
    createBrand(
      {
        name: values.name,
      },
      {
        onSuccess: () => {
          close();
        },
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex h-full flex-col gap-y-6"
    >
      <div className="flex shrink-0 flex-col gap-y-1">
        <GenericDialogTitle>Add New Brand</GenericDialogTitle>
        <span className="text-s14-l20 text-text-muted">
          Please enter brand information.
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
          Create
        </button>
      </div>
    </form>
  );
};

export default NewBrandForm;
