import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReqBrandsGetAllResponse } from "../../api/responses/ReqBrandsGetAllResponse.model";
import { EditNoteIcon } from "../../assets/icons";
import { useBrandsGetAll } from "../../hooks/useBrandsGetAll";
import GenericTooltip from "../../shared/components/GenericTooltip";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import { BUTTON_PRIMARY } from "../../shared/constants/CommonTailwindClasses.constants";
import { EVENT_TYPE } from "../../shared/enums/EventType.enum";
import { registerAgGridModules } from "../../shared/utils/AgGrid.util";
import { customTwMerge } from "../../shared/utils/Tailwind.util";
import "../../styles/agGrid.css";
import NewBrandPortal from "./components/NewBrandPortal/NewBrandPortal";
import UpdateBrandPortal from "./components/UpdateBrandPortal/UpdateBrandPortal";

const BrandsPage = () => {
  const { data: brands = [], isLoading, refetch } = useBrandsGetAll();

  const [isNewBrandPortalOpen, setIsNewBrandPortalOpen] = useState(false);
  const [isUpdateBrandPortalOpen, setIsUpdateBrandPortalOpen] = useState(false);
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);

  const openUpdateBrandPortal = useCallback((brandId: number) => {
    setSelectedBrandId(brandId);
    setIsUpdateBrandPortalOpen(true);
  }, []);

  const columnDefs = useMemo<ColDef<ReqBrandsGetAllResponse[number]>[]>(
    () => [
      {
        field: "name",
        headerName: "Brand Name",
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
          params: ICellRendererParams<ReqBrandsGetAllResponse[number]>,
        ) => {
          if (!params.data?.id) return null;

          return (
            <div className="flex h-full items-center justify-center">
              <GenericTooltip content="Update">
                <button
                  type="button"
                  onClick={() => openUpdateBrandPortal(params.data!.id)}
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
    [openUpdateBrandPortal],
  );

  useEffect(() => {
    registerAgGridModules();
  }, []);

  useEffect(() => {
    const onBrandCreated = () => {
      refetch();
    };
    const onBrandUpdated = () => {
      refetch();
    };

    window.addEventListener(EVENT_TYPE.BRAND_CREATED, onBrandCreated);
    window.addEventListener(EVENT_TYPE.BRAND_UPDATED, onBrandUpdated);

    return () => {
      window.removeEventListener(EVENT_TYPE.BRAND_CREATED, onBrandCreated);
      window.removeEventListener(EVENT_TYPE.BRAND_UPDATED, onBrandUpdated);
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
              Brands
            </span>
            <span className="text-text-disabled text-s16-l24 xl:text-s20-l28">
              ({brands.length})
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsNewBrandPortalOpen(true)}
            className={customTwMerge(BUTTON_PRIMARY, "shrink-0 px-6")}
          >
            New Brand
          </button>
        </div>

        <div className="ag-theme-alpine flex-1">
          <AgGridReact<ReqBrandsGetAllResponse[number]>
            theme="legacy"
            rowData={brands}
            columnDefs={columnDefs}
            suppressCellFocus
            animateRows
            defaultColDef={{
              flex: 1,
              minWidth: 160,
              resizable: true,
              sortable: true,
              filter: true,
            }}
          />
        </div>
      </div>

      <NewBrandPortal
        open={isNewBrandPortalOpen}
        setOpen={setIsNewBrandPortalOpen}
      />

      {selectedBrandId && (
        <UpdateBrandPortal
          open={isUpdateBrandPortalOpen}
          setOpen={setIsUpdateBrandPortalOpen}
          brandId={selectedBrandId}
        />
      )}
    </>
  );
};

export default BrandsPage;
