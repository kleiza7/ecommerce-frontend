import Skeleton from "../../../shared/components/Skeleton";

const OrderCardSkeleton = () => {
  return (
    <div className="border-gray-1 bg-surface-primary overflow-hidden rounded-lg border">
      <div className="border-gray-1 bg-gray-3 flex flex-col gap-3 border-b px-5 py-3 md:flex-row md:items-center md:gap-x-5">
        <div className="flex flex-1 flex-wrap gap-y-3 md:flex-nowrap md:gap-x-5">
          <div className="flex w-1/2 flex-col gap-2 md:w-auto md:flex-1">
            <Skeleton withShimmer className="h-4 w-24" />
            <Skeleton withShimmer className="h-4 w-32" />
          </div>

          <div className="flex w-1/2 flex-col gap-2 md:w-auto md:flex-1">
            <Skeleton withShimmer className="h-4 w-28" />
            <Skeleton withShimmer className="h-4 w-20" />
          </div>

          <div className="flex w-1/2 flex-col gap-2 md:w-auto md:flex-1">
            <Skeleton withShimmer className="h-4 w-20" />
            <Skeleton withShimmer className="h-4 w-28" />
          </div>

          <div className="flex w-1/2 flex-col gap-2 md:w-auto md:flex-1">
            <Skeleton withShimmer className="h-4 w-14" />
            <Skeleton withShimmer className="h-5 w-24" />
          </div>
        </div>

        <Skeleton withShimmer className="h-8 w-full rounded-md md:w-24" />
      </div>

      <div className="p-5">
        <div className="border-gray-1 flex flex-col gap-y-3 rounded-md border px-5 py-3 md:flex-row md:items-center md:gap-x-6 md:gap-y-0">
          <div className="md:w-[30%] md:shrink-0">
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
