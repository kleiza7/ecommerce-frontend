import * as Popover from "@radix-ui/react-popover";
import type { ReactNode } from "react";

export const GenericPopoverClose = Popover.Close;

export const GenericPopover = ({
  trigger,
  children,
  side = "bottom",
  align = "center",
  sideOffset = 8,
  className = "",
}: {
  trigger: ReactNode;
  children: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  className?: string;
}) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          side={side}
          align={align}
          sideOffset={sideOffset}
          className={`data-[state=open]:animate-popover-in data-[state=closed]:animate-popover-out data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 z-50 rounded-xl bg-white p-4 shadow-lg outline-none ${className} `}
        >
          {children}
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
