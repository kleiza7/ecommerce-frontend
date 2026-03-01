import { type ReactNode } from "react";

const FilterSection = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="border-border-primary flex flex-col border-b pb-3">
      <div className="flex h-8 items-center">
        <span className="text-s14-l20 text-text-primary pl-3 font-semibold">
          {title}
        </span>
      </div>

      <div className="overflow-hidden">{children}</div>
    </div>
  );
};

export default FilterSection;
