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
} from "../../../shared/constants/Form.constants";
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

  const onSuccess = () => {
    changeMode(AUTH_PAGE_MODE.LOGIN);
  };

  const { mutate: registerUser, isPending: isUserPending } =
    useAuthRegisterUser(onSuccess);

  const { mutate: registerSeller, isPending: isSellerPending } =
    useAuthRegisterSeller(onSuccess);

  const isPending = isUserPending || isSellerPending;

  const onSubmit: SubmitHandler<RegisterFormValues> = (values) => {
    if (isSeller) {
      registerSeller(values);
    } else {
      registerUser(values);
    }
  };

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
