import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { USER_ROLE } from "../../../api/enums/UserRole.enum";
import { useAuthLogin } from "../../../hooks/useAuthLogin";
import { useCartMerge } from "../../../hooks/useCartMerge";
import { useFavoritesMerge } from "../../../hooks/useFavoritesMerge";
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

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<LoginFormValues>({
    mode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
    const data = await login(values);

    loginUser(data.user, data.accessToken);

    if (data.user.role !== USER_ROLE.USER) {
      navigate("/", { replace: true });
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

    // 🔥 HER ŞEY BİTTİKTEN SONRA
    navigate("/", { replace: true });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex flex-col gap-y-5"
    >
      {isPending && (
        <div className="bg-surface-primary/70 absolute inset-0 z-20 flex items-center justify-center rounded-lg">
          <div className="border-t-orange border-gray-6 h-12 w-12 animate-spin rounded-full border-4" />
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

        <div className="relative flex flex-col">
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

          <InputErrorLabel message={errors.password?.message} />
        </div>
      </div>

      <button
        type="submit"
        disabled={!isValid || isPending}
        className={customTwMerge(BUTTON_PRIMARY, BUTTON_SIZE_X_LARGE)}
      >
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
