import Skeleton from "../../../shared/components/Skeleton";

const ProductDetailPageSkeleton = () => {
  return (
    <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-y-6 pb-20 md:px-10 md:pt-8 lg:pb-8">
      <Skeleton withShimmer className="h-5 w-2/3 md:w-1/3" />

      <div className="flex flex-col gap-10 lg:flex-row xl:gap-14">
        <div className="flex flex-col gap-4">
          <div className="border-border-primary relative h-[450px] w-full overflow-hidden shadow-lg md:rounded-xl md:border lg:h-[337px] lg:w-[472px] xl:h-[430px] xl:w-[600px] 2xl:h-[500px] 2xl:w-[700px]">
            <Skeleton withShimmer className="h-full w-full rounded-none" />
          </div>

          <div className="hidden gap-3 md:flex">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="border-border-primary h-32 w-32 overflow-hidden rounded-lg border-2 p-2 shadow-lg lg:h-24 lg:w-24 xl:h-32 xl:w-32"
              >
                <Skeleton withShimmer className="h-full w-full rounded-none" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2 px-4 md:gap-8 md:px-0">
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2">
              <Skeleton withShimmer className="h-7 w-1/3 md:h-8 md:w-1/4" />
              <Skeleton withShimmer className="h-9 w-5/6 md:h-10 md:w-2/3" />
            </div>

            <Skeleton withShimmer className="h-5 w-48" />

            <div className="flex flex-col gap-y-6">
              <Skeleton withShimmer className="h-5 w-44" />

              <div className="bg-surface-muted border-border-secondary hidden rounded-lg border p-6 lg:block">
                <Skeleton withShimmer className="h-11 w-1/2" />
              </div>

              <div className="flex flex-col gap-y-2">
                <Skeleton withShimmer className="h-4 w-full" />
                <Skeleton withShimmer className="h-4 w-11/12" />
                <Skeleton withShimmer className="h-4 w-10/12" />
              </div>
            </div>
          </div>

          <div className="hidden items-center gap-x-4 lg:flex">
            <Skeleton withShimmer className="h-12 flex-1 rounded-lg" />
            <Skeleton withShimmer className="h-12 w-12 rounded-full" />
          </div>

          <div className="flex flex-col gap-y-6">
            <div className="bg-border-secondary h-px" />

            <div className="bg-surface-primary border-border-primary flex flex-col gap-y-4 rounded-lg border p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-y-0">
              <div className="flex min-w-0 items-center gap-x-4">
                <Skeleton
                  withShimmer
                  className="h-12 w-12 shrink-0 rounded-full"
                />

                <div className="flex min-w-0 flex-col gap-y-2">
                  <Skeleton withShimmer className="h-5 w-40 max-w-full" />
                  <div className="flex items-center gap-x-2">
                    <Skeleton withShimmer className="h-5 w-14" />
                    <Skeleton withShimmer className="h-4 w-20" />
                  </div>
                </div>
              </div>

              <Skeleton
                withShimmer
                className="h-10 w-full rounded-lg sm:w-36 md:w-40 lg:w-28 xl:w-32"
              />
            </div>

            <div className="bg-border-secondary h-px" />

            <div className="grid grid-cols-2 grid-rows-2 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex items-center gap-x-3">
                  <Skeleton withShimmer className="h-6 w-6 rounded-md" />
                  <Skeleton withShimmer className="h-4 w-28" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col px-4 md:px-0">
        <div className="border-border-primary border-b">
          <div className="no-scrollbar flex items-center gap-x-8 overflow-x-auto pr-10 whitespace-nowrap">
            <Skeleton withShimmer className="h-6 w-20" />
            <Skeleton withShimmer className="h-6 w-32" />
          </div>
        </div>

        <div className="py-4 md:py-8 lg:py-12">
          <Skeleton withShimmer className="h-48 w-full rounded-xl" />
        </div>
      </div>

      <div className="border-border-primary bg-surface-primary fixed bottom-0 left-0 z-40 flex w-full items-end justify-between gap-3 border-t p-2.5 lg:hidden">
        <Skeleton withShimmer className="h-8 w-36" />
        <Skeleton withShimmer className="h-12 w-40 rounded-lg" />
      </div>
    </div>
  );
};

export default ProductDetailPageSkeleton;
