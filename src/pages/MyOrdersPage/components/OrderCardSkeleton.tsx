import Skeleton from "../../../shared/components/Skeleton";

const OrderCardSkeleton = () => {
  return (
    <div className="border-border-secondary flex justify-between rounded-lg border p-6 shadow-md">
      <div className="flex gap-x-5">
        <div className="border-border-secondary flex h-14 w-14 items-center justify-center rounded-md border">
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

          <div className="flex min-w-max gap-x-5">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} withShimmer className="h-8 w-8 rounded" />
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-x-8">
        <div className="flex flex-col gap-y-2">
          <Skeleton withShimmer className="h-4 w-24" />
          <Skeleton withShimmer className="h-6 w-28" />
        </div>

        <div className="flex min-w-[250px] items-center justify-end gap-x-4">
          <Skeleton withShimmer className="h-10 w-28 rounded-full" />
          <Skeleton withShimmer className="h-10 w-32 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default OrderCardSkeleton;
