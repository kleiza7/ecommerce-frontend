import type {
  ColDef,
  ICellRendererParams,
  RowDoubleClickedEvent,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { PRODUCT_STATUS } from "../../api/enums/ProductStatus.enum";
import type { ReqProductsGetProductsBySellerResponse } from "../../api/responses/ReqProductsGetProductsBySellerResponse.model";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useProductsGetProductsBySeller } from "../../hooks/useProductsGetProductsBySeller";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import { BUTTON_PRIMARY } from "../../shared/constants/CommonTailwindClasses.constants";
import { MEDIA_QUERY } from "../../shared/constants/MediaQuery.constants";
import { PRODUCT_STATUS_TEXT_PAIRS } from "../../shared/constants/Product.constants";
import { EVENT_TYPE } from "../../shared/enums/EventType.enum";
import { registerAgGridModules } from "../../shared/utils/AgGrid.util";
import { customTwMerge } from "../../shared/utils/Tailwind.util";
import "../../styles/agGrid.css";
import NewProductDialog from "./components/NewProductDialog";
import NewProductDrawer from "./components/NewProductDrawer";
import UpdateProductDialog from "./components/UpdateProductDialog";
import UpdateProductDrawer from "./components/UpdateProductDrawer";

const SellerProductsPage = () => {
  const {
    data: products = [],
    isLoading,
    refetch,
  } = useProductsGetProductsBySeller();

  const isMobileOrTablet = useMediaQuery(MEDIA_QUERY.BELOW_LG);

  const [isNewProductPortalOpen, setIsNewProductPortalOpen] = useState(false);
  const [isUpdateProductPortalOpen, setIsUpdateProductPortalOpen] =
    useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );

  const totalCount = products.length;

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

  const columnDefs = useMemo<
    ColDef<ReqProductsGetProductsBySellerResponse[number]>[]
  >(
    () => [
      {
        headerName: "Preview",
        width: 80,
        sortable: false,
        filter: false,
        cellRenderer: (
          params: ICellRendererParams<
            ReqProductsGetProductsBySellerResponse[number]
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
        headerName: "Status",
        valueGetter: (params) =>
          PRODUCT_STATUS_TEXT_PAIRS[params.data?.status as PRODUCT_STATUS] ??
          params.data?.status,
      },
    ],
    [],
  );

  const onRowDoubleClicked = useCallback(
    (
      event: RowDoubleClickedEvent<
        ReqProductsGetProductsBySellerResponse[number]
      >,
    ) => {
      if (!event.data?.id) return;

      setSelectedProductId(event.data.id);
      setIsUpdateProductPortalOpen(true);
    },
    [],
  );

  useEffect(() => {
    registerAgGridModules();
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
      <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-5 px-10 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="text-s24-l32 xl:text-s28-l36 text-text-primary font-semibold">
              My Products ({totalCount})
            </span>

            <div className="text-s16-l24 xl:text-s20-l28 text-gray-9 flex items-center gap-4">
              <span>
                {PRODUCT_STATUS_TEXT_PAIRS[PRODUCT_STATUS.APPROVED]} (
                {statusCounts[PRODUCT_STATUS.APPROVED]})
              </span>
              <span>
                {PRODUCT_STATUS_TEXT_PAIRS[PRODUCT_STATUS.WAITING_FOR_APPROVE]}{" "}
                ({statusCounts[PRODUCT_STATUS.WAITING_FOR_APPROVE]})
              </span>
              <span>
                {PRODUCT_STATUS_TEXT_PAIRS[PRODUCT_STATUS.NOT_APPROVED]} (
                {statusCounts[PRODUCT_STATUS.NOT_APPROVED]})
              </span>
              <span>
                {PRODUCT_STATUS_TEXT_PAIRS[PRODUCT_STATUS.DELETED]} (
                {statusCounts[PRODUCT_STATUS.DELETED]})
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsNewProductPortalOpen(true)}
            className={customTwMerge(BUTTON_PRIMARY, "shrink-0 px-6")}
          >
            New Product
          </button>
        </div>

        <div className="ag-theme-alpine flex-1">
          <AgGridReact<ReqProductsGetProductsBySellerResponse[number]>
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

      {isMobileOrTablet ? (
        <NewProductDrawer
          open={isNewProductPortalOpen}
          setOpen={setIsNewProductPortalOpen}
        />
      ) : (
        <NewProductDialog
          open={isNewProductPortalOpen}
          setOpen={setIsNewProductPortalOpen}
        />
      )}

      {selectedProductId &&
        (isMobileOrTablet ? (
          <UpdateProductDrawer
            open={isUpdateProductPortalOpen}
            setOpen={setIsUpdateProductPortalOpen}
            productId={selectedProductId}
          />
        ) : (
          <UpdateProductDialog
            open={isUpdateProductPortalOpen}
            setOpen={setIsUpdateProductPortalOpen}
            productId={selectedProductId}
          />
        ))}
    </>
  );
};

export default SellerProductsPage;
