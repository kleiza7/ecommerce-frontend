type LoadingSpinnerProps = {
  size?: number; // px
  colorClassName?: string; // tailwind color
  borderWidth?: number; // px
  className?: string;
};

const LoadingSpinner = ({
  size = 24,
  borderWidth = 2,
  className = "",
}: LoadingSpinnerProps) => {
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
