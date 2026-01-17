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
    <div className={customTwMerge("border-gray-5 border-b", className)}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="hover:bg-gray-4 flex h-10 w-full cursor-pointer items-center justify-between px-[5px] py-3 text-left transition-colors"
      >
        <span className="text-s14-l20 text-gray-10 leading-none font-semibold">
          {title}
        </span>

        <KeyboardArrowUpIcon
          className={customTwMerge(
            "text-gray-8 transition-transform duration-300",
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
