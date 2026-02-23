import { useCallback, useEffect, useMemo, useState } from "react";
import { PRODUCT_STATUS } from "../../api/enums/ProductStatus.enum";
import { AddIcon } from "../../assets/icons";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useProductsGetProductsBySeller } from "../../hooks/useProductsGetProductsBySeller";
import GenericSelect from "../../shared/components/GenericSelect";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import { BUTTON_PRIMARY } from "../../shared/constants/CommonTailwindClasses.constants";
import { MEDIA_QUERY } from "../../shared/constants/MediaQuery.constants";
import { PRODUCT_STATUS_TEXT_PAIRS } from "../../shared/constants/Product.constants";
import { EVENT_TYPE } from "../../shared/enums/EventType.enum";
import { customTwMerge } from "../../shared/utils/Tailwind.util";
import NewProductPortal from "./components/NewProductPortal/NewProductPortal";
import SellerProductsGrid from "./components/SellerProductsGrid";
import SellerProductsList from "./components/SellerProductsList";
import UpdateProductPortal from "./components/UpdateProductPortal/UpdateProductPortal";

type STATUS_FILTER = PRODUCT_STATUS | "ALL";

const SellerProductsPage = () => {
  const isMobileOrTablet = useMediaQuery(MEDIA_QUERY.BELOW_LG);
  const {
    data: products = [],
    isLoading,
    refetch,
  } = useProductsGetProductsBySeller();

  const [isNewProductPortalOpen, setIsNewProductPortalOpen] = useState(false);
  const [isUpdateProductPortalOpen, setIsUpdateProductPortalOpen] =
    useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );
  const [statusFilter, setStatusFilter] = useState<STATUS_FILTER>("ALL");

  const statusCounts = useMemo(() => {
    return products.reduce<Record<PRODUCT_STATUS, number>>(
      (acc, product) => {
        acc[product.status] += 1;
        return acc;
      },
      {
        [PRODUCT_STATUS.APPROVED]: 0,
        [PRODUCT_STATUS.WAITING_FOR_APPROVE]: 0,
        [PRODUCT_STATUS.NOT_APPROVED]: 0,
        [PRODUCT_STATUS.DELETED]: 0,
      },
    );
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (statusFilter === "ALL") return products;
    return products.filter((product) => product.status === statusFilter);
  }, [products, statusFilter]);

  const statusFilterOptions = useMemo(
    () => [
      {
        label: `All (${products.length})`,
        value: "ALL" as const,
      },
      {
        label: `${PRODUCT_STATUS_TEXT_PAIRS[PRODUCT_STATUS.APPROVED]} (${statusCounts[PRODUCT_STATUS.APPROVED]})`,
        value: PRODUCT_STATUS.APPROVED,
      },
      {
        label: `${PRODUCT_STATUS_TEXT_PAIRS[PRODUCT_STATUS.WAITING_FOR_APPROVE]} (${statusCounts[PRODUCT_STATUS.WAITING_FOR_APPROVE]})`,
        value: PRODUCT_STATUS.WAITING_FOR_APPROVE,
      },
      {
        label: `${PRODUCT_STATUS_TEXT_PAIRS[PRODUCT_STATUS.NOT_APPROVED]} (${statusCounts[PRODUCT_STATUS.NOT_APPROVED]})`,
        value: PRODUCT_STATUS.NOT_APPROVED,
      },
      {
        label: `${PRODUCT_STATUS_TEXT_PAIRS[PRODUCT_STATUS.DELETED]} (${statusCounts[PRODUCT_STATUS.DELETED]})`,
        value: PRODUCT_STATUS.DELETED,
      },
    ],
    [products.length, statusCounts],
  );

  const openUpdateProductPortal = useCallback((productId: number) => {
    setSelectedProductId(productId);
    setIsUpdateProductPortalOpen(true);
  }, []);

  useEffect(() => {
    const onProductCreated = () => {
      refetch();
    };
    const onProductUpdated = () => {
      refetch();
    };

    window.addEventListener(EVENT_TYPE.PRODUCT_CREATED, onProductCreated);
    window.addEventListener(EVENT_TYPE.PRODUCT_UPDATED, onProductUpdated);

    return () => {
      window.removeEventListener(EVENT_TYPE.PRODUCT_CREATED, onProductCreated);
      window.removeEventListener(EVENT_TYPE.PRODUCT_UPDATED, onProductUpdated);
    };
  }, [refetch]);

  if (isLoading) {
    return <LoadingSpinner size={56} borderWidth={3} />;
  }

  return (
    <>
      <div className="flex flex-1 flex-col gap-5">
        <div className="flex items-end justify-between md:items-center">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
            <div className="flex items-end gap-x-1">
              <span className="text-s24-l32 xl:text-s28-l36 text-text-primary leading-none font-semibold">
                My Products
              </span>
              <span className="text-text-disabled text-s16-l24 xl:text-s20-l28">
                ({products.length})
              </span>
            </div>

            <GenericSelect
              value={statusFilter}
              options={statusFilterOptions}
              onChange={setStatusFilter}
              className="h-9 w-[220px]"
            />
          </div>

          <button
            type="button"
            onClick={() => setIsNewProductPortalOpen(true)}
            className={customTwMerge(BUTTON_PRIMARY, "shrink-0 px-6")}
          >
            <AddIcon />
            New Product
          </button>
        </div>

        {isMobileOrTablet ? (
          <SellerProductsList
            products={filteredProducts}
            openUpdateProductPortal={openUpdateProductPortal}
          />
        ) : (
          <SellerProductsGrid
            products={filteredProducts}
            openUpdateProductPortal={openUpdateProductPortal}
          />
        )}
      </div>

      <NewProductPortal
        open={isNewProductPortalOpen}
        setOpen={setIsNewProductPortalOpen}
      />

      {selectedProductId && (
        <UpdateProductPortal
          open={isUpdateProductPortalOpen}
          setOpen={setIsUpdateProductPortalOpen}
          productId={selectedProductId}
        />
      )}
    </>
  );
};

export default SellerProductsPage;
