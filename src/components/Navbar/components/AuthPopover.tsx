import { useNavigate } from "react-router-dom";
import { UserIcon } from "../../../assets/icons";
import {
  GenericPopover,
  GenericPopoverClose,
} from "../../../shared/components/GenericPopover";
import { AUTH_PAGE_MODE } from "../../../shared/enums/AuthPageMode.enum";

const AuthPopover = () => {
  const navigate = useNavigate();

  const goToAuthPage = (mode: AUTH_PAGE_MODE) => {
    navigate(`/auth?mode=${mode}`);
  };

  return (
    <GenericPopover
      align="end"
      side="bottom"
      className="border-orange border"
      trigger={
        <button
          type="button"
          className="group text-text-primary flex cursor-pointer items-center gap-x-2 transition-colors duration-200"
        >
          <UserIcon className="fill-text-primary group-hover:fill-orange h-5 w-5 transition-colors duration-200" />

          <span className="text-s14-l14 group-hover:text-orange font-semibold transition-colors duration-200">
            Log In
          </span>
        </button>
      }
    >
      <div className="flex min-w-40 flex-col gap-y-2">
        <GenericPopoverClose asChild>
          <button
            type="button"
            onClick={() => goToAuthPage(AUTH_PAGE_MODE.LOGIN)}
            className="bg-orange text-s14-l14 hover:bg-orange/90 h-9 w-full rounded-lg font-semibold text-white transition-colors"
          >
            Log In
          </button>
        </GenericPopoverClose>
        <GenericPopoverClose asChild>
          <button
            type="button"
            onClick={() => goToAuthPage(AUTH_PAGE_MODE.REGISTER)}
            className="border-orange text-orange text-s14-l14 hover:bg-orange/10 h-9 w-full rounded-lg border font-semibold transition-colors"
          >
            Register
          </button>
        </GenericPopoverClose>
      </div>
    </GenericPopover>
  );
};

export default AuthPopover;
