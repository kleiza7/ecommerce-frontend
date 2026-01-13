import { useState, type ReactNode } from "react";
import { KeyboardArrowUpIcon } from "../../../../../assets/icons";
import { customTwMerge } from "../../../../../shared/utils/Tailwind.util";

const FilterSection = ({
  title,
  children,
  defaultOpen = false,
  className,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={customTwMerge("border-b border-gray-200", className)}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-10 w-full cursor-pointer items-center justify-between px-[5px] py-3 text-left transition-colors hover:bg-gray-100"
      >
        <span className="text-s14-l20 leading-none font-semibold text-gray-800">
          {title}
        </span>

        <KeyboardArrowUpIcon
          className={customTwMerge(
            "text-gray-500 transition-transform duration-300",
            isOpen ? "rotate-180" : "rotate-0",
          )}
        />
      </button>

      <div
        className={customTwMerge(
          "grid transition-all duration-300 ease-in-out",
          isOpen
            ? "grid-rows-[1fr] pb-3 opacity-100"
            : "grid-rows-[0fr] pb-0 opacity-0",
        )}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
};

export default FilterSection;
