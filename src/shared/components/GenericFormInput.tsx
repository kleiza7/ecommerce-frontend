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
  rules?: RegisterOptions<TFieldValues, FieldPath<TFieldValues>>;
};

const GenericFormInput = <TFieldValues extends FieldValues>({
  field,
  control,
  type = "text",
  placeholder,
  required,
  disabled = false,
  rules,
}: GenericFormInputProps<TFieldValues>) => {
  return (
    <Controller
      name={field}
      control={control}
      rules={{
        ...(required && { required: "This field is required!" }),
        ...rules,
      }}
      render={({ field, fieldState }) => (
        <input
          className={`text-s14-l20 text-text-primary placeholder:text-gray-2 h-12 rounded-[10px] border pl-5 font-medium ${
            disabled
              ? "bg-gray-3 text-gray-6 cursor-not-allowed opacity-60"
              : fieldState.error
                ? "border-error-primary focus:border-error-primary outline-none"
                : "border-gray-2"
          }`}
          {...field}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
        />
      )}
    />
  );
};

export default GenericFormInput;
