import type {
  ColDef,
  ICellRendererParams,
  RowDoubleClickedEvent,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuthGetAllSellers } from "../../hooks/useAuthGetAllSellers";
import { useBrandsGetAll } from "../../hooks/useBrandsGetAll";
import { useCategoriesGetAll } from "../../hooks/useCategoriesGetAll";
import { useCurrenciesGetAll } from "../../hooks/useCurrenciesGetAll";
import { useProductsGetWaitingApprovalProducts } from "../../hooks/useProductsGetWaitingApprovalProducts";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import { EVENT_TYPE } from "../../shared/enums/EventType.enum";
import ProductApprovalDialog from "./components/ProductApprovalDialog/ProductApprovalDialog";

const AdminProductsPage = () => {
  const { data, isLoading, refetch } = useProductsGetWaitingApprovalProducts(
    {},
  );
  const { data: categories = [] } = useCategoriesGetAll();
  const { data: brands = [] } = useBrandsGetAll();
  const { data: sellers = [] } = useAuthGetAllSellers();
  const { data: currencies = [] } = useCurrenciesGetAll();

  const [isProductApprovalDialogOpen, setIsProductApprovalDialogOpen] =
    useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );

  const brandMap = useMemo(() => {
    const map = new Map<number, string>();
    brands.forEach((b) => map.set(b.id, b.name));
    return map;
  }, [brands]);

  const categoryMap = useMemo(() => {
    const map = new Map<number, string>();
    categories.forEach((c) => map.set(c.id, c.name));
    return map;
  }, [categories]);

  const sellerMap = useMemo(() => {
    const map = new Map<number, string>();
    sellers.forEach((s) => map.set(s.id, s.name));
    return map;
  }, [sellers]);

  const currencyMap = useMemo(() => {
    const map = new Map<number, string>();
    currencies.forEach((c) => map.set(c.id, c.code));
    return map;
  }, [currencies]);

  const columnDefs = useMemo<ColDef[]>(
    () => [
      {
        headerName: "Preview",
        width: 80,
        sortable: false,
        filter: false,
        cellRenderer: (params: ICellRendererParams) => {
          const primaryImage = params.data?.images?.find(
            (img) => img.isPrimary,
          );

          if (!primaryImage?.mediumUrl) return null;

          return (
            <img
              src={primaryImage.mediumUrl}
              alt={params.data?.name}
              className="h-12 w-12 rounded object-cover"
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
        valueGetter: (params) => sellerMap.get(params.data?.sellerId) ?? "-",
      },
      {
        headerName: "Brand",
        valueGetter: (params) => brandMap.get(params.data?.brandId) ?? "-",
      },
      {
        headerName: "Category",
        valueGetter: (params) =>
          categoryMap.get(params.data?.categoryId) ?? "-",
      },
      {
        headerName: "Price",
        valueGetter: (params) => {
          const price = params.data?.price;
          const code = currencyMap.get(params.data?.currencyId) ?? "";
          return price != null ? `${price.toFixed(2)} ${code}` : "-";
        },
      },
      {
        field: "stockCount",
        headerName: "Stock",
      },
    ],
    [brandMap, categoryMap, currencyMap, sellerMap],
  );

  const onRowDoubleClicked = useCallback((event: RowDoubleClickedEvent) => {
    if (!event.data?.id) return;

    setSelectedProductId(event.data.id);
    setIsProductApprovalDialogOpen(true);
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

  const totalCount = data?.items?.length ?? 0;

  return (
    <>
      <div className="flex h-full w-full flex-col gap-5 py-4">
        <div className="flex items-center justify-between">
          <span className="text-s28-l36 text-text-primary font-semibold">
            My Waiting Approvals ({totalCount} Product)
          </span>
        </div>

        <div className="ag-theme-alpine flex-1">
          <AgGridReact
            theme="legacy"
            rowData={data?.items ?? []}
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
