import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import type { ReactNode } from "react";
import { customTwMerge } from "../utils/Tailwind.util";

const GenericNavigationMenu = ({
  trigger,
  children,
  open,
  setOpen,
  className,
  withOverlay = true,
  contentAlign = "left",
  contentOffsetY = 8, // px
}: {
  trigger: ReactNode;
  children: ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  className?: string;
  withOverlay?: boolean;
  contentAlign?: "left" | "center" | "right";
  contentOffsetY?: number; // px
}) => {
  const alignClass =
    contentAlign === "center"
      ? "left-1/2 -translate-x-1/2"
      : contentAlign === "right"
        ? "right-0"
        : "left-0";

  return (
    <NavigationMenu.Root
      value={open ? "main" : ""}
      onValueChange={(value) => setOpen(value === "main")}
      className="relative z-50"
    >
      {withOverlay && (
        <div
          className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
            open ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        />
      )}

      <NavigationMenu.List>
        <NavigationMenu.Item value="main">
          <NavigationMenu.Trigger
            className="text-s14-l20 relative z-50 flex items-center font-semibold text-gray-900"
            asChild
          >
            {trigger}
          </NavigationMenu.Trigger>

          <NavigationMenu.Content
            style={{ marginTop: contentOffsetY }} // ✅ dynamic offset
            className={customTwMerge(
              "bg-surface-primary absolute top-full z-50 rounded-xl p-4 shadow-lg",
              alignClass,
              className,
            )}
          >
            {children}
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export default GenericNavigationMenu;
