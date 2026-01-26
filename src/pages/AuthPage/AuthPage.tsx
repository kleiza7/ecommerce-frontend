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
    <div className="mx-auto flex w-full max-w-[1480px] flex-col items-center gap-2 py-3 md:gap-6 md:px-10 md:py-9">
      <div className="flex flex-col gap-1 text-center">
        <p className="text-s22-l28 text-text-primary">Hi,</p>
        <p className="text-s14-l20 text-text-primary">Log In or Register</p>
      </div>

      <div className="border-gray-2 bg-surface-primary flex w-full flex-col gap-6 px-5 py-2 md:w-[600px] md:rounded-lg md:border md:px-10 md:py-6">
        <div className="bg-gray-2 flex rounded-lg p-1">
          <button
            type="button"
            onClick={() => changeMode(AUTH_PAGE_MODE.LOGIN)}
            className={`text-s14-l20 h-9 flex-1 cursor-pointer rounded-md transition-colors ${
              mode === AUTH_PAGE_MODE.LOGIN
                ? "text-orange bg-surface-primary shadow"
                : "text-text-primary"
            }`}
          >
            Log In
          </button>

          <button
            type="button"
            onClick={() => changeMode(AUTH_PAGE_MODE.REGISTER)}
            className={`text-s14-l20 h-9 flex-1 cursor-pointer rounded-md transition-colors ${
              mode === AUTH_PAGE_MODE.REGISTER
                ? "text-orange bg-surface-primary shadow"
                : "text-text-primary"
            }`}
          >
            Register
          </button>
        </div>

        {mode === AUTH_PAGE_MODE.LOGIN ? (
          <LoginForm />
        ) : (
          <RegisterForm changeMode={changeMode} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
