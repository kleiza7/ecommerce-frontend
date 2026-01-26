import { useForm, type SubmitHandler } from "react-hook-form";
import { useBrandsGetAll } from "../../../hooks/useBrandsGetAll";
import { useCurrenciesGetAll } from "../../../hooks/useCurrenciesGetAll";
import { useProductsCreate } from "../../../hooks/useProductsCreate";
import {
  BUTTON_PRIMARY,
  BUTTON_PRIMARY_OUTLINED,
} from "../../constants/CommonTailwindClasses.constants";
import { customTwMerge } from "../../utils/Tailwind.util";
import { GenericDialogClose, GenericDialogTitle } from "../GenericDialog";
import type { ProductFormType } from "../ProductFormFields";
import ProductFormFields from "../ProductFormFields";

const NewProductForm = ({ close }: { close: () => void }) => {
  const { data: brands = [] } = useBrandsGetAll();
  const { data: currencies = [] } = useCurrenciesGetAll();
  const { mutate: createProduct, isPending } = useProductsCreate();

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<ProductFormType>({
    mode: "onChange",
    defaultValues: {
      images: [],
    },
  });

  const onSubmit: SubmitHandler<ProductFormType> = (values) => {
    createProduct(
      {
        name: values.name,
        description: values.description,
        stockCount: values.stockCount,
        price: values.price,
        brandId: values.brand.id,
        categoryId: values.category.id,
        currencyId: values.currency.id,
        images: values.images,
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
        <GenericDialogTitle>Add New Product</GenericDialogTitle>
        <span className="text-s14-l20 text-gray-8">
          Please fill in the details to create a new product.
        </span>
      </div>

      <div className="flex-1 overflow-y-auto">
        <ProductFormFields
          control={control}
          errors={errors}
          brands={brands}
          currencies={currencies}
          disabled={isPending}
        />
      </div>

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
          disabled={!isValid || isPending}
          className={customTwMerge(BUTTON_PRIMARY, "px-4")}
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default NewProductForm;
