import * as Toast from "@radix-ui/react-toast";
import { useEffect, useState, type ReactNode } from "react";
import { EVENT_TYPE } from "../shared/enums/EventType.enum";
import { TOAST_TYPE } from "../shared/enums/ToastType.enum";
import type { ToastEventDetail } from "../shared/models/ToastEventDetail.model";
import { customTwMerge } from "../shared/utils/Tailwind.util";

type ToastItem = {
  id: string;
} & ToastEventDetail;

const DEFAULT_TITLES = {
  [TOAST_TYPE.SUCCESS]: "Success",
  [TOAST_TYPE.ERROR]: "Something went wrong",
  [TOAST_TYPE.INFO]: "Information",
};

const BG_CLASSES = {
  [TOAST_TYPE.SUCCESS]: "bg-emerald-1 text-emerald-2",
  [TOAST_TYPE.ERROR]: "bg-red-2 text-red-3",
  [TOAST_TYPE.INFO]: "bg-blue-1 text-blue-2",
};

const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const handler = (e: CustomEvent) => {
      const id = crypto.randomUUID();

      setToasts((prev) => [
        ...prev,
        {
          id,
          ...e.detail,
        },
      ]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, 5000);
    };

    window.addEventListener(EVENT_TYPE.SHOW_TOAST, handler as EventListener);

    return () => {
      window.removeEventListener(
        EVENT_TYPE.SHOW_TOAST,
        handler as EventListener,
      );
    };
  }, []);

  return (
    <Toast.Provider swipeDirection="right">
      {children}

      {toasts.map((toast) => {
        const bgClass = BG_CLASSES[toast.type];
        const autoTitle = DEFAULT_TITLES[toast.type];

        return (
          <Toast.Root
            key={toast.id}
            defaultOpen={true}
            duration={5000}
            className={customTwMerge("rounded-sm px-4 py-3 shadow-md", bgClass)}
          >
            <Toast.Title className="font-semibold">
              {toast.title || autoTitle}
            </Toast.Title>

            {toast.description && (
              <Toast.Description className="text-s14-l20 mt-1 opacity-90">
                {toast.description}
              </Toast.Description>
            )}
          </Toast.Root>
        );
      })}

      <Toast.Viewport className="fixed right-5 bottom-5 flex w-[300px] flex-col gap-3" />
    </Toast.Provider>
  );
};

export default ToastProvider;
