import { useState } from "react";
import { MenuIcon } from "../../../../assets/icons";
import GenericNavigationMenu from "../../../../shared/components/GenericNavigationMenu";
import CategoriesMegaMenuContent from "./components/CategoriesMegaMenuContent";

const CategoriesMegaMenu = () => {
  const [isNavigationMenuOpen, setIsNavigationMenuOpen] = useState(false);

  const close = () => {
    setIsNavigationMenuOpen(false);
  };

  return (
    <GenericNavigationMenu
      open={isNavigationMenuOpen}
      setOpen={setIsNavigationMenuOpen}
      trigger={
        <span className="flex shrink-0 items-center gap-2 font-semibold">
          <MenuIcon className="fill-text-primary" />
          All Categories
        </span>
      }
    >
      <CategoriesMegaMenuContent close={close} />
    </GenericNavigationMenu>
  );
};

export default CategoriesMegaMenu;
