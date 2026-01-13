import type {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { Controller } from "react-hook-form";

type GenericFormTextAreaProps<TFieldValues extends FieldValues> = {
  field: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  rules?: RegisterOptions<TFieldValues, FieldPath<TFieldValues>>;
};

const GenericFormTextArea = <TFieldValues extends FieldValues>({
  field,
  control,
  placeholder,
  required,
  disabled = false,
  rows = 3,
  rules,
}: GenericFormTextAreaProps<TFieldValues>) => {
  return (
    <Controller
      name={field}
      control={control}
      rules={{
        ...(required && { required: "This field is required!" }),
        ...rules,
      }}
      render={({ field, fieldState }) => (
        <textarea
          {...field}
          rows={rows}
          placeholder={placeholder}
          disabled={disabled}
          className={`text-s14-l20 text-text-primary placeholder:text-gray-2 h-20 resize-none rounded-[10px] border px-4 py-3 ${
            disabled
              ? "bg-gray-3 text-gray-6 cursor-not-allowed opacity-60"
              : fieldState.error
                ? "border-error-primary focus:border-error-primary outline-none"
                : "border-gray-2 focus:outline-none"
          }`}
        />
      )}
    />
  );
};

export default GenericFormTextArea;
