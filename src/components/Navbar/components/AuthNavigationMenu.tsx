import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserFilledIcon, UserIcon } from "../../../assets/icons";
import GenericNavigationMenu from "../../../shared/components/GenericNavigationMenu";
import { AUTH_PAGE_MODE } from "../../../shared/enums/AuthPageMode.enum";

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
      className="border-orange border"
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
            className={`text-s14-l20 font-semibold transition-colors duration-200 ${
              open ? "text-orange" : "text-text-primary group-hover:text-orange"
            }`}
          >
            Log In
          </span>
        </button>
      }
    >
      <div className="flex min-w-40 flex-col gap-y-2">
        <button
          type="button"
          onClick={() => goToAuthPage(AUTH_PAGE_MODE.LOGIN)}
          className="bg-orange text-s14-l20 hover:bg-orange/90 h-9 w-full rounded-lg font-semibold text-white transition-colors"
        >
          Log In
        </button>

        <button
          type="button"
          onClick={() => goToAuthPage(AUTH_PAGE_MODE.REGISTER)}
          className="border-orange text-s14-l20 text-orange hover:bg-orange/10 h-9 w-full rounded-lg border font-semibold transition-colors"
        >
          Register
        </button>
      </div>
    </GenericNavigationMenu>
  );
};

export default AuthNavigationMenu;
