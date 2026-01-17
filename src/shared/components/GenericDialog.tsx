import * as Dialog from "@radix-ui/react-dialog";
import type { ReactNode } from "react";
import { CloseIcon } from "../../assets/icons";
import { customTwMerge } from "../utils/Tailwind.util";

export const GenericDialogTitle = ({ children }: { children: ReactNode }) => {
  return (
    <Dialog.Title className="text-s18-l28 text-text-primary font-semibold">
      {children}
    </Dialog.Title>
  );
};

export const GenericDialogClose = ({ children }: { children: ReactNode }) => {
  return <Dialog.Close asChild>{children}</Dialog.Close>;
};

export const GenericDialog = ({
  open,
  onOpenChange,
  children,
  className,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />

        <Dialog.Content
          className={customTwMerge(
            "bg-surface-primary fixed top-1/2 left-1/2 z-50 max-h-[90vh] w-full max-w-md -translate-x-1/2 -translate-y-1/2 overflow-x-hidden overflow-y-auto rounded-xl p-6 shadow-xl",
            className,
          )}
        >
          <Dialog.Close asChild className="z-50">
            <button
              type="button"
              aria-label="Close"
              className="hover:bg-gray-4 text-gray-7 hover:text-gray-9 absolute top-4 right-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md"
            >
              <CloseIcon className="fill-text-primary" />
            </button>
          </Dialog.Close>

          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
