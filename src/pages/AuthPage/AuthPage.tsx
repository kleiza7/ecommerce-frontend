import { useNavigate, useSearchParams } from "react-router-dom";
import { AUTH_PAGE_MODE } from "../../shared/enums/AuthPageMode.enum";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const mode =
    searchParams.get("mode") === AUTH_PAGE_MODE.REGISTER
      ? AUTH_PAGE_MODE.REGISTER
      : AUTH_PAGE_MODE.LOGIN;

  const goToAuthPage = (mode: AUTH_PAGE_MODE) => {
    navigate(`/auth?mode=${mode}`);
  };

  return (
    <div className="bg-gray-1 flex min-h-screen flex-col items-center py-5">
      <div className="mb-6 text-center">
        <p className="text-s22-l28 text-text-primary">Hi,</p>
        <p className="text-s14-l20 text-text-primary mt-1">
          Log In or Register
        </p>
      </div>
      <div className="border-gray-2 flex w-[600px] flex-col gap-y-6 rounded-[3px] border bg-white px-10 py-6">
        <div className="bg-gray-2 flex rounded-lg p-1">
          <button
            type="button"
            onClick={() => goToAuthPage(AUTH_PAGE_MODE.LOGIN)}
            className={`text-s14-l20 h-9 flex-1 rounded-md transition-colors ${
              mode === AUTH_PAGE_MODE.LOGIN
                ? "text-orange bg-white shadow"
                : "text-text-primary"
            }`}
          >
            Log In
          </button>

          <button
            type="button"
            onClick={() => goToAuthPage(AUTH_PAGE_MODE.REGISTER)}
            className={`text-s14-l20 h-9 flex-1 rounded-md transition-colors ${
              mode === AUTH_PAGE_MODE.REGISTER
                ? "text-orange bg-white shadow"
                : "text-text-primary"
            }`}
          >
            Register
          </button>
        </div>

        {mode === AUTH_PAGE_MODE.LOGIN ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
};

export default AuthPage;
