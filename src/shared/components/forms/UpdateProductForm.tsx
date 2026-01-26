import { useEffect, useRef } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { ReqProductsGetByIdResponse } from "../../../api/responses/ReqProductsGetByIdResponse.model";
import { useBrandsGetAll } from "../../../hooks/useBrandsGetAll";
import { useCategoriesGetAll } from "../../../hooks/useCategoriesGetAll";
import { useCurrenciesGetAll } from "../../../hooks/useCurrenciesGetAll";
import { useProductsGetById } from "../../../hooks/useProductsGetById";
import { useProductsUpdate } from "../../../hooks/useProductsUpdate";
import {
  BUTTON_PRIMARY,
  BUTTON_PRIMARY_OUTLINED,
} from "../../constants/CommonTailwindClasses.constants";
import { customTwMerge } from "../../utils/Tailwind.util";
import { GenericDialogClose, GenericDialogTitle } from "../GenericDialog";
import type { ProductFormType } from "../ProductFormFields";
import ProductFormFields from "../ProductFormFields";

const urlToFile = async (url: string, name: string) => {
  const res = await fetch(url);
  const blob = await res.blob();
  return new File([blob], name, { type: blob.type });
};

const UpdateProductForm = ({
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

  const { mutate: updateProduct, isPending } = useProductsUpdate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm<ProductFormType>({
    mode: "onChange",
    defaultValues: { images: [] },
  });

  const onSubmit: SubmitHandler<ProductFormType> = (values) => {
    const originalImages = productRef.current?.images ?? [];

    const deletedImageIds = originalImages
      .filter(
        (img) => !values.images.some((file) => file.name === img.originalUrl),
      )
      .map((img) => img.id);

    const newAddedImages = values.images.filter(
      (file) => !originalImages.some((img) => img.originalUrl === file.name),
    );

    updateProduct(
      {
        id: productId,
        name: values.name,
        description: values.description,
        stockCount: values.stockCount,
        price: values.price,
        brandId: values.brand.id,
        categoryId: values.category.id,
        currencyId: values.currency.id,
        newAddedImages,
        deletedImageIds,
      },
      {
        onSuccess: () => {
          close();
        },
      },
    );
  };

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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit)(e);
      }}
      className="relative flex h-full flex-col gap-y-6"
    >
      <div className="flex shrink-0 flex-col gap-y-1">
        <GenericDialogTitle>Update Product</GenericDialogTitle>
        <span className="text-s14-l20 text-gray-8">
          Update the product details.
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
          Update
        </button>
      </div>
    </form>
  );
};

export default UpdateProductForm;
