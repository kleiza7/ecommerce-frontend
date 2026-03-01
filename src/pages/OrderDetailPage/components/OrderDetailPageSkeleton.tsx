import Skeleton from "../../../shared/components/Skeleton";

const OrderDetailPageSkeleton = () => {
  return (
    <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-3 p-3 md:gap-8 md:px-10 md:py-8">
      <div className="flex items-center gap-x-2">
        <Skeleton withShimmer className="h-4 w-4" />
        <Skeleton withShimmer className="h-4 w-24" />
      </div>

      <div className="flex items-center gap-x-8">
        <div className="border-border-secondary flex w-full items-start justify-between rounded-md border px-8 py-6">
          <Skeleton withShimmer className="h-6 w-32" />

          <div className="flex flex-col gap-y-4 md:flex-row md:items-start md:gap-x-16 md:gap-y-0">
            <div className="flex flex-col gap-y-1">
              <Skeleton withShimmer className="h-3 w-20" />
              <Skeleton withShimmer className="h-4 w-24" />
            </div>

            <div className="flex flex-col gap-y-1">
              <Skeleton withShimmer className="h-3 w-24" />
              <Skeleton withShimmer className="h-4 w-20" />
            </div>

            <div className="flex flex-col gap-y-1">
              <Skeleton withShimmer className="h-3 w-24" />
              <Skeleton withShimmer className="h-4 w-28" />
            </div>
          </div>
        </div>
      </div>

      {Array.from({ length: 2 }).map((_, groupIndex) => (
        <div
          key={groupIndex}
          className="border-border-primary flex flex-col overflow-hidden rounded-md border"
        >
          <div className="border-border-primary bg-surface-muted flex items-center gap-x-3 border-b px-5 py-3.5">
            <Skeleton withShimmer className="h-5 w-5 rounded" />
            <Skeleton withShimmer className="h-4 w-40" />
          </div>

          <div className="overflow-x-auto">
            <div className="flex min-w-max gap-x-3 p-6 md:gap-x-6">
              {Array.from({ length: 3 }).map((_, itemIndex) => (
                <div
                  key={itemIndex}
                  className="border-border-primary flex w-[280px] shrink-0 gap-x-4 rounded-md border p-4 md:w-[360px] 2xl:w-[470px]"
                >
                  <Skeleton
                    withShimmer
                    className="h-[110px] w-[110px] rounded"
                  />

                  <div className="flex min-w-0 flex-1 flex-col gap-2 py-2">
                    <Skeleton withShimmer className="h-3 w-1/3" />
                    <Skeleton withShimmer className="h-4 w-3/4" />
                    <Skeleton withShimmer className="h-3 w-1/4" />
                    <Skeleton withShimmer className="mt-auto h-5 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderDetailPageSkeleton;
