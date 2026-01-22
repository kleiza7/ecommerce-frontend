import * as Dialog from "@radix-ui/react-dialog";
import type { ReactNode } from "react";
import { CloseIcon } from "../../assets/icons";
import { customTwMerge } from "../utils/Tailwind.util";

type DrawerSide = "left" | "right" | "bottom" | "top";

export const GenericDrawer = ({
  open,
  onOpenChange,
  side = "left",
  children,
  className,
  showCloseButton = true,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side?: DrawerSide;
  children: ReactNode;
  className?: string;
  showCloseButton?: boolean;
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="drawer-overlay" />

        <Dialog.Content
          className={customTwMerge(
            "drawer-content",
            side === "left" && "drawer-left",
            side === "right" && "drawer-right",
            side === "bottom" && "drawer-bottom",
            side === "top" && "drawer-top",
            className,
          )}
        >
          {showCloseButton && (
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close"
                className="hover:bg-gray-4 absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-md"
              >
                <CloseIcon className="fill-text-primary" />
              </button>
            </Dialog.Close>
          )}

          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
