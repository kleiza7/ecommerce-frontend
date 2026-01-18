import Skeleton from "../../../shared/components/Skeleton";

const OrderCardSkeleton = () => {
  return (
    <div className="border-gray-1 bg-surface-primary overflow-hidden rounded-lg border">
      <div className="border-gray-1 bg-gray-3 flex items-center gap-x-5 border-b px-5 py-3">
        <div className="flex flex-1 gap-x-5">
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton withShimmer className="h-4 w-24" />
            <Skeleton withShimmer className="h-4 w-32" />
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <Skeleton withShimmer className="h-4 w-28" />
            <Skeleton withShimmer className="h-4 w-20" />
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <Skeleton withShimmer className="h-4 w-20" />
            <Skeleton withShimmer className="h-4 w-28" />
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <Skeleton withShimmer className="h-4 w-14" />
            <Skeleton withShimmer className="h-5 w-24" />
          </div>
        </div>

        <Skeleton withShimmer className="h-8 w-24 rounded-md" />
      </div>

      <div className="p-5">
        <div className="border-gray-1 flex items-center gap-x-6 rounded-md border px-5 py-3">
          <div className="w-[30%] shrink-0">
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
