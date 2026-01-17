const ProductDetailPageSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-5">
      <div className="bg-gray-5 h-5 w-1/2 rounded" />

      <div className="flex gap-8">
        <div className="flex flex-col gap-4">
          <div className="border-gray-2 bg-surface-primary relative h-[500px] w-[400px] overflow-hidden rounded-xl border">
            <div className="animate-shimmer via-surface-primary/40 absolute inset-0 bg-linear-to-r from-transparent to-transparent" />
            <div className="bg-gray-5 h-full w-full" />
          </div>

          <div className="mt-2 flex gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="border-gray-2 bg-surface-primary relative h-20 w-20 overflow-hidden rounded-lg border"
              >
                <div className="animate-shimmer via-surface-primary/40 absolute inset-0 bg-linear-to-r from-transparent to-transparent" />
                <div className="bg-gray-5 h-full w-full" />
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex flex-1 flex-col gap-4 overflow-hidden">
          <div className="animate-shimmer via-surface-primary/40 absolute inset-0 bg-linear-to-r from-transparent to-transparent" />

          <div className="bg-gray-5 h-7 w-1/2 rounded" />

          <div className="flex flex-col gap-2">
            <div className="bg-gray-5 h-5 w-1/2 rounded" />
            <div className="bg-gray-5 h-5 w-1/2 rounded" />
          </div>

          <div className="bg-gray-5 h-8 w-44 rounded" />

          <div className="flex flex-col gap-2">
            <div className="bg-gray-5 h-4 w-72 rounded" />
            <div className="bg-gray-5 h-4 w-80 rounded" />
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-gray-5 h-12 w-40 rounded-lg" />
            <div className="bg-gray-5 h-12 w-12 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPageSkeleton;
