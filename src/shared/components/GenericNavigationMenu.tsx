import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import type { ReactNode } from "react";

type GenericNavigationMenuProps = {
  trigger: ReactNode;
  content: ReactNode;
};

const GenericNavigationMenu = ({
  trigger,
  content,
}: GenericNavigationMenuProps) => {
  return (
    <NavigationMenu.Root className="relative z-50">
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="flex h-14 items-center px-3 text-sm font-semibold text-gray-900">
            {trigger}
          </NavigationMenu.Trigger>

          <NavigationMenu.Content className="absolute top-full left-0 mt-2 rounded-xl bg-white p-6 shadow-lg">
            {content}
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export default GenericNavigationMenu;
