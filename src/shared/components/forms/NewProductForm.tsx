import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import type { ReqBrandsGetAllResponse } from "../../../api/responses/ReqBrandsGetAllResponse.model";
import type { ReqCategoriesGetAllResponse } from "../../../api/responses/ReqCategoriesGetAllResponse.model";
import type { ReqCurrenciesGetAllResponse } from "../../../api/responses/ReqCurrenciesGetAllResponse.model";
import { useBrandsGetAll } from "../../../hooks/useBrandsGetAll";
import { useCurrenciesGetAll } from "../../../hooks/useCurrenciesGetAll";
import { useProductsCreate } from "../../../hooks/useProductsCreate";
import {
  BUTTON_PRIMARY,
  BUTTON_PRIMARY_OUTLINED,
} from "../../constants/CommonTailwindClasses.constants";
import { customTwMerge } from "../../utils/Tailwind.util";
import GenericCategoryPicker from "../GenericCategoryPicker/GenericCategoryPicker";
import { GenericDialogClose, GenericDialogTitle } from "../GenericDialog";
import GenericFormInput from "../GenericFormInput";
import GenericFormTextArea from "../GenericFormTextArea";
import GenericImageInput from "../GenericImageInput";
import GenericSelect from "../GenericSelect";
import InputErrorLabel from "../InputErrorLabel";
import InputLabel from "../InputLabel";

type NewProductFormType = {
  name: string;
  description: string;
  stockCount: number;
  price: number;
  brand: ReqBrandsGetAllResponse[number];
  category: ReqCategoriesGetAllResponse[number];
  currency: ReqCurrenciesGetAllResponse[number];
  images: File[];
};

const NewProductForm = ({ close }: { close: () => void }) => {
  const { data: brands = [] } = useBrandsGetAll();
  const { data: currencies = [] } = useCurrenciesGetAll();
  const { mutate: createProduct, isPending } = useProductsCreate();

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<NewProductFormType>({
    mode: "onChange",
    defaultValues: {
      images: [],
    },
  });

  const onSubmit: SubmitHandler<NewProductFormType> = (values) => {
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
        <div className="flex flex-col gap-y-5">
          <div className="relative flex flex-col">
            <InputLabel label="Name" hasAsterisk />

            <GenericFormInput
              field="name"
              control={control}
              required
              disabled={isPending}
            />

            <InputErrorLabel message={errors.name?.message} />
          </div>

          <div className="relative flex flex-col">
            <InputLabel label="Description" hasAsterisk />

            <GenericFormTextArea
              field="description"
              control={control}
              required
              rows={4}
              disabled={isPending}
            />
            <InputErrorLabel message={errors.description?.message} />
          </div>

          <div className="relative flex flex-col">
            <InputLabel label="Brand" hasAsterisk />

            <Controller
              name="brand"
              control={control}
              rules={{ required: "Brand is required!" }}
              render={({ field }) => (
                <GenericSelect
                  placeholder="Select brand"
                  value={field.value}
                  options={brands.map((brand) => ({
                    label: brand.name,
                    value: brand,
                  }))}
                  onChange={field.onChange}
                  disabled={isPending}
                />
              )}
            />

            <InputErrorLabel message={errors.brand?.message} />
          </div>

          <div className="relative flex flex-col">
            <InputLabel label="Category" hasAsterisk />

            <Controller
              name="category"
              control={control}
              rules={{ required: "Category is required!" }}
              render={({ field }) => (
                <GenericCategoryPicker
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isPending}
                />
              )}
            />

            <InputErrorLabel message={errors.category?.message} />
          </div>

          <div className="relative flex flex-col">
            <InputLabel label="Stock Count" hasAsterisk />

            <GenericFormInput
              field="stockCount"
              control={control}
              required
              type="number"
              min={1}
              disabled={isPending}
            />

            <InputErrorLabel message={errors.stockCount?.message} />
          </div>

          <div className="flex gap-x-4">
            <div className="relative flex flex-1 flex-col">
              <InputLabel label="Price" hasAsterisk />

              <GenericFormInput
                field="price"
                control={control}
                required
                type="number"
                min={1}
                disabled={isPending}
              />

              <InputErrorLabel message={errors.price?.message} />
            </div>

            <div className="relative flex flex-1 flex-col">
              <InputLabel label="Currency" hasAsterisk />

              <Controller
                name="currency"
                control={control}
                rules={{ required: "Currency is required!" }}
                render={({ field }) => (
                  <GenericSelect
                    placeholder="Select currency"
                    value={field.value}
                    options={currencies.map((currency) => ({
                      label: currency.code,
                      value: currency,
                    }))}
                    onChange={field.onChange}
                    disabled={isPending}
                  />
                )}
              />

              <InputErrorLabel message={errors.currency?.message} />
            </div>
          </div>

          <div className="relative flex flex-col">
            <InputLabel label="Images" hasAsterisk />

            <GenericImageInput
              field="images"
              control={control}
              disabled={isPending}
              exactFileCount={4}
            />

            <InputErrorLabel message={errors.images?.message} />
          </div>
        </div>
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
