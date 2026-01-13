const LoadingSpinner = ({
  size = 24,
  borderWidth = 2,
  className = "",
}: {
  size?: number;
  colorClassName?: string;
  borderWidth?: number;
  className?: string;
}) => {
  return (
    <div
      className={`border-orange animate-spin rounded-full border-t-transparent ${className} `}
      style={{
        width: size,
        height: size,
        borderWidth,
      }}
      aria-label="Loading"
      role="status"
    />
  );
};

export default LoadingSpinner;
