import type {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { Controller } from "react-hook-form";
import {
  TEXT_AREA_BASE,
  TEXT_AREA_DISABLED,
  TEXT_AREA_ERROR,
} from "../constants/CommonTailwindClasses.constants";
import { customTwMerge } from "../utils/Tailwind.util";

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
          className={customTwMerge(
            TEXT_AREA_BASE,
            disabled
              ? TEXT_AREA_DISABLED
              : fieldState.error
                ? TEXT_AREA_ERROR
                : "",
          )}
        />
      )}
    />
  );
};

export default GenericFormTextArea;
