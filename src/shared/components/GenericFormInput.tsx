import type {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { Controller } from "react-hook-form";

type GenericFormInputProps<TFieldValues extends FieldValues> = {
  field: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;

  /** number type için */
  min?: number;
  max?: number;

  /** extra override gerekirse */
  rules?: RegisterOptions<TFieldValues, FieldPath<TFieldValues>>;
};

const GenericFormInput = <TFieldValues extends FieldValues>({
  field,
  control,
  type = "text",
  placeholder,
  required,
  disabled = false,
  min,
  max,
  rules,
}: GenericFormInputProps<TFieldValues>) => {
  const isNumber = type === "number";

  return (
    <Controller
      name={field}
      control={control}
      rules={{
        ...(required && { required: "This field is required!" }),

        ...(isNumber && { valueAsNumber: true }),

        ...(isNumber &&
          min !== undefined && {
            min: {
              value: min,
              message: `Minimum value is ${min}`,
            },
          }),

        ...(isNumber &&
          max !== undefined && {
            max: {
              value: max,
              message: `Maximum value is ${max}`,
            },
          }),

        ...rules,
      }}
      render={({ field, fieldState }) => (
        <input
          {...field}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          min={isNumber ? min : undefined}
          max={isNumber ? max : undefined}
          className={`text-s14-l20 text-text-primary placeholder:text-gray-2 h-10 rounded-lg border pl-5 font-medium outline-none ${
            disabled
              ? "bg-gray-3 text-gray-6 cursor-not-allowed opacity-60"
              : fieldState.error
                ? "border-error-primary focus:border-error-primary"
                : "border-gray-2"
          }`}
        />
      )}
    />
  );
};

export default GenericFormInput;
