const OrderCardSkeleton = () => {
  return (
    <div className="border-gray-1 bg-surface-primary relative overflow-hidden rounded-lg border">
      <div className="animate-shimmer via-surface-primary/40 absolute inset-0 bg-linear-to-r from-transparent to-transparent" />

      <div className="border-gray-1 bg-gray-3 flex items-center gap-x-5 border-b px-5 py-3">
        <div className="flex flex-1 gap-x-5">
          <div className="flex-1">
            <div className="bg-gray-5 h-4 w-24 rounded" />
            <div className="bg-gray-5 mt-2 h-4 w-32 rounded" />
          </div>

          <div className="flex-1">
            <div className="bg-gray-5 h-4 w-28 rounded" />
            <div className="bg-gray-5 mt-2 h-4 w-20 rounded" />
          </div>

          <div className="flex-1">
            <div className="bg-gray-5 h-4 w-20 rounded" />
            <div className="bg-gray-5 mt-2 h-4 w-28 rounded" />
          </div>

          <div className="flex-1">
            <div className="bg-gray-5 h-4 w-14 rounded" />
            <div className="bg-gray-5 mt-2 h-5 w-24 rounded" />
          </div>
        </div>

        <div className="bg-gray-5 h-8 w-24 rounded-md" />
      </div>

      <div className="p-5">
        <div className="border-gray-1 flex items-center gap-x-6 rounded-md border px-5 py-3">
          <div className="w-[30%] shrink-0">
            <div className="bg-gray-5 h-4 w-28 rounded" />
          </div>

          <div className="flex-1 overflow-x-auto">
            <div className="flex min-w-max gap-x-5">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="bg-gray-5 h-20 w-20 rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCardSkeleton;
