import Skeleton from "../../../shared/components/Skeleton";

const CheckoutPageSkeleton = () => {
  return (
    <div className="mx-auto flex w-full max-w-[1380px] flex-col px-3 pt-3 pb-64 md:px-10 md:pt-6 lg:py-10">
      <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
        <Skeleton withShimmer className="h-8 w-40" />

        <div className="flex items-start gap-x-8">
          <div className="flex min-w-0 flex-1 flex-col gap-4 md:gap-6">
            {/* ITEMS */}
            <div className="border-border-primary flex flex-col rounded-md border">
              <div className="border-border-primary bg-surface-secondary border-b px-6 py-4">
                <Skeleton withShimmer className="h-6 w-56" />
              </div>

              <div className="w-full overflow-x-auto p-6">
                <div className="flex min-w-max gap-x-6">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex w-32 shrink-0 flex-col items-center gap-2"
                    >
                      <Skeleton withShimmer className="h-32 w-full rounded" />
                      <Skeleton withShimmer className="h-4 w-16" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RECEIVER INFORMATION */}
            <div className="border-border-primary flex flex-col rounded-md border">
              <div className="border-border-primary bg-surface-secondary border-b px-6 py-4">
                <Skeleton withShimmer className="h-6 w-48" />
              </div>

              <div className="flex flex-col gap-y-6 p-8">
                {/* Full Name & Phone */}
                <div className="flex flex-col gap-6 md:flex-row">
                  <div className="flex flex-1 flex-col gap-1">
                    <Skeleton withShimmer className="h-4 w-28" />
                    <Skeleton withShimmer className="h-11 w-full rounded" />
                  </div>

                  <div className="flex flex-1 flex-col gap-1">
                    <Skeleton withShimmer className="h-4 w-32" />
                    <Skeleton withShimmer className="h-11 w-full rounded" />
                  </div>
                </div>

                {/* Address */}
                <div className="flex flex-col gap-1">
                  <Skeleton withShimmer className="h-4 w-28" />
                  <Skeleton withShimmer className="h-24 w-full rounded" />
                </div>
              </div>
            </div>

            {/* PAYMENT DETAILS */}
            <div className="border-border-primary flex flex-col rounded-md border">
              <div className="border-border-primary bg-surface-secondary border-b px-6 py-4">
                <Skeleton withShimmer className="h-6 w-44" />
              </div>

              <div className="flex flex-col gap-y-6 p-8">
                {/* Card Holder */}
                <div className="flex flex-col gap-1">
                  <Skeleton withShimmer className="h-4 w-40" />
                  <Skeleton withShimmer className="h-11 w-full rounded" />
                </div>

                {/* Card Number */}
                <div className="flex flex-col gap-1">
                  <Skeleton withShimmer className="h-4 w-32" />
                  <Skeleton withShimmer className="h-11 w-full rounded" />
                </div>

                {/* Expiry & CVC */}
                <div className="flex flex-col gap-6 md:flex-row">
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

          {/* SUMMARY */}
          <div className="bg-surface-primary border-border-primary fixed inset-x-0 bottom-0 z-10 flex w-full shrink-0 flex-col gap-4 border-t p-4 lg:static lg:w-[340px] lg:gap-6 lg:rounded-lg lg:border lg:p-6 lg:shadow-lg xl:w-[440px] xl:gap-8 xl:p-8">
            <Skeleton withShimmer className="h-7 w-40" />

            <div className="flex justify-between">
              <Skeleton withShimmer className="h-5 w-20" />
              <Skeleton withShimmer className="h-5 w-24" />
            </div>

            <div className="bg-surface-secondary h-px" />

            <div className="flex justify-between font-medium">
              <Skeleton withShimmer className="h-6 w-16" />
              <Skeleton withShimmer className="h-6 w-24" />
            </div>

            <Skeleton withShimmer className="h-12 w-full rounded-xl xl:h-14" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPageSkeleton;
