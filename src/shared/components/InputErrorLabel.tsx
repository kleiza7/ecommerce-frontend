const InputErrorLabel = ({ message }: { message?: string }) => {
  if (!message) return null;

  return (
    <span className="text-s12-l16 text-error-primary absolute -bottom-4 left-0">
      {message}
    </span>
  );
};

export default InputErrorLabel;
