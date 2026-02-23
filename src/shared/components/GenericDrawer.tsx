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
  showOverlay = true,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side?: DrawerSide;
  children: ReactNode;
  className?: string;
  showCloseButton?: boolean;
  showOverlay?: boolean;
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {showOverlay && (
          <Dialog.Overlay
            className={customTwMerge(
              "fixed inset-0 z-40 bg-black/30",
              "data-[state=open]:animate-drawer-overlay-show",
              "data-[state=closed]:animate-drawer-overlay-hide",
            )}
          />
        )}

        <Dialog.Content
          className={customTwMerge(
            "bg-surface-primary fixed z-50 overflow-y-auto shadow-[0_10px_30px_rgba(0,0,0,0.15)]",
            side === "left" &&
              "data-[state=open]:animate-drawer-in-left data-[state=closed]:animate-drawer-out-left top-0 left-0 h-full w-full max-w-full",
            side === "right" &&
              "data-[state=open]:animate-drawer-in-right data-[state=closed]:animate-drawer-out-right top-0 right-0 h-full w-full max-w-full",
            side === "bottom" &&
              "data-[state=open]:animate-drawer-in-bottom data-[state=closed]:animate-drawer-out-bottom bottom-0 left-0 max-h-svh w-full",
            side === "top" &&
              "data-[state=open]:animate-drawer-in-top data-[state=closed]:animate-drawer-out-top top-0 left-0 max-h-svh w-full",
            className,
          )}
        >
          {showCloseButton && (
            <Dialog.Close asChild className="z-50">
              <button
                type="button"
                aria-label="Close"
                className="hover:bg-surface-secondary absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-md"
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
