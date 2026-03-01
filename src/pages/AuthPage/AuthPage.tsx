import { useSearchParams } from "react-router-dom";
import { AUTH_PAGE_MODE } from "../../shared/enums/AuthPageMode.enum";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

const AuthPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const mode =
    searchParams.get("mode") === AUTH_PAGE_MODE.REGISTER
      ? AUTH_PAGE_MODE.REGISTER
      : AUTH_PAGE_MODE.LOGIN;

  const changeMode = (nextMode: AUTH_PAGE_MODE) => {
    setSearchParams({ mode: nextMode });
  };

  return (
    <div className="mx-auto flex w-full max-w-[1480px] flex-col items-center justify-center">
      <div className="border-border-primary bg-surface-primary flex w-full flex-col overflow-hidden md:w-auto md:rounded-xl md:border md:shadow-lg">
        {mode === AUTH_PAGE_MODE.LOGIN ? (
          <LoginForm />
        ) : (
          <RegisterForm changeMode={changeMode} />
        )}

        <div className="bg-surface-primary md:bg-surface-muted border-border-secondary px-10 py-6 md:border-t">
          {mode === AUTH_PAGE_MODE.LOGIN ? (
            <div className="group flex items-center justify-center gap-x-1">
              <span className="text-s14-l20 text-text-secondary">
                Don't have an account?
              </span>
              <button
                className="cursor-pointer"
                onClick={() => changeMode(AUTH_PAGE_MODE.REGISTER)}
              >
                <span className="text-s14-l20 text-primary font-medium group-hover:underline">
                  Register
                </span>
              </button>
            </div>
          ) : (
            <div className="group flex items-center justify-center gap-x-1">
              <span className="text-s14-l20 text-text-secondary">
                Already have an account?
              </span>
              <button
                className="cursor-pointer"
                onClick={() => changeMode(AUTH_PAGE_MODE.LOGIN)}
              >
                <span className="text-s14-l20 text-primary font-medium group-hover:underline">
                  Log In
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
