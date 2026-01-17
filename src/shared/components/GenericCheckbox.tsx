import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "../../assets/icons";
import { customTwMerge } from "../utils/Tailwind.util";

const GenericCheckbox = ({
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  className = "",
}: {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}) => {
  return (
    <CheckboxPrimitive.Root
      checked={checked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      onCheckedChange={(checkedState) => onCheckedChange?.(!!checkedState)}
      className={customTwMerge(
        "bg-surface-primary border-gray-6 flex h-4 w-4 items-center justify-center rounded-sm border transition",
        "focus-visible:ring-orange/40 focus-visible:ring-2 focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:bg-orange data-[state=checked]:border-orange",
        className,
      )}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center">
        <CheckIcon className="fill-surface-primary h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
};

export default GenericCheckbox;
