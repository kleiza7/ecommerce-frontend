const ProductCardSkeleton = () => {
  return (
    <div className="border-gray-2 relative flex h-[500px] w-full overflow-hidden rounded-xl border bg-white">
      <div className="animate-shimmer absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent" />

      <div className="flex w-full flex-col">
        <div className="h-[360px] w-full bg-gray-200" />

        <div className="flex flex-1 flex-col gap-2 p-3">
          <div className="h-4 w-3/4 rounded bg-gray-200" />
          <div className="h-3 w-full rounded bg-gray-200" />
          <div className="h-3 w-5/6 rounded bg-gray-200" />

          <div className="mt-auto h-6 w-1/3 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
