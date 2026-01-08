// src/shared/components/GenericSelect.tsx

import * as Select from "@radix-ui/react-select";
import type { ReactNode } from "react";
import { CheckIcon, KeyboardArrowUpIcon } from "../../assets/icons";

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
}: GenericSelectProps<T>) => {
  const selectedOption = options.find((o) => isSameValue(o.value, value));

  return (
    <Select.Root
      disabled={disabled}
      value={selectedOption?.label}
      onValueChange={(label) => {
        const option = options.find((o) => o.label === label);
        if (option) onChange(option.value);
      }}
    >
      {/* TRIGGER */}
      <Select.Trigger className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 px-3 text-sm outline-none disabled:cursor-not-allowed disabled:bg-gray-100">
        <Select.Value placeholder={placeholder}>
          {selectedOption
            ? renderValue
              ? renderValue(selectedOption.value)
              : selectedOption.label
            : placeholder}
        </Select.Value>

        <Select.Icon>
          <KeyboardArrowUpIcon className="h-4 w-4 rotate-180 text-gray-500" />
        </Select.Icon>
      </Select.Trigger>

      {/* PORTAL */}
      <Select.Portal>
        <Select.Content
          position="popper"
          align="start"
          sideOffset={4}
          className="z-50 min-w-(--radix-select-trigger-width) rounded-md border border-gray-300 bg-white shadow-md"
        >
          <Select.Viewport className="max-h-60 overflow-y-auto p-1">
            {options.map((option) => (
              <Select.Item
                key={option.label}
                value={option.label}
                className="relative flex cursor-pointer items-center rounded px-8 py-2 text-sm outline-none select-none hover:bg-gray-100 data-[state=checked]:bg-gray-100"
              >
                <Select.ItemText className="truncate">
                  {option.label}
                </Select.ItemText>

                <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
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
