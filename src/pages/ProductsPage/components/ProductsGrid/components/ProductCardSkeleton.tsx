const ProductCardSkeleton = () => {
  return (
    <div className="border-gray-2 bg-surface-primary relative flex h-[500px] w-full overflow-hidden rounded-xl border">
      <div className="animate-shimmer via-surface-primary/40 absolute inset-0 bg-linear-to-r from-transparent to-transparent" />

      <div className="flex w-full flex-col">
        <div className="bg-gray-5 h-[360px] w-full" />

        <div className="flex flex-1 flex-col gap-2 p-3">
          <div className="bg-gray-5 h-4 w-3/4 rounded" />
          <div className="bg-gray-5 h-3 w-full rounded" />
          <div className="bg-gray-5 h-3 w-5/6 rounded" />

          <div className="bg-gray-5 mt-auto h-6 w-1/3 rounded" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
