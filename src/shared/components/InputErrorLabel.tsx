import { customTwMerge } from "../utils/Tailwind.util";

const InputErrorLabel = ({
  message,
  className,
}: {
  message?: string;
  className?: string;
}) => {
  if (!message) return null;

  return (
    <span
      className={customTwMerge(
        "text-s12-l16 text-error-primary absolute -bottom-4 left-0",
        className,
      )}
    >
      {message}
    </span>
  );
};

export default InputErrorLabel;
