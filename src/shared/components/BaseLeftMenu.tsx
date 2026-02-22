import { NavLink } from "react-router-dom";
import type { Route } from "../models/Route.model";

const BaseLeftMenu = ({ routes }: { routes: Route[] }) => {
  return (
    <aside className="hidden w-56 shrink-0 lg:block">
      <nav className="flex flex-col gap-y-2">
        {routes.map((route) => (
          <NavLink
            key={route.path}
            to={route.path}
            className={({ isActive }) =>
              [
                "flex h-12 items-center rounded-md px-4 transition-colors",
                "hover:bg-primary/10 hover:text-primary",
                isActive ? "bg-primary/10 text-primary" : "text-text-secondary",
              ].join(" ")
            }
          >
            {route.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default BaseLeftMenu;
