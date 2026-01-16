import LoadingSpinner from "../shared/components/LoadingSpinner";

const PageFallback = () => {
  return (
    <div className="flex h-[60vh] items-center justify-center">
      <LoadingSpinner size={48} borderWidth={4} />
    </div>
  );
};

export default PageFallback;
