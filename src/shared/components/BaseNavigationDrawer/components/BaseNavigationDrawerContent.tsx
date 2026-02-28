import { NavLink } from "react-router-dom";
import { KeyboardArrowUpIcon } from "../../../../assets/icons";
import type { Route } from "../../../models/Route.model";
import { customTwMerge } from "../../../utils/Tailwind.util";

const BaseNavigationDrawerContent = ({
  routes,
  close,
}: {
  routes: Route[];
  close: () => void;
}) => {
  return (
    <div className="bg-surface-primary flex h-full flex-col">
      <div className="border-border-primary flex items-center justify-between gap-3 border-b px-4 py-3">
        <button
          type="button"
          onClick={close}
          className="flex items-center justify-center"
        >
          <KeyboardArrowUpIcon className="fill-primary h-8 w-8 -rotate-90" />
        </button>

        <span className="text-s16-l24 text-text-primary font-medium">Menu</span>

        <div />
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto">
        {routes.map((route) => (
          <NavLink
            key={route.path}
            to={route.path}
            onClick={close}
            className={({ isActive }) =>
              customTwMerge(
                "border-border-primary text-text-primary flex w-full items-center border-b p-4 text-left transition-colors",
                "hover:bg-primary/10 hover:text-primary",
                isActive && "bg-primary/10 text-primary",
              )
            }
          >
            <span className="text-s14-l20">{route.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default BaseNavigationDrawerContent;
