import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserFilledIcon, UserIcon } from "../../../assets/icons";
import GenericNavigationMenu from "../../../shared/components/GenericNavigationMenu";
import {
  BUTTON_PRIMARY,
  BUTTON_PRIMARY_OUTLINED,
} from "../../../shared/constants/CommonTailwindClasses.constants";
import { AUTH_PAGE_MODE } from "../../../shared/enums/AuthPageMode.enum";
import { customTwMerge } from "../../../shared/utils/Tailwind.util";

const AuthNavigationMenu = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const goToAuthPage = useCallback(
    (mode: AUTH_PAGE_MODE) => {
      setOpen(false);
      navigate(`/auth?mode=${mode}`);
    },
    [navigate],
  );

  return (
    <GenericNavigationMenu
      open={open}
      setOpen={setOpen}
      withOverlay={false}
      contentAlign="center"
      className="border-orange w-[182px] overflow-hidden border"
      trigger={
        <button
          type="button"
          className="group flex items-center gap-x-2 transition-colors duration-200"
        >
          {open ? (
            <UserFilledIcon className="fill-orange h-6 w-6 transition-colors duration-200" />
          ) : (
            <>
              <UserIcon className="fill-text-primary h-6 w-6 transition-colors duration-200 group-hover:hidden" />
              <UserFilledIcon className="fill-orange hidden h-6 w-6 transition-colors duration-200 group-hover:block" />
            </>
          )}

          <span
            className={`text-s14-l20 hidden font-semibold transition-colors duration-200 xl:inline ${
              open ? "text-orange" : "text-text-primary group-hover:text-orange"
            }`}
          >
            Log In
          </span>
        </button>
      }
    >
      <div className="flex flex-col gap-y-2">
        <button
          type="button"
          onClick={() => goToAuthPage(AUTH_PAGE_MODE.LOGIN)}
          className={customTwMerge(BUTTON_PRIMARY, "h-[34px] w-full")}
        >
          Log In
        </button>

        <button
          type="button"
          onClick={() => goToAuthPage(AUTH_PAGE_MODE.REGISTER)}
          className={customTwMerge(BUTTON_PRIMARY_OUTLINED, "h-[34px] w-full")}
        >
          Register
        </button>
      </div>
    </GenericNavigationMenu>
  );
};

export default AuthNavigationMenu;
