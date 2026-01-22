import Skeleton from "../../../shared/components/Skeleton";

const ProductDetailPageSkeleton = () => {
  return (
    <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-y-5 px-10 py-4">
      <Skeleton withShimmer className="h-5 w-1/2" />

      <div className="flex gap-8">
        <div className="flex flex-col gap-6">
          <div className="border-gray-2 bg-surface-primary h-[500px] w-[400px] overflow-hidden rounded-xl border">
            <Skeleton withShimmer className="h-full w-full rounded-none" />
          </div>

          <div className="flex gap-3">
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

        <div className="flex flex-1 flex-col gap-4">
          <Skeleton withShimmer className="h-7 w-1/2" />

          <div className="flex flex-col gap-2">
            <Skeleton withShimmer className="h-5 w-1/2" />
            <Skeleton withShimmer className="h-5 w-1/2" />
          </div>

          <Skeleton withShimmer className="h-8 w-7/12" />

          <div className="flex flex-col gap-2">
            <Skeleton withShimmer className="h-4 w-5/6" />
            <Skeleton withShimmer className="h-4 w-full" />
          </div>

          <div className="flex items-center gap-4">
            <Skeleton withShimmer className="h-12 w-40 rounded-lg" />
            <Skeleton withShimmer className="h-12 w-12 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPageSkeleton;
