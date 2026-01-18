import { useCallback, useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import type { ReqBrandsGetAllResponse } from "../../../../../api/responses/ReqBrandsGetAllResponse.model";
import type { ReqCategoriesGetAllResponse } from "../../../../../api/responses/ReqCategoriesGetAllResponse.model";
import type { ReqCurrenciesGetAllResponse } from "../../../../../api/responses/ReqCurrenciesGetAllResponse.model";
import type { ReqProductsGetByIdResponse } from "../../../../../api/responses/ReqProductsGetByIdResponse.model";
import { useBrandsGetAll } from "../../../../../hooks/useBrandsGetAll";
import { useCategoriesGetAll } from "../../../../../hooks/useCategoriesGetAll";
import { useCurrenciesGetAll } from "../../../../../hooks/useCurrenciesGetAll";
import { useProductsApprove } from "../../../../../hooks/useProductsApprove";
import { useProductsGetById } from "../../../../../hooks/useProductsGetById";
import { useProductsReject } from "../../../../../hooks/useProductsReject";
import GenericCategoryPicker from "../../../../../shared/components/GenericCategoryPicker";
import {
  GenericDialogClose,
  GenericDialogTitle,
} from "../../../../../shared/components/GenericDialog";
import GenericFormInput from "../../../../../shared/components/GenericFormInput";
import GenericFormTextArea from "../../../../../shared/components/GenericFormTextArea";
import GenericImageInput from "../../../../../shared/components/GenericImageInput";
import GenericSelect from "../../../../../shared/components/GenericSelect";
import InputErrorLabel from "../../../../../shared/components/InputErrorLabel";
import InputLabel from "../../../../../shared/components/InputLabel";
import {
  BUTTON_ERROR,
  BUTTON_PRIMARY,
  BUTTON_PRIMARY_OUTLINED,
} from "../../../../../shared/constants/CommonTailwindClasses.constants";
import { customTwMerge } from "../../../../../shared/utils/Tailwind.util";

type ProductApprovalFormType = {
  name: string;
  description: string;
  stockCount: number;
  price: number;
  brand: ReqBrandsGetAllResponse[number];
  category: ReqCategoriesGetAllResponse[number];
  currency: ReqCurrenciesGetAllResponse[number];
  images: File[];
};

const urlToFile = async (url: string, name: string) => {
  const res = await fetch(url);
  const blob = await res.blob();
  return new File([blob], name, { type: blob.type });
};

const ProductApprovalForm = ({
  productId,
  close,
}: {
  productId: number;
  close: () => void;
}) => {
  const productRef = useRef<ReqProductsGetByIdResponse | null>(null);

  const { data: brands = [] } = useBrandsGetAll();
  const { data: categories = [] } = useCategoriesGetAll();
  const { data: currencies = [] } = useCurrenciesGetAll();
  const { data: product, isLoading } = useProductsGetById(productId);

  const { mutate: approveProduct, isPending: isApprovePending } =
    useProductsApprove();
  const { mutate: rejectProduct, isPending: isRejectPending } =
    useProductsReject();

  const isPending = isApprovePending || isRejectPending;

  const {
    control,
    reset,
    formState: { errors },
  } = useForm<ProductApprovalFormType>({
    mode: "onChange",
    defaultValues: { images: [] },
  });

  const onApproveProduct = useCallback(() => {
    approveProduct(productId, {
      onSuccess: () => {
        close();
      },
    });
  }, [approveProduct, productId, close]);

  const onRejectProduct = useCallback(() => {
    rejectProduct(productId, {
      onSuccess: () => {
        close();
      },
    });
  }, [rejectProduct, productId, close]);

  useEffect(() => {
    if (
      !product ||
      !brands.length ||
      !categories.length ||
      !currencies.length
    ) {
      return;
    }

    productRef.current = product;

    const initializeForm = async () => {
      const imageFiles = await Promise.all(
        product.images.map((img) =>
          urlToFile(img.originalUrl, img.originalUrl),
        ),
      );

      reset({
        name: product.name,
        description: product.description,
        stockCount: product.stockCount,
        price: product.price,
        brand: brands.find((brand) => brand.id === product.brand.id)!,
        category: categories.find(
          (category) => category.id === product.category.id,
        )!,
        currency: currencies.find(
          (currency) => currency.id === product.currency.id,
        )!,
        images: imageFiles,
      });
    };

    initializeForm();
  }, [product, brands, categories, currencies, reset]);

  if (isLoading || !product) return null;

  return (
    <form className="relative flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-1">
        <GenericDialogTitle>Product Approval</GenericDialogTitle>
        <span className="text-s14-l20 text-gray-8">
          Review the product details.
        </span>
      </div>

      <div className="flex flex-col gap-y-5">
        <div className="relative flex flex-col">
          <InputLabel label="Name" hasAsterisk />
          <GenericFormInput field="name" control={control} disabled />
          <InputErrorLabel message={errors.name?.message} />
        </div>

        <div className="relative flex flex-col">
          <InputLabel label="Description" hasAsterisk />
          <GenericFormTextArea
            field="description"
            control={control}
            rows={4}
            disabled
          />
          <InputErrorLabel message={errors.description?.message} />
        </div>

        <div className="relative flex flex-col">
          <InputLabel label="Brand" hasAsterisk />
          <Controller
            name="brand"
            control={control}
            render={({ field }) => (
              <GenericSelect
                value={field.value}
                options={brands.map((brand) => ({
                  label: brand.name,
                  value: brand,
                }))}
                onChange={field.onChange}
                disabled
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
            render={({ field }) => (
              <GenericCategoryPicker
                value={field.value}
                onChange={field.onChange}
                disabled
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
            type="number"
            disabled
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
              disabled
            />
            <InputErrorLabel message={errors.price?.message} />
          </div>

          <div className="relative flex flex-1 flex-col">
            <InputLabel label="Currency" hasAsterisk />
            <Controller
              name="currency"
              control={control}
              render={({ field }) => (
                <GenericSelect
                  value={field.value}
                  options={currencies.map((currency) => ({
                    label: currency.code,
                    value: currency,
                  }))}
                  onChange={field.onChange}
                  disabled
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
            disabled
            exactFileCount={4}
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
            className={customTwMerge(BUTTON_PRIMARY_OUTLINED, "px-4")}
          >
            Cancel
          </button>
        </GenericDialogClose>

        <button
          type="button"
          disabled={isPending}
          onClick={onRejectProduct}
          className={customTwMerge(BUTTON_ERROR, "px-4")}
        >
          Reject
        </button>

        <button
          type="button"
          disabled={isPending}
          onClick={onApproveProduct}
          className={customTwMerge(BUTTON_PRIMARY, "px-4")}
        >
          Approve
        </button>
      </div>
    </form>
  );
};

export default ProductApprovalForm;
