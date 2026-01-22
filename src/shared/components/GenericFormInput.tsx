import type {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { Controller } from "react-hook-form";
import {
  INPUT_BASE,
  INPUT_DISABLED,
  INPUT_ERROR,
} from "../constants/CommonTailwindClasses.constants";
import { customTwMerge } from "../utils/Tailwind.util";

type GenericFormInputProps<TFieldValues extends FieldValues> = {
  field: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
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
  minLength,
  maxLength,
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

        ...(!isNumber &&
          minLength !== undefined && {
            minLength: {
              value: minLength,
              message: `Minimum length is ${minLength}`,
            },
          }),

        ...(!isNumber &&
          maxLength !== undefined && {
            maxLength: {
              value: maxLength,
              message: `Maximum length is ${maxLength}`,
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
          minLength={!isNumber ? minLength : undefined}
          maxLength={!isNumber ? maxLength : undefined}
          className={customTwMerge(
            INPUT_BASE,
            disabled ? INPUT_DISABLED : fieldState.error ? INPUT_ERROR : "",
          )}
        />
      )}
    />
  );
};

export default GenericFormInput;
