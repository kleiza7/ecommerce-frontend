import { useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
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
import { GenericDialogClose, GenericDialogTitle } from "../GenericDialog";
import type { ProductFormType } from "../ProductFormFields";
import ProductFormFields from "../ProductFormFields";

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
  } = useForm<ProductFormType>({
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

      <ProductFormFields
        control={control}
        errors={errors}
        brands={brands}
        currencies={currencies}
        disabled
      />

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
