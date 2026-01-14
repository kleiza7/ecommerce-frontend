import type {
  ColDef,
  ICellRendererParams,
  RowDoubleClickedEvent,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReqProductsGetWaitingApprovalProductsResponse } from "../../api/responses/ReqProductsGetWaitingApprovalProductsResponse.model";
import { useProductsGetWaitingApprovalProducts } from "../../hooks/useProductsGetWaitingApprovalProducts";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import { EVENT_TYPE } from "../../shared/enums/EventType.enum";
import { registerAgGridModules } from "../../shared/utils/AgGrid.util";
import "../../styles/agGrid.css";
import ProductApprovalDialog from "./components/ProductApprovalDialog/ProductApprovalDialog";

const AdminProductsPage = () => {
  const {
    data: products = [],
    isLoading,
    refetch,
  } = useProductsGetWaitingApprovalProducts();

  const [isProductApprovalDialogOpen, setIsProductApprovalDialogOpen] =
    useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );

  const totalCount = products.length;

  const columnDefs = useMemo<
    ColDef<ReqProductsGetWaitingApprovalProductsResponse[number]>[]
  >(
    () => [
      {
        headerName: "Preview",
        width: 80,
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
    ],
    [],
  );

  const onRowDoubleClicked = useCallback(
    (
      event: RowDoubleClickedEvent<
        ReqProductsGetWaitingApprovalProductsResponse[number]
      >,
    ) => {
      if (!event.data?.id) return;

      setSelectedProductId(event.data.id);
      setIsProductApprovalDialogOpen(true);
    },
    [],
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
      <div className="flex h-full w-full flex-col gap-5 py-4">
        <div className="flex items-center justify-between">
          <span className="text-s28-l36 text-text-primary font-semibold">
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
            onRowDoubleClicked={onRowDoubleClicked}
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

      {selectedProductId && (
        <ProductApprovalDialog
          open={isProductApprovalDialogOpen}
          setOpen={setIsProductApprovalDialogOpen}
          productId={selectedProductId}
        />
      )}
    </>
  );
};

export default AdminProductsPage;
