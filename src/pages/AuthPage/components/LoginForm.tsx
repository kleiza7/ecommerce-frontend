import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthLogin } from "../../../hooks/useAuthLogin";
import { useCartMerge } from "../../../hooks/useCartMerge";
import GenericFormInput from "../../../shared/components/GenericFormInput";
import InputErrorLabel from "../../../shared/components/InputErrorLabel";
import InputLabel from "../../../shared/components/InputLabel";
import {
  clearGuestCart,
  getGuestCart,
} from "../../../shared/utils/GuestCart.util";
import { useCartStore } from "../../../stores/CartStore";
import { useUserStore } from "../../../stores/UserStore";

import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
} from "../../../shared/constants/Form.constants";

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const navigate = useNavigate();
  const loginUser = useUserStore((state) => state.login);
  const setItems = useCartStore((state) => state.setItems);

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<LoginFormValues>({
    mode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  const cartMergeMutation = useCartMerge((data) => {
    setItems(data.items);
    clearGuestCart();
  });

  const { mutate: login, isPending } = useAuthLogin((data) => {
    loginUser(data.user, data.accessToken);

    const guestCart = getGuestCart();

    if (guestCart.items.length > 0) {
      cartMergeMutation.mutate({
        items: guestCart.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      });
    }

    navigate("/dashboard", { replace: true });
  });

  const onSubmit: SubmitHandler<LoginFormValues> = (values) => {
    login(values);
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
            type="password"
            disabled={isPending}
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
        className={`text-s16-l16 h-12 cursor-pointer rounded-lg font-semibold text-white ${
          !isValid || isPending
            ? "bg-orange/40 cursor-not-allowed"
            : "bg-orange hover:bg-orange/90"
        }`}
      >
        Giriş Yap
      </button>
    </form>
  );
};

export default LoginForm;
