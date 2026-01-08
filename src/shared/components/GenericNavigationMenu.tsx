import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import type { ReactNode } from "react";
import { useState } from "react";

const GenericNavigationMenu = ({
  trigger,
  content,
}: {
  trigger: ReactNode;
  content: ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <NavigationMenu.Root
      className="relative z-50"
      onValueChange={(value) => setOpen(Boolean(value))}
    >
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${open ? "opacity-100" : "pointer-events-none opacity-0"} `}
      />

      <NavigationMenu.List>
        <NavigationMenu.Item value="main">
          <NavigationMenu.Trigger className="text-s14-l20 relative z-50 flex h-14 items-center font-semibold text-gray-900">
            {trigger}
          </NavigationMenu.Trigger>

          <NavigationMenu.Content className="absolute top-full left-0 z-50 mt-2 rounded-xl bg-white p-6 shadow-lg">
            {content}
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export default GenericNavigationMenu;
