import Skeleton from "../../../shared/components/Skeleton";

const OrderCardSkeleton = () => {
  return (
    <div className="border-border-secondary flex flex-col gap-4 rounded-lg border p-6 shadow-md">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex w-[260px] shrink-0 items-center gap-x-5">
          <div className="border-border-secondary flex h-14 w-14 shrink-0 items-center justify-center rounded-md border">
            <Skeleton withShimmer className="h-6 w-6 rounded" />
          </div>

          <div className="flex flex-col gap-y-5">
            <div className="flex flex-col gap-y-1.5">
              <div className="flex items-center gap-x-3">
                <Skeleton withShimmer className="h-5 w-32" />
                <Skeleton withShimmer className="h-6 w-20 rounded-full" />
              </div>

              <div className="flex items-center gap-x-3">
                <Skeleton withShimmer className="h-4 w-24" />
                <div className="bg-border-primary h-1 w-1 rounded-full" />
                <Skeleton withShimmer className="h-4 w-16" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-[130px] shrink-0 flex-col gap-y-2">
          <Skeleton withShimmer className="h-4 w-24" />
          <Skeleton withShimmer className="h-6 w-28" />
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex overflow-x-auto">
          <div className="flex min-w-max gap-x-3 md:gap-x-5">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} withShimmer className="h-14 w-14 rounded" />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-x-4 md:min-w-[250px]">
          <Skeleton withShimmer className="h-10 w-full rounded-full md:w-28" />
          <Skeleton withShimmer className="h-10 w-full rounded-full md:w-32" />
        </div>
      </div>
    </div>
  );
};

export default OrderCardSkeleton;
