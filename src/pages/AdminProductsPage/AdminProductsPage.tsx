import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReqProductsGetWaitingApprovalProductsResponse } from "../../api/responses/ReqProductsGetWaitingApprovalProductsResponse.model";
import { OrderApproveIcon } from "../../assets/icons";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useProductsGetWaitingApprovalProducts } from "../../hooks/useProductsGetWaitingApprovalProducts";
import GenericTooltip from "../../shared/components/GenericTooltip";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import { MEDIA_QUERY } from "../../shared/constants/MediaQuery.constants";
import { EVENT_TYPE } from "../../shared/enums/EventType.enum";
import { registerAgGridModules } from "../../shared/utils/AgGrid.util";
import "../../styles/agGrid.css";
import ProductApprovalDialog from "./components/ProductApprovalDialog";
import ProductApprovalDrawer from "./components/ProductApprovalDrawer";

const AdminProductsPage = () => {
  const {
    data: products = [],
    isLoading,
    refetch,
  } = useProductsGetWaitingApprovalProducts();

  const isMobileOrTablet = useMediaQuery(MEDIA_QUERY.BELOW_LG);

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

  const columnDefs = useMemo<
    ColDef<ReqProductsGetWaitingApprovalProductsResponse[number]>[]
  >(
    () => [
      {
        headerName: "Preview",
        width: 100,
        maxWidth: 100,
        minWidth: 100,
        sortable: false,
        filter: false,
        cellRenderer: (
          params: ICellRendererParams<
            ReqProductsGetWaitingApprovalProductsResponse[number]
          >,
        ) => {
          const primaryImage = params.data?.images.find((img) => img.isPrimary);

          if (!primaryImage?.mediumUrl) return null;

          return (
            <img
              src={primaryImage.mediumUrl}
              alt={params.data?.name}
              className="h-9 w-9 rounded object-cover"
            />
          );
        },
      },
      {
        field: "name",
        headerName: "Product Name",
      },
      {
        headerName: "Seller",
        valueGetter: (params) => params.data?.seller?.name ?? "-",
      },
      {
        headerName: "Brand",
        valueGetter: (params) => params.data?.brand?.name ?? "-",
      },
      {
        headerName: "Category",
        valueGetter: (params) => params.data?.category?.name ?? "-",
      },
      {
        headerName: "Price",
        valueGetter: (params) => {
          const price = params.data?.price;
          const code = params.data?.currency?.code ?? "";

          return price != null ? `${price.toFixed(2)} ${code}` : "-";
        },
      },
      {
        field: "stockCount",
        headerName: "Stock",
      },
      {
        colId: "rowActions",
        pinned: "right",
        width: 80,
        minWidth: 80,
        maxWidth: 80,
        sortable: false,
        filter: false,
        resizable: false,
        suppressMenu: true,
        cellRenderer: (
          params: ICellRendererParams<
            ReqProductsGetWaitingApprovalProductsResponse[number]
          >,
        ) => {
          if (!params.data?.id) return null;

          return (
            <div className="flex h-full items-center justify-center">
              <GenericTooltip content="Approve / Reject">
                <button
                  type="button"
                  onClick={() => openProductApprovalPortal(params.data!.id)}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center"
                >
                  <OrderApproveIcon className="fill-orange" />
                </button>
              </GenericTooltip>
            </div>
          );
        },
      },
    ],
    [openProductApprovalPortal],
  );

  useEffect(() => {
    registerAgGridModules();
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
      <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-5 p-3 md:px-10 md:py-8">
        <div className="flex items-center justify-between">
          <span className="text-s24-l32 xl:text-s28-l36 text-text-primary font-semibold">
            My Waiting Approvals ({totalCount})
          </span>
        </div>

        <div className="ag-theme-alpine flex-1">
          <AgGridReact<ReqProductsGetWaitingApprovalProductsResponse[number]>
            theme="legacy"
            rowData={products}
            columnDefs={columnDefs}
            suppressCellFocus
            animateRows
            defaultColDef={{
              flex: 1,
              minWidth: 140,
              resizable: true,
              sortable: true,
              filter: true,
            }}
          />
        </div>
      </div>

      {selectedProductId &&
        (isMobileOrTablet ? (
          <ProductApprovalDrawer
            open={isProductApprovalPortalOpen}
            setOpen={setIsProductApprovalPortalOpen}
            productId={selectedProductId}
          />
        ) : (
          <ProductApprovalDialog
            open={isProductApprovalPortalOpen}
            setOpen={setIsProductApprovalPortalOpen}
            productId={selectedProductId}
          />
        ))}
    </>
  );
};

export default AdminProductsPage;
