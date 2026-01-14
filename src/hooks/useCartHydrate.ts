import { useEffect, useRef } from "react";
import { reqCartGetCart } from "../api/controllers/Cart.controller";
import { getGuestCart } from "../shared/utils/GuestCart.util";
import { useCartStore } from "../stores/CartStore";
import { useUserStore } from "../stores/UserStore";

export const useCartHydrate = () => {
  const { user, isHydrated } = useUserStore();
  const setItems = useCartStore((state) => state.setItems);

  const hydratedRef = useRef(false);

  useEffect(() => {
    if (!isHydrated) return;
    if (hydratedRef.current) return;

    const hydrate = async () => {
      if (user) {
        const res = await reqCartGetCart();
        if (res.data) {
          setItems(res.data.items);
        }
      } else {
        const cart = getGuestCart();
        setItems(cart.items);
      }

      hydratedRef.current = true;
    };

    hydrate();
  }, [isHydrated, user, setItems]);
};
