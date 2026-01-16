import * as Dialog from "@radix-ui/react-dialog";
import type { ReactNode } from "react";
import { CloseIcon } from "../../assets/icons";

export const GenericDialogTitle = ({ children }: { children: ReactNode }) => {
  return (
    <Dialog.Title className="text-lg font-semibold text-gray-900">
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
          className={`bg-surface-primary fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-xl p-6 shadow-xl ${
            className ?? "w-full max-w-md"
          }`}
        >
          <Dialog.Close asChild>
            <button
              type="button"
              aria-label="Close"
              className="absolute top-4 right-4 h-8 w-8 rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
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
