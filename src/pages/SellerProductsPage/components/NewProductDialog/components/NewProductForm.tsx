import { useForm, type SubmitHandler } from "react-hook-form";
import { useBrandsGetAll } from "../../../../../hooks/useBrandsGetAll";
import { useCurrenciesGetAll } from "../../../../../hooks/useCurrenciesGetAll";
import { useProductsCreate } from "../../../../../hooks/useProductsCreate";
import {
  GenericDialogClose,
  GenericDialogTitle,
} from "../../../../../shared/components/GenericDialog";
import type { ProductFormType } from "../../../../../shared/components/ProductFormFields";
import ProductFormFields from "../../../../../shared/components/ProductFormFields";
import {
  BUTTON_PRIMARY,
  BUTTON_PRIMARY_OUTLINED,
} from "../../../../../shared/constants/CommonTailwindClasses.constants";
import { customTwMerge } from "../../../../../shared/utils/Tailwind.util";

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
      className="relative flex flex-col gap-y-6"
    >
      <div className="flex flex-col gap-y-1">
        <GenericDialogTitle>Add New Product</GenericDialogTitle>
        <span className="text-s14-l20 text-gray-8">
          Please fill in the details to create a new product.
        </span>
      </div>

      <ProductFormFields
        control={control}
        errors={errors}
        brands={brands}
        currencies={currencies}
        disabled={isPending}
      />

      <div className="flex justify-end gap-x-2">
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
