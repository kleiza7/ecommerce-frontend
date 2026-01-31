import { useCallback, useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import type { ReqBrandsGetAllResponse } from "../../../api/responses/ReqBrandsGetAllResponse.model";
import type { ReqCategoriesGetAllResponse } from "../../../api/responses/ReqCategoriesGetAllResponse.model";
import type { ReqCurrenciesGetAllResponse } from "../../../api/responses/ReqCurrenciesGetAllResponse.model";
import type { ReqProductsGetByIdResponse } from "../../../api/responses/ReqProductsGetByIdResponse.model";
import { useBrandsGetAll } from "../../../hooks/useBrandsGetAll";
import { useCategoriesGetAll } from "../../../hooks/useCategoriesGetAll";
import { useCurrenciesGetAll } from "../../../hooks/useCurrenciesGetAll";
import { useProductsApprove } from "../../../hooks/useProductsApprove";
import { useProductsGetById } from "../../../hooks/useProductsGetById";
import { useProductsReject } from "../../../hooks/useProductsReject";
import {
  BUTTON_ERROR,
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
    <form className="relative flex h-full flex-col gap-y-6">
      <div className="flex shrink-0 flex-col gap-y-1">
        <GenericDialogTitle>Product Approval</GenericDialogTitle>
        <span className="text-s14-l20 text-gray-8">
          Review the product details.
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
              hasError={!!errors.name}
              disabled
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
              disabled
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
              rules={{ required: "Category is required!" }}
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
              required
              type="number"
              min={1}
              hasError={!!errors.stockCount}
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
                required
                type="number"
                min={1}
                hasError={!!errors.price}
                disabled
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
