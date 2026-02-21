import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useMemo } from "react";
import type { ReqProductsGetProductsBySellerResponse } from "../../../api/responses/ReqProductsGetProductsBySellerResponse.model";
import { EditNoteIcon } from "../../../assets/icons";
import GenericTooltip from "../../../shared/components/GenericTooltip";
import ProductStatusLabel from "../../../shared/components/ProductStatusLabel";
import { registerAgGridModules } from "../../../shared/utils/AgGrid.util";
import "../../../styles/agGrid.css";

const SellerProductsGrid = ({
  products,
  openUpdateProductPortal,
}: {
  products: ReqProductsGetProductsBySellerResponse;
  openUpdateProductPortal: (productId: number) => void;
}) => {
  const columnDefs = useMemo<
    ColDef<ReqProductsGetProductsBySellerResponse[number]>[]
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
            ReqProductsGetProductsBySellerResponse[number]
          >,
        ) => {
          const primaryImage = params.data?.images.find((img) => img.isPrimary);

          if (!primaryImage?.mediumUrl) return null;

          return (
            <img
              src={primaryImage.mediumUrl}
              alt={params.data?.name}
              className="h-10 w-10 rounded object-cover"
            />
          );
        },
      },
      {
        field: "name",
        headerName: "Product Name",
        minWidth: 300,
        cellRenderer: (
          params: ICellRendererParams<
            ReqProductsGetProductsBySellerResponse[number]
          >,
        ) => {
          if (!params.data) return null;

          return (
            <div className="flex flex-col">
              <span className="text-s14-l20 text-text-primary font-bold">
                {params.data.name}
              </span>
              <span className="text-s12-l16 text-text-muted">
                Brand: {params.data.brand?.name ?? "-"} • Category:{" "}
                {params.data.category?.name ?? "-"}
              </span>
            </div>
          );
        },
      },
      {
        field: "price",
        headerName: "Price",
        cellRenderer: (
          params: ICellRendererParams<
            ReqProductsGetProductsBySellerResponse[number]
          >,
        ) => {
          if (!params.data) return null;

          const price = params.data.price;
          const code = params.data.currency.code ?? "";

          return (
            <span className="text-s14-l20 text-text-primary font-medium">
              {price != null ? `${price.toFixed(2)} ${code}` : "-"}
            </span>
          );
        },
      },
      {
        field: "stockCount",
        headerName: "Stock",
        cellRenderer: (
          params: ICellRendererParams<
            ReqProductsGetProductsBySellerResponse[number]
          >,
        ) => {
          if (!params.data) return null;

          return (
            <span className="text-s14-l20 text-text-primary font-medium">
              {params.data.stockCount}
            </span>
          );
        },
      },
      {
        field: "status",
        headerName: "Status",
        cellRenderer: (
          params: ICellRendererParams<
            ReqProductsGetProductsBySellerResponse[number]
          >,
        ) => {
          if (!params.data) return null;

          return <ProductStatusLabel status={params.data.status} />;
        },
      },
      {
        headerName: "Action",
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
            ReqProductsGetProductsBySellerResponse[number]
          >,
        ) => {
          if (!params.data?.id) return null;

          return (
            <div className="flex h-full items-center justify-center">
              <GenericTooltip content="Update">
                <button
                  type="button"
                  onClick={() => openUpdateProductPortal(params.data!.id)}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center"
                >
                  <EditNoteIcon className="fill-primary" />
                </button>
              </GenericTooltip>
            </div>
          );
        },
      },
    ],
    [openUpdateProductPortal],
  );

  useEffect(() => {
    registerAgGridModules();
  }, []);

  return (
    <div className="ag-theme-alpine flex-1">
      <AgGridReact<ReqProductsGetProductsBySellerResponse[number]>
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
        rowHeight={80}
      />
    </div>
  );
};

export default SellerProductsGrid;
