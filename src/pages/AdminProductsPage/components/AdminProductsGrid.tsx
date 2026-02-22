import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useMemo } from "react";
import type { ReqProductsGetWaitingApprovalProductsResponse } from "../../../api/responses/ReqProductsGetWaitingApprovalProductsResponse.model";
import { OrderApproveIcon } from "../../../assets/icons";
import GenericTooltip from "../../../shared/components/GenericTooltip";
import { registerAgGridModules } from "../../../shared/utils/AgGrid.util";
import "../../../styles/agGrid.css";

const AdminProductsGrid = ({
  products,
  openProductApprovalPortal,
}: {
  products: ReqProductsGetWaitingApprovalProductsResponse;
  openProductApprovalPortal: (productId: number) => void;
}) => {
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
            ReqProductsGetWaitingApprovalProductsResponse[number]
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
        field: "seller",
        headerName: "Seller",
        cellRenderer: (
          params: ICellRendererParams<
            ReqProductsGetWaitingApprovalProductsResponse[number]
          >,
        ) => {
          if (!params.data) return null;

          return (
            <span className="text-s14-l20 text-text-primary font-medium">
              {params.data.seller.name ?? "-"}
            </span>
          );
        },
      },
      {
        field: "price",
        headerName: "Price",
        cellRenderer: (
          params: ICellRendererParams<
            ReqProductsGetWaitingApprovalProductsResponse[number]
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
            ReqProductsGetWaitingApprovalProductsResponse[number]
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
                  <OrderApproveIcon className="fill-primary" />
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

  return (
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
        rowHeight={80}
      />
    </div>
  );
};

export default AdminProductsGrid;
