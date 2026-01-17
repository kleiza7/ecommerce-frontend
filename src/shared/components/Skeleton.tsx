import { customTwMerge } from "../utils/Tailwind.util";

const Skeleton = ({
  className,
  withShimmer = false,
}: {
  className?: string;
  withShimmer?: boolean;
}) => {
  return (
    <div
      className={customTwMerge(
        "bg-gray-5 rounded",
        withShimmer ? "relative overflow-hidden" : "",
        className ?? "",
      )}
    >
      {withShimmer && (
        <div className="animate-shimmer via-surface-primary/40 absolute inset-0 bg-linear-to-r from-transparent to-transparent" />
      )}
    </div>
  );
};

export default Skeleton;
