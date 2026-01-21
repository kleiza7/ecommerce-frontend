import Skeleton from "../../../../../shared/components/Skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="border-gray-2 bg-surface-primary relative flex h-[460px] w-full overflow-hidden rounded-xl border 2xl:h-[500px]">
      <div className="flex w-full flex-col">
        <Skeleton
          withShimmer
          className="h-80 w-full rounded-none 2xl:h-[360px]"
        />

        <div className="flex flex-1 flex-col gap-2 p-3">
          <Skeleton withShimmer className="h-4 w-3/4" />
          <Skeleton withShimmer className="h-3 w-full" />
          <Skeleton withShimmer className="h-3 w-5/6" />
          <Skeleton withShimmer className="mt-auto h-6 w-1/3" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
