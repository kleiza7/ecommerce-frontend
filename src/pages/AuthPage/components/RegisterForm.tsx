import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAuthRegisterSeller } from "../../../hooks/useAuthRegisterSeller";
import { useAuthRegisterUser } from "../../../hooks/useAuthRegisterUser";
import GenericCheckbox from "../../../shared/components/GenericCheckbox";
import GenericFormInput from "../../../shared/components/GenericFormInput";
import InputErrorLabel from "../../../shared/components/InputErrorLabel";
import InputLabel from "../../../shared/components/InputLabel";
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

  const onSubmit: SubmitHandler<RegisterFormValues> = (values) => {
    const mutate = isSeller ? registerSeller : registerUser;

    mutate(values, {
      onSuccess: () => {
        changeMode(AUTH_PAGE_MODE.LOGIN);
      },
    });
  };

  const isPending = isUserPending || isSellerPending;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex flex-col gap-y-5"
    >
      {/* TODO: loading spiiner */}
      {isPending && (
        <div className="bg-surface-primary/70 absolute inset-0 z-20 flex items-center justify-center rounded-lg">
          <div className="border-t-orange border-gray-6 h-12 w-12 animate-spin rounded-full border-4" />
        </div>
      )}

      <div className="flex flex-col gap-y-5">
        <div className="relative flex flex-col">
          <InputLabel label="Name" hasAsterisk />

          <GenericFormInput
            field="name"
            control={control}
            required
            placeholder="Mahfuzul Nabil"
            hasError={!!errors.name}
            disabled={isPending}
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
            placeholder="example@gmail.com"
            rules={{
              pattern: {
                value: EMAIL_REGEX,
                message: "Please enter a valid email address!",
              },
            }}
            hasError={!!errors.email}
            disabled={isPending}
          />

          <InputErrorLabel message={errors.email?.message} />
        </div>

        <div className="relative flex flex-col pb-4 md:pb-0">
          <InputLabel label="Password" hasAsterisk />

          <GenericFormInput
            field="password"
            control={control}
            required
            type="password"
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
          />

          <InputErrorLabel
            message={errors.password?.message}
            className="top-[60px] md:top-auto"
          />
        </div>

        <label className="flex cursor-pointer items-center gap-3">
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
        disabled={!isValid || isPending}
        className={customTwMerge(BUTTON_PRIMARY, BUTTON_SIZE_X_LARGE)}
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
