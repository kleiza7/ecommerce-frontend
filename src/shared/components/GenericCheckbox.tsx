import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "../../assets/icons";
import { customTwMerge } from "../utils/Tailwind.util";

export type GenericCheckboxProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
};

const GenericCheckbox = ({
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  className = "",
}: GenericCheckboxProps) => {
  return (
    <CheckboxPrimitive.Root
      checked={checked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      onCheckedChange={(checkedState) => onCheckedChange?.(!!checkedState)}
      className={customTwMerge(
        "flex h-4 w-4 items-center justify-center rounded-sm border border-gray-300 bg-white transition",
        "focus-visible:ring-2 focus-visible:ring-orange-500/40 focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:border-orange-500 data-[state=checked]:bg-orange-500",
        className,
      )}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center">
        <CheckIcon className="h-4 w-4 fill-white" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
};

export default GenericCheckbox;
