import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { USER_ROLE } from "../../../api/enums/UserRole.enum";
import {
  LockIcon,
  MailIcon,
  VisibilityIcon,
  VisibilityOffIcon,
} from "../../../assets/icons";
import { useAuthLogin } from "../../../hooks/useAuthLogin";
import { useCartMerge } from "../../../hooks/useCartMerge";
import { useFavoritesMerge } from "../../../hooks/useFavoritesMerge";
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
import { ROUTES } from "../../../shared/constants/Routes.constants";
import {
  clearGuestCart,
  getGuestCart,
} from "../../../shared/utils/GuestCart.util";
import {
  clearGuestFavorites,
  getGuestFavorites,
} from "../../../shared/utils/GuestFavorite.util";
import { customTwMerge } from "../../../shared/utils/Tailwind.util";
import { useCartStore } from "../../../stores/CartStore";
import { useFavoriteStore } from "../../../stores/FavoriteStore";
import { useUserStore } from "../../../stores/UserStore";

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const navigate = useNavigate();
  const loginUser = useUserStore((state) => state.login);
  const setCartItems = useCartStore((state) => state.setItems);
  const setFavoriteItems = useFavoriteStore((state) => state.setItems);

  const { mutateAsync: login, isPending } = useAuthLogin();
  const { mutateAsync: mergeCart } = useCartMerge();
  const { mutateAsync: mergeFavorites } = useFavoritesMerge();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
    const data = await login(values);

    loginUser(data.user, data.accessToken);

    if (data.user.role !== USER_ROLE.USER) {
      navigate(ROUTES.HOME_PAGE.build(), { replace: true });
      return;
    }

    const guestCart = getGuestCart();

    if (guestCart.items.length > 0) {
      const cartRes = await mergeCart({
        items: guestCart.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      });

      setCartItems(cartRes.items);
      clearGuestCart();
    }

    const guestFavorites = getGuestFavorites();

    if (guestFavorites.items.length > 0) {
      const favRes = await mergeFavorites({
        productIds: guestFavorites.items.map((item) => item.productId),
      });

      setFavoriteItems(favRes);
      clearGuestFavorites();
    }

    navigate(ROUTES.HOME_PAGE.build(), { replace: true });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex w-md flex-col gap-y-10 p-10"
    >
      {isPending && (
        <div className="bg-surface-primary/70 absolute inset-0 z-20 flex items-center justify-center rounded-lg">
          <LoadingSpinner size={48} borderWidth={4} />
        </div>
      )}

      <div className="flex flex-col items-center gap-y-2">
        <span className="text-s32-l40 text-text-primary font-bold">
          Welcome
        </span>
        <span className="text-s16-l24 text-text-muted">
          Please enter your details to login
        </span>
      </div>

      <div className="flex flex-col gap-y-5">
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

        <div className="relative flex flex-col gap-y-1 pb-4 md:pb-0">
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
            className="top-[60px] md:top-auto"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className={customTwMerge(BUTTON_PRIMARY, BUTTON_SIZE_X_LARGE, "h-14")}
      >
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
