import type {
  ColDef,
  ICellRendererParams,
  RowDoubleClickedEvent,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { PRODUCT_STATUS } from "../../api/enums/ProductStatus.enum";
import { useBrandsGetAll } from "../../hooks/useBrandsGetAll";
import { useCategoriesGetAll } from "../../hooks/useCategoriesGetAll";
import { useCurrenciesGetAll } from "../../hooks/useCurrenciesGetAll";
import { useProductsGetProductsBySeller } from "../../hooks/useProductsGetProductsBySeller";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import { EVENT_TYPE } from "../../shared/enums/EventType.enum";
import NewProductDialog from "./components/NewProductDialog/NewProductDialog";
import UpdateProductDialog from "./components/UpdateProductDialog/UpdateProductDialog";

const PRODUCT_STATUS_TEXT_PAIRS: Record<PRODUCT_STATUS, string> = {
  [PRODUCT_STATUS.WAITING_FOR_APPROVE]: "Waiting For Approve",
  [PRODUCT_STATUS.APPROVED]: "Approved",
  [PRODUCT_STATUS.NOT_APPROVED]: "Not Approved",
  [PRODUCT_STATUS.DELETED]: "Deleted",
};

const SellerProductsPage = () => {
  const { data, isLoading, refetch } = useProductsGetProductsBySeller({});

  const { data: categories = [] } = useCategoriesGetAll();
  const { data: brands = [] } = useBrandsGetAll();
  const { data: currencies = [] } = useCurrenciesGetAll();

  const [isNewProductDialogOpen, setIsNewProductDialogOpen] = useState(false);
  const [isUpdateProductDialogOpen, setIsUpdateProductDialogOpen] =
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
      {
        headerName: "Status",
        valueGetter: (params) =>
          PRODUCT_STATUS_TEXT_PAIRS[params.data?.status as PRODUCT_STATUS] ??
          params.data?.status,
      },
    ],
    [brandMap, categoryMap, currencyMap],
  );

  const onRowDoubleClicked = useCallback((event: RowDoubleClickedEvent) => {
    if (!event.data?.id) return;

    setSelectedProductId(event.data.id);
    setIsUpdateProductDialogOpen(true);
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

  const totalCount = data?.items?.length ?? 0;

  return (
    <>
      <div className="flex h-full w-full flex-col gap-5 py-4">
        <div className="flex items-center justify-between">
          <span className="text-s28-l36 text-text-primary font-semibold">
            My Products ({totalCount} Product)
          </span>

          <button
            type="button"
            onClick={() => setIsNewProductDialogOpen(true)}
            className="bg-orange hover:bg-orange-dark text-s14-l20 rounded-lg px-6 py-2 font-medium text-white transition"
          >
            New Product
          </button>
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

      <NewProductDialog
        open={isNewProductDialogOpen}
        setOpen={setIsNewProductDialogOpen}
      />

      {selectedProductId && (
        <UpdateProductDialog
          open={isUpdateProductDialogOpen}
          setOpen={setIsUpdateProductDialogOpen}
          productId={selectedProductId}
        />
      )}
    </>
  );
};

export default SellerProductsPage;
