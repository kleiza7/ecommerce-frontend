import { useState } from "react";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import {
  LockIcon,
  MailIcon,
  VisibilityIcon,
  VisibilityOffIcon,
} from "../../../assets/icons";
import { useAuthRegisterSeller } from "../../../hooks/useAuthRegisterSeller";
import { useAuthRegisterUser } from "../../../hooks/useAuthRegisterUser";
import GenericCheckbox from "../../../shared/components/GenericCheckbox";
import GenericFormInput from "../../../shared/components/GenericFormInput";
import InputErrorLabel from "../../../shared/components/InputErrorLabel";
import InputLabel from "../../../shared/components/InputLabel";
import LoadingSpinner from "../../../shared/components/LoadingSpinner";
import {
  BUTTON_PRIMARY,
  BUTTON_SIZE_X_LARGE,
} from "../../../shared/constants/CommonTailwindClasses.constants";
import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
} from "../../../shared/constants/Regex.constants";
import { AUTH_PAGE_MODE } from "../../../shared/enums/AuthPageMode.enum";
import { customTwMerge } from "../../../shared/utils/Tailwind.util";

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterForm = ({
  changeMode,
}: {
  changeMode: (nextMode: AUTH_PAGE_MODE) => void;
}) => {
  const [isSeller, setIsSeller] = useState(false);

  const { mutate: registerUser, isPending: isUserPending } =
    useAuthRegisterUser();

  const { mutate: registerSeller, isPending: isSellerPending } =
    useAuthRegisterSeller();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = useWatch({
    control,
    name: "password",
  });

  const onSubmit: SubmitHandler<RegisterFormValues> = (values) => {
    const mutate = isSeller ? registerSeller : registerUser;

    mutate(
      {
        name: values.name,
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: () => {
          changeMode(AUTH_PAGE_MODE.LOGIN);
        },
      },
    );
  };

  const isPending = isUserPending || isSellerPending;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex w-full flex-col gap-y-6 p-6 md:w-xl 2xl:gap-y-10 2xl:p-10"
    >
      {isPending && (
        <div className="bg-surface-primary/70 absolute inset-0 z-20 flex items-center justify-center rounded-lg">
          <LoadingSpinner size={48} borderWidth={4} />
        </div>
      )}

      <div className="flex flex-col items-center gap-y-2">
        <span className="text-s32-l40 text-text-primary font-bold">
          Create Your Account
        </span>
        <span className="text-s16-l24 text-text-muted">
          Please enter your details to register
        </span>
      </div>

      <div className="flex flex-col gap-y-5">
        <div className="relative flex flex-col gap-y-1">
          <InputLabel label="Name" hasAsterisk />

          <GenericFormInput
            field="name"
            control={control}
            required
            placeholder="e.g. John Doe"
            hasError={!!errors.name}
            disabled={isPending}
          />

          <InputErrorLabel message={errors.name?.message} />
        </div>

        <div className="relative flex flex-col gap-y-1">
          <InputLabel label="Email" hasAsterisk />

          <MailIcon className="fill-text-disabled absolute bottom-2.5 left-3 h-5 w-5" />

          <GenericFormInput
            field="email"
            control={control}
            required
            type="email"
            placeholder="example@gmail.com"
            rules={{
              pattern: {
                value: EMAIL_REGEX,
                message: "Please enter a valid email address!",
              },
            }}
            hasError={!!errors.email}
            disabled={isPending}
            className="pl-10"
          />

          <InputErrorLabel message={errors.email?.message} />
        </div>

        <div className="flex flex-col gap-8 md:flex-row md:gap-6">
          <div className="relative flex flex-1 flex-col gap-y-1">
            <InputLabel label="Password" hasAsterisk />

            <LockIcon className="fill-text-disabled absolute bottom-2.5 left-3 h-5 w-5" />

            <GenericFormInput
              field="password"
              control={control}
              required
              type={isPasswordVisible ? "text" : "password"}
              placeholder="••••••••"
              rules={{
                pattern: {
                  value: PASSWORD_REGEX,
                  message:
                    "Password must be at least 8 characters, with uppercase, lowercase, and a number.",
                },
              }}
              hasError={!!errors.password}
              disabled={isPending}
              className="px-10"
            />

            <button
              type="button"
              onClick={() => setIsPasswordVisible((prev) => !prev)}
              className="absolute right-3 bottom-2 flex cursor-pointer items-center justify-center"
              tabIndex={-1}
            >
              {isPasswordVisible ? (
                <VisibilityOffIcon className="fill-text-disabled" />
              ) : (
                <VisibilityIcon className="fill-text-disabled" />
              )}
            </button>

            <InputErrorLabel
              message={errors.password?.message}
              className="top-16"
            />
          </div>

          <div className="relative flex flex-1 flex-col gap-y-1">
            <InputLabel label="Confirm Password" hasAsterisk />

            <LockIcon className="fill-text-disabled absolute bottom-2.5 left-3 h-5 w-5" />

            <GenericFormInput
              field="confirmPassword"
              control={control}
              required
              type={isPasswordVisible ? "text" : "password"}
              placeholder="••••••••"
              rules={{
                validate: (value) =>
                  !passwordValue ||
                  value === passwordValue ||
                  "Passwords do not match",
              }}
              hasError={!!errors.confirmPassword}
              disabled={isPending}
              className="px-10"
            />

            <button
              type="button"
              onClick={() => setIsPasswordVisible((prev) => !prev)}
              className="absolute right-3 bottom-2 flex cursor-pointer items-center justify-center"
              tabIndex={-1}
            >
              {isPasswordVisible ? (
                <VisibilityOffIcon className="fill-text-disabled" />
              ) : (
                <VisibilityIcon className="fill-text-disabled" />
              )}
            </button>

            <InputErrorLabel
              message={errors.confirmPassword?.message}
              className="top-16"
            />
          </div>
        </div>

        <label className="mt-6 flex cursor-pointer items-center gap-3">
          <GenericCheckbox
            checked={isSeller}
            onCheckedChange={() => setIsSeller((prev) => !prev)}
          />
          <span className="text-s14-l20 select-none">
            I want to register as a seller.
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className={customTwMerge(BUTTON_PRIMARY, BUTTON_SIZE_X_LARGE, "h-14")}
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
