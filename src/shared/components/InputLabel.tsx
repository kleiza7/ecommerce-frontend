const InputLabel = ({
  label,
  hasAsterisk,
}: {
  label: string;
  hasAsterisk?: boolean;
}) => {
  return (
    <span className="text-s14-l20 text-text-primary inline-flex items-center font-medium">
      {label}
      {hasAsterisk && <span className="text-error-primary ml-0.5">*</span>}
    </span>
  );
};

export default InputLabel;
