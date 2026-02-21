import { useCallback, useEffect, useState } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useProductsGetWaitingApprovalProducts } from "../../hooks/useProductsGetWaitingApprovalProducts";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import { MEDIA_QUERY } from "../../shared/constants/MediaQuery.constants";
import { EVENT_TYPE } from "../../shared/enums/EventType.enum";
import AdminProductsGrid from "./components/AdminProductsGrid";
import AdminProductsList from "./components/AdminProductsList";
import ProductApprovalPortal from "./components/ProductApprovalPortal/ProductApprovalPortal";

const AdminProductsPage = () => {
  const isMobileOrTablet = useMediaQuery(MEDIA_QUERY.BELOW_LG);
  const {
    data: products = [],
    isLoading,
    refetch,
  } = useProductsGetWaitingApprovalProducts();

  const [isProductApprovalPortalOpen, setIsProductApprovalPortalOpen] =
    useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );

  const totalCount = products.length;

  const openProductApprovalPortal = useCallback((productId: number) => {
    setSelectedProductId(productId);
    setIsProductApprovalPortalOpen(true);
  }, []);

  useEffect(() => {
    const onProductApproved = () => {
      refetch();
    };
    const onProductRejected = () => {
      refetch();
    };

    window.addEventListener(EVENT_TYPE.PRODUCT_APPROVED, onProductApproved);
    window.addEventListener(EVENT_TYPE.PRODUCT_REJECTED, onProductRejected);

    return () => {
      window.removeEventListener(
        EVENT_TYPE.PRODUCT_APPROVED,
        onProductApproved,
      );
      window.removeEventListener(
        EVENT_TYPE.PRODUCT_REJECTED,
        onProductRejected,
      );
    };
  }, [refetch]);

  if (isLoading) {
    return <LoadingSpinner size={56} borderWidth={3} />;
  }

  return (
    <>
      <div className="flex flex-1 flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="flex items-end gap-x-1">
            <span className="text-s24-l32 xl:text-s28-l36 text-text-primary leading-none font-semibold">
              My Waiting Approvals
            </span>
            <span className="text-text-disabled text-s16-l24 xl:text-s20-l28">
              ({totalCount})
            </span>
          </div>
        </div>

        {isMobileOrTablet ? (
          <AdminProductsList
            products={products}
            openProductApprovalPortal={openProductApprovalPortal}
          />
        ) : (
          <AdminProductsGrid
            products={products}
            openProductApprovalPortal={openProductApprovalPortal}
          />
        )}
      </div>

      {selectedProductId && (
        <ProductApprovalPortal
          open={isProductApprovalPortalOpen}
          setOpen={setIsProductApprovalPortalOpen}
          productId={selectedProductId}
        />
      )}
    </>
  );
};

export default AdminProductsPage;
