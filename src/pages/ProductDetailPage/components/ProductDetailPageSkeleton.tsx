import Skeleton from "../../../shared/components/Skeleton";

const ProductDetailPageSkeleton = () => {
  return (
    <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-y-5 pb-[72px] md:px-10 md:py-4 md:pb-4">
      {/* BREADCRUMB (desktop only) */}
      <Skeleton withShimmer className="hidden h-5 w-1/3 md:block" />

      <div className="flex flex-col gap-4 md:flex-row md:gap-8">
        {/* IMAGES */}
        <div className="flex flex-col gap-6">
          <div className="border-gray-2 bg-surface-primary h-[450px] w-full overflow-hidden md:h-[500px] md:w-[400px] md:rounded-xl md:border">
            <Skeleton withShimmer className="h-full w-full rounded-none" />
          </div>

          {/* THUMBNAILS (desktop only) */}
          <div className="hidden gap-3 md:flex">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="border-gray-2 bg-surface-primary h-20 w-20 overflow-hidden rounded-lg border"
              >
                <Skeleton withShimmer className="h-full w-full rounded-none" />
              </div>
            ))}
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex flex-1 flex-col gap-2 px-4 md:gap-4 md:px-0">
          {/* TITLE */}
          <Skeleton withShimmer className="h-6 w-2/3 md:h-8 md:w-1/2" />

          {/* DESCRIPTION */}
          <div className="flex flex-col gap-2">
            <Skeleton withShimmer className="h-4 w-full md:h-5 md:w-2/3" />
            <Skeleton withShimmer className="h-4 w-5/6 md:h-5 md:w-1/2" />
          </div>

          {/* STOCK INFO */}
          <div className="flex flex-col gap-1">
            <Skeleton withShimmer className="h-4 w-2/3" />
            <Skeleton withShimmer className="h-4 w-1/2" />
          </div>

          {/* PRICE (desktop only) */}
          <Skeleton withShimmer className="hidden h-8 w-1/3 md:block" />

          {/* ACTIONS (desktop only) */}
          <div className="hidden items-center gap-4 md:flex">
            <Skeleton withShimmer className="h-12 w-40 rounded-lg" />
            <Skeleton withShimmer className="h-12 w-12 rounded-full" />
          </div>
        </div>
      </div>

      {/* MOBILE BOTTOM BAR */}
      <div className="border-gray-2 bg-surface-primary fixed bottom-0 left-0 z-40 flex w-full items-center justify-between gap-3 border-t p-2.5 md:hidden">
        <Skeleton withShimmer className="h-6 w-24" />
        <Skeleton withShimmer className="h-12 w-40 rounded-lg" />
      </div>
    </div>
  );
};

export default ProductDetailPageSkeleton;
