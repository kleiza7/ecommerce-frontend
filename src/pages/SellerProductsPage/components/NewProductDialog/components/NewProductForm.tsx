import { useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import type { ReqBrandsGetAllResponse } from "../../../../../api/responses/ReqBrandsGetAllResponse.model";
import type { ReqCategoriesGetAllResponse } from "../../../../../api/responses/ReqCategoriesGetAllResponse.model";
import type { ReqCurrenciesGetAllResponse } from "../../../../../api/responses/ReqCurrenciesGetAllResponse.model";
import { useBrandsGetAll } from "../../../../../hooks/useBrandsGetAll";
import { useCurrenciesGetAll } from "../../../../../hooks/useCurrenciesGetAll";
import { useProductsCreate } from "../../../../../hooks/useProductsCreate";
import CategorySelectionDialog from "../../../../../shared/components/CategorySelectionDialog/CategorySelectionDialog";
import {
  GenericDialogClose,
  GenericDialogTitle,
} from "../../../../../shared/components/GenericDialog";
import GenericFormInput from "../../../../../shared/components/GenericFormInput";
import GenericFormTextArea from "../../../../../shared/components/GenericFormTextArea";
import GenericSelect from "../../../../../shared/components/GenericSelect";
import InputErrorLabel from "../../../../../shared/components/InputErrorLabel";
import InputLabel from "../../../../../shared/components/InputLabel";

type ProductCreateFormType = {
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
    setValue,
    formState: { isValid, errors },
  } = useForm<ProductCreateFormType>({
    mode: "onChange",
  });

  const [isCategorySelectionDialogOpen, setIsCategorySelectionDialogOpen] =
    useState(false);

  const onSubmit: SubmitHandler<ProductCreateFormType> = (values) => {
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
        <span className="text-s14-l20 text-gray-500">
          Please fill in the details to create a new product.
        </span>
      </div>

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
              <>
                {!field.value ? (
                  <button
                    type="button"
                    onClick={() => setIsCategorySelectionDialogOpen(true)}
                    className="border-gray-2 text-s14-l20 flex h-10 w-full items-center justify-center rounded-lg border px-2 text-gray-400 hover:bg-gray-50"
                  >
                    Select Category
                  </button>
                ) : (
                  <div className="flex w-full items-center justify-between gap-x-4">
                    <span className="text-s14-l20 truncate text-gray-900">
                      {field.value.name}
                    </span>

                    <button
                      type="button"
                      onClick={() => setIsCategorySelectionDialogOpen(true)}
                      className="border-gray-2 text-s14-l20 flex h-10 flex-1 items-center justify-center rounded-lg border px-2 text-gray-400 hover:bg-gray-50"
                    >
                      Change Category
                    </button>
                  </div>
                )}

                <CategorySelectionDialog
                  open={isCategorySelectionDialogOpen}
                  setOpen={setIsCategorySelectionDialogOpen}
                  initialSelectedCategory={field.value}
                  onCategorySelected={field.onChange}
                />
              </>
            )}
          />

          <InputErrorLabel message={errors.category?.message} />
        </div>

        <div className="relative flex flex-col">
          <InputLabel label="Stock Count" hasAsterisk />
          <GenericFormInput
            field="stockCount"
            control={control}
            type="number"
            min={1}
            required
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
              type="number"
              min={1}
              required
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
          <input
            type="file"
            multiple
            disabled={isPending}
            onChange={(e) =>
              setValue("images", Array.from(e.target.files ?? []), {
                shouldValidate: true,
              })
            }
            className="text-s14-l20 border-gray-2 h-12 rounded-[10px] border px-5"
          />
          <InputErrorLabel message={errors.images?.message} />
        </div>
      </div>

      <div className="flex justify-end gap-x-2">
        <GenericDialogClose>
          <button
            type="button"
            disabled={isPending}
            onClick={close}
            className="text-s14-l20 rounded-md border px-4 py-2 hover:bg-gray-50"
          >
            Cancel
          </button>
        </GenericDialogClose>

        <button
          type="submit"
          disabled={!isValid || isPending}
          className={`text-s14-l20 rounded-md px-4 py-2 text-white ${
            !isValid || isPending
              ? "bg-orange/40 cursor-not-allowed"
              : "bg-orange hover:bg-orange/90"
          }`}
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default NewProductForm;
