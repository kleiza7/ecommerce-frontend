import { useEffect } from "react";
import { reqCartGetCart } from "../api/controllers/Cart.controller";
import { getGuestCart } from "../shared/utils/GuestCart.util";
import { useCartStore } from "../stores/CartStore";
import { useUserStore } from "../stores/UserStore";

export const useCartHydrate = () => {
  const { user, isHydrated } = useUserStore();
  const setItems = useCartStore((state) => state.setItems);

  const userId = user?.id;

  useEffect(() => {
    if (!isHydrated) return;

    const hydrate = async () => {
      if (userId) {
        const res = await reqCartGetCart();
        if (res.data) {
          setItems(res.data.items);
        }
      } else {
        const cart = getGuestCart();
        setItems(cart.items);
      }
    };

    hydrate();
  }, [isHydrated, userId, setItems]);
};
