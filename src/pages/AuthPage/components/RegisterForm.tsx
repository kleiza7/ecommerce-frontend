import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthRegisterUser } from "../../../hooks/useAuthRegisterUser";
import GenericFormInput from "../../../shared/components/GenericFormInput";
import InputErrorLabel from "../../../shared/components/InputErrorLabel";
import InputLabel from "../../../shared/components/InputLabel";
import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
} from "../../../shared/constants/Form.constants";
import { AUTH_PAGE_MODE } from "../../../shared/enums/AuthPageMode.enum";

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
};

const RegisterForm = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<RegisterFormValues>({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutate: registerUser, isPending } = useAuthRegisterUser(() => {
    navigate(`/auth?mode=${AUTH_PAGE_MODE.LOGIN}`);
  });

  const onSubmit: SubmitHandler<RegisterFormValues> = (values) => {
    registerUser(values);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex flex-col gap-y-5"
    >
      {isPending && (
        <div className="absolute inset-0 z-20 flex items-center justify-center rounded-lg bg-white/70">
          <div className="border-t-orange h-12 w-12 animate-spin rounded-full border-4 border-gray-300" />
        </div>
      )}

      <div className="flex flex-col gap-y-5">
        <div className="relative flex flex-col">
          <InputLabel label="Name" hasAsterisk />

          <GenericFormInput
            field="name"
            control={control}
            required
            disabled={isPending}
            placeholder="Mahfuzul Nabil"
          />

          <InputErrorLabel message={errors.name?.message} />
        </div>

        <div className="relative flex flex-col">
          <InputLabel label="Email" hasAsterisk />

          <GenericFormInput
            field="email"
            control={control}
            required
            type="email"
            disabled={isPending}
            placeholder="example@gmail.com"
            rules={{
              pattern: {
                value: EMAIL_REGEX,
                message: "Please enter a valid email address!",
              },
            }}
          />

          <InputErrorLabel message={errors.email?.message} />
        </div>

        <div className="relative flex flex-col">
          <InputLabel label="Password" hasAsterisk />

          <GenericFormInput
            field="password"
            control={control}
            required
            disabled={isPending}
            type="password"
            placeholder="••••••••"
            rules={{
              pattern: {
                value: PASSWORD_REGEX,
                message:
                  "Password must be at least 8 characters, with uppercase, lowercase, and a number.",
              },
            }}
          />

          <InputErrorLabel message={errors.password?.message} />
        </div>
      </div>

      <button
        type="submit"
        disabled={!isValid || isPending}
        className={`text-s16-l16 h-12 rounded-lg font-semibold text-white ${
          !isValid || isPending
            ? "bg-orange/40 cursor-not-allowed"
            : "bg-orange hover:bg-orange/90"
        }`}
      >
        Üye Ol
      </button>
    </form>
  );
};

export default RegisterForm;
