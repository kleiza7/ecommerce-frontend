import Skeleton from "../../../shared/components/Skeleton";

const CheckoutPageSkeleton = () => {
  return (
    <div className="mx-auto flex w-full max-w-[1380px] flex-col px-3 pt-3 pb-64 md:px-10 md:pt-6 lg:py-10">
      <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
        <Skeleton withShimmer className="h-8 w-40" />

        <div className="flex items-start gap-x-8">
          <div className="flex min-w-0 flex-1 flex-col gap-4 md:gap-6">
            <div className="border-gray-2 flex flex-col rounded-md border">
              <div className="border-gray-2 bg-gray-3 border-b px-5 py-3">
                <Skeleton withShimmer className="h-6 w-56" />
              </div>

              <div className="w-full overflow-x-auto px-5 pt-4 pb-3">
                <div className="flex min-w-max gap-x-6">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex w-[89px] shrink-0 flex-col items-center gap-2"
                    >
                      <Skeleton withShimmer className="h-32 w-full rounded" />
                      <Skeleton withShimmer className="h-4 w-16" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-gray-2 flex flex-col rounded-md border">
              <div className="border-gray-2 bg-gray-3 border-b px-5 py-3">
                <Skeleton withShimmer className="h-6 w-48" />
              </div>

              <div className="flex flex-col gap-y-3 px-5 py-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex flex-col gap-1">
                    <Skeleton withShimmer className="h-4 w-28" />
                    <Skeleton withShimmer className="h-11 w-full rounded" />
                  </div>
                ))}
              </div>
            </div>

            <div className="border-gray-2 flex flex-col rounded-md border">
              <div className="border-gray-2 bg-gray-3 border-b px-5 py-3">
                <Skeleton withShimmer className="h-6 w-44" />
              </div>

              <div className="flex flex-col gap-y-3 px-5 py-4">
                <div className="flex flex-col gap-1">
                  <Skeleton withShimmer className="h-4 w-40" />
                  <Skeleton withShimmer className="h-11 w-full rounded" />
                </div>

                <div className="flex flex-col gap-1">
                  <Skeleton withShimmer className="h-4 w-32" />
                  <Skeleton withShimmer className="h-11 w-full rounded" />
                </div>

                <div className="flex gap-x-4">
                  <div className="flex flex-1 flex-col gap-1">
                    <Skeleton withShimmer className="h-4 w-28" />
                    <Skeleton withShimmer className="h-11 w-full rounded" />
                  </div>

                  <div className="flex flex-1 flex-col gap-1">
                    <Skeleton withShimmer className="h-4 w-16" />
                    <Skeleton withShimmer className="h-11 w-full rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface-primary border-gray-2 fixed inset-x-0 bottom-0 z-10 flex w-full shrink-0 flex-col gap-4 border-t p-6 lg:static lg:w-[440px] lg:rounded-lg lg:border lg:shadow-lg">
            <Skeleton withShimmer className="h-7 w-40" />

            <div className="flex justify-between">
              <Skeleton withShimmer className="h-5 w-20" />
              <Skeleton withShimmer className="h-5 w-24" />
            </div>

            <div className="bg-gray-5 h-px" />

            <div className="flex justify-between font-medium">
              <Skeleton withShimmer className="h-6 w-16" />
              <Skeleton withShimmer className="h-6 w-24" />
            </div>

            <Skeleton withShimmer className="h-[56px] w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPageSkeleton;
