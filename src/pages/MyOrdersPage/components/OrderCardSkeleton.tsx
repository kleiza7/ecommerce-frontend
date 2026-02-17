import Skeleton from "../../../shared/components/Skeleton";

const OrderCardSkeleton = () => {
  return (
    <div className="border-gray-1 bg-surface-primary overflow-hidden rounded-lg border">
      <div className="border-gray-1 bg-gray-3 flex flex-col gap-3 border-b px-5 py-3 lg:flex-row lg:items-center lg:gap-x-5">
        <div className="flex flex-1 flex-wrap gap-y-3 lg:flex-nowrap lg:gap-x-5">
          <div className="flex w-1/2 flex-col gap-2 lg:w-auto lg:flex-1">
            <Skeleton withShimmer className="h-4 w-24" />
            <Skeleton withShimmer className="h-4 w-32" />
          </div>

          <div className="flex w-1/2 flex-col gap-2 lg:w-auto lg:flex-1">
            <Skeleton withShimmer className="h-4 w-28" />
            <Skeleton withShimmer className="h-4 w-20" />
          </div>

          <div className="flex w-1/2 flex-col gap-2 lg:w-auto lg:flex-1">
            <Skeleton withShimmer className="h-4 w-20" />
            <Skeleton withShimmer className="h-4 w-28" />
          </div>

          <div className="flex w-1/2 flex-col gap-2 lg:w-auto lg:flex-1">
            <Skeleton withShimmer className="h-4 w-14" />
            <Skeleton withShimmer className="h-5 w-24" />
          </div>
        </div>

        <div className="flex w-full items-center gap-x-4 lg:w-[220px] lg:justify-end">
          <Skeleton withShimmer className="h-8 w-full rounded-md lg:w-24" />
        </div>
      </div>

      <div className="p-5">
        <div className="border-gray-1 flex flex-col gap-y-3 rounded-md border px-5 py-3 lg:flex-row lg:items-center lg:gap-x-6 lg:gap-y-0">
          <div className="lg:w-[30%] lg:shrink-0">
            <Skeleton withShimmer className="h-4 w-28" />
          </div>

          <div className="flex-1 overflow-x-auto">
            <div className="flex min-w-max gap-x-5">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} withShimmer className="h-20 w-20" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCardSkeleton;
