import Skeleton from "../../../../../shared/components/Skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="border-border-primary bg-surface-primary relative flex h-[380px] w-full overflow-hidden rounded-xl border md:h-[460px] 2xl:h-[500px]">
      <div className="flex w-full flex-col">
        <Skeleton
          withShimmer
          className="h-[260px] w-full shrink-0 rounded-none md:h-80 2xl:h-[360px]"
        />

        <div className="border-border-primary flex flex-1 flex-col gap-2 border-t p-4">
          <Skeleton withShimmer className="h-5 w-3/4" />
          <Skeleton withShimmer className="h-4 w-1/2" />
          <Skeleton withShimmer className="h-3 w-full" />
          <Skeleton withShimmer className="h-3 w-5/6" />
          <Skeleton withShimmer className="mt-auto h-6 w-1/3" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
