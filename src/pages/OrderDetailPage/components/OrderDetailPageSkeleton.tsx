import Skeleton from "../../../shared/components/Skeleton";

const OrderDetailPageSkeleton = () => {
  return (
    <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-3 p-3 md:gap-5 md:px-10 md:py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <Skeleton withShimmer className="h-4 w-4" />
          <Skeleton withShimmer className="h-4 w-24" />
        </div>
      </div>

      <div className="border-gray-1 flex flex-col gap-y-2 rounded-md border px-5 py-4 md:flex-row md:items-center md:justify-between md:gap-y-0">
        <Skeleton withShimmer className="h-5 w-32" />

        <div className="flex justify-between gap-x-10 md:justify-start md:gap-x-20">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-1">
              <Skeleton withShimmer className="h-3 w-20" />
              <Skeleton withShimmer className="h-4 w-24" />
            </div>
          ))}
        </div>
      </div>

      {Array.from({ length: 2 }).map((_, groupIndex) => (
        <div
          key={groupIndex}
          className="border-gray-1 flex flex-col gap-y-4 rounded-md border p-4"
        >
          <div className="bg-gray-3 flex items-center rounded-md px-4 py-1.5">
            <Skeleton withShimmer className="h-4 w-40" />
          </div>

          <div className="overflow-x-auto">
            <div className="flex min-w-max gap-x-3 md:gap-x-5">
              {Array.from({ length: 3 }).map((_, itemIndex) => (
                <div
                  key={itemIndex}
                  className="border-gray-1 flex w-[280px] shrink-0 gap-x-4 rounded-md border p-3 md:w-[360px] 2xl:w-[470px]"
                >
                  <Skeleton
                    withShimmer
                    className="h-[110px] w-[110px] rounded"
                  />

                  <div className="flex min-w-0 flex-1 flex-col gap-2 py-2">
                    <Skeleton withShimmer className="h-4 w-1/2" />
                    <Skeleton withShimmer className="h-4 w-3/4" />
                    <Skeleton withShimmer className="h-4 w-1/3" />
                    <Skeleton withShimmer className="mt-auto h-4 w-1/4" />
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
