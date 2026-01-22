import * as Select from "@radix-ui/react-select";
import type { ReactNode } from "react";
import { CheckIcon, KeyboardArrowUpIcon } from "../../assets/icons";
import { customTwMerge } from "../utils/Tailwind.util";

type GenericSelectOption<T> = {
  label: string;
  value: T;
};

type GenericSelectProps<T> = {
  value?: T;
  options: GenericSelectOption<T>[];
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: T) => void;
  renderValue?: (value: T) => ReactNode;
  className?: string;
};

const isSameValue = <T,>(a?: T, b?: T) =>
  JSON.stringify(a) === JSON.stringify(b);

const GenericSelect = <T,>({
  value,
  options,
  placeholder,
  disabled,
  onChange,
  renderValue,
  className,
}: GenericSelectProps<T>) => {
  const selectedOption = options.find((option) =>
    isSameValue(option.value, value),
  );

  return (
    <Select.Root
      disabled={disabled}
      value={selectedOption?.label}
      onValueChange={(label) => {
        const option = options.find((option) => option.label === label);
        if (option) onChange(option.value);
      }}
    >
      <Select.Trigger
        className={customTwMerge(
          "text-s14-l20 text-text-primary disabled:bg-gray-3 border-gray-2 flex h-10 w-full cursor-pointer items-center justify-between rounded-md border px-3 outline-none disabled:cursor-not-allowed disabled:opacity-60",
          className,
        )}
      >
        <Select.Value placeholder={placeholder}>
          {selectedOption
            ? renderValue
              ? renderValue(selectedOption.value)
              : selectedOption.label
            : placeholder}
        </Select.Value>

        {!disabled && (
          <Select.Icon>
            <KeyboardArrowUpIcon className="text-gray-8 h-4 w-4 rotate-180" />
          </Select.Icon>
        )}
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          align="start"
          sideOffset={4}
          className="bg-surface-primary border-gray-2 z-50 min-w-(--radix-select-trigger-width) rounded-md border shadow-md"
        >
          <Select.Viewport className="max-h-60 overflow-y-auto p-1">
            {options.map((option) => (
              <Select.Item
                key={option.label}
                value={option.label}
                className="text-s14-l20 text-text-primary data-[state=checked]:bg-gray-4 hover:bg-gray-4 relative flex cursor-pointer items-center rounded p-2 outline-none select-none"
              >
                <Select.ItemText className="truncate">
                  {option.label}
                </Select.ItemText>

                <Select.ItemIndicator className="absolute right-2 inline-flex items-center">
                  <CheckIcon className="h-4 w-4" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default GenericSelect;
