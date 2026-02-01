import { Controller, useFormState, type Control } from "react-hook-form";
import type { ReqBrandsGetAllResponse } from "../../api/responses/ReqBrandsGetAllResponse.model";
import type { ReqCategoriesGetAllResponse } from "../../api/responses/ReqCategoriesGetAllResponse.model";
import type { ReqCurrenciesGetAllResponse } from "../../api/responses/ReqCurrenciesGetAllResponse.model";
import GenericCategoryPicker from "./GenericCategoryPicker/GenericCategoryPicker";
import GenericFormInput from "./GenericFormInput";
import GenericFormTextArea from "./GenericFormTextArea";
import GenericImageInput from "./GenericImageInput";
import GenericSelect from "./GenericSelect";
import InputErrorLabel from "./InputErrorLabel";
import InputLabel from "./InputLabel";

export type ProductFormType = {
  name: string;
  description: string;
  stockCount: number;
  price: number;
  brand: ReqBrandsGetAllResponse[number];
  category: ReqCategoriesGetAllResponse[number];
  currency: ReqCurrenciesGetAllResponse[number];
  images: File[];
};

const ProductFormFields = ({
  control,
  brands,
  currencies,
  disabled = false,
}: {
  control: Control<ProductFormType>;
  brands: ReqBrandsGetAllResponse;
  currencies: ReqCurrenciesGetAllResponse;
  disabled?: boolean;
}) => {
  const { errors } = useFormState({ control });

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="flex flex-col gap-y-5 pb-4">
        <div className="relative flex flex-col">
          <InputLabel label="Name" hasAsterisk />

          <GenericFormInput
            field="name"
            control={control}
            required
            hasError={!!errors.name}
            disabled={disabled}
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
            hasError={!!errors.description}
            disabled={disabled}
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
                disabled={disabled}
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
                disabled={disabled}
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
            hasError={!!errors.stockCount}
            disabled={disabled}
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
              hasError={!!errors.price}
              disabled={disabled}
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
                  disabled={disabled}
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
            disabled={disabled}
            exactFileCount={4}
          />

          <InputErrorLabel message={errors.images?.message} />
        </div>
      </div>
    </div>
  );
};

export default ProductFormFields;
