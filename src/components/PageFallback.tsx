import LoadingSpinner from "../shared/components/LoadingSpinner";

const PageFallback = () => {
  return (
    <div className="mx-auto flex h-[60vh] w-full max-w-[1480px] flex-col items-center justify-center px-10 py-4">
      <LoadingSpinner size={48} borderWidth={4} />
    </div>
  );
};

export default PageFallback;
