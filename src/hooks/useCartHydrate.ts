import { useEffect } from "react";
import { reqCartGetCart } from "../api/controllers/Cart.controller";
import { USER_ROLE } from "../api/enums/UserRole.enum";
import { getGuestCart } from "../shared/utils/GuestCart.util";
import { useCartStore } from "../stores/CartStore";
import { useUserStore } from "../stores/UserStore";

export const useCartHydrate = () => {
  const { user, isHydrated } = useUserStore();
  const setItems = useCartStore((state) => state.setItems);

  useEffect(() => {
    if (!isHydrated) return;

    const hydrate = async () => {
      if (!user) {
        const cart = getGuestCart();
        setItems(cart.items);
        return;
      }

      if (user.role !== USER_ROLE.USER) {
        setItems([]);
        return;
      }

      const res = await reqCartGetCart();
      if (res.data) {
        setItems(res.data.items);
      }
    };

    hydrate();
  }, [isHydrated, user, setItems]);
};
