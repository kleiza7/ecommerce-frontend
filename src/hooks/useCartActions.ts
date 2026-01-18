import { useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { TOAST_TYPE } from "../shared/enums/ToastType.enum";
import type { CartItemUI } from "../shared/models/CartItemUI.model";
import {
  addCartItemToGuestCart,
  clearGuestCart,
  getGuestCart,
  removeCartItemFromGuestCart,
  updateGuestCartItem,
} from "../shared/utils/GuestCart.util";
import { showToast } from "../shared/utils/Toast.util";
import { useCartStore } from "../stores/CartStore";
import { useUserStore } from "../stores/UserStore";
import { useCartAdd } from "./useCartAdd";
import { useCartClear } from "./useCartClear";
import { useCartGetCart } from "./useCartGetCart";
import { useCartRemove } from "./useCartRemove";
import { useCartUpdate } from "./useCartUpdate";

export const useCartActions = () => {
  const queryClient = useQueryClient();

  const cartCurrencyId = useCartStore((state) => state.currencyId);
  const setItems = useCartStore((state) => state.setItems);
  const addItem = useCartStore((state) => state.addItem);
  const updateItem = useCartStore((state) => state.updateItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearStoreCart = useCartStore((state) => state.clearCart);

  const user = useUserStore((state) => state.user);

  const cartGetQuery = useCartGetCart();
  const cartAddMutation = useCartAdd();
  const cartUpdateMutation = useCartUpdate();
  const cartRemoveMutation = useCartRemove();
  const cartClearMutation = useCartClear();

  const isAuthenticated = Boolean(user);

  const getCart = async () => {
    if (isAuthenticated) {
      const result = await cartGetQuery.refetch();
      if (result.data) {
        setItems(result.data.items);
      }
      return;
    }

    const cart = getGuestCart();
    setItems(cart.items);
  };

  const addToCart = (product: CartItemUI["product"]) => {
    if (cartCurrencyId !== null && cartCurrencyId !== product.currency.id) {
      showToast({
        title: "Mixed currency not allowed",
        description:
          "You cannot add products with different currencies to the same cart.",
        type: TOAST_TYPE.ERROR,
      });
      return;
    }

    const snapshotItems = useCartStore.getState().items;

    const existing = snapshotItems.find(
      (item) => item.productId === product.id,
    );

    const newQuantity = (existing?.quantity ?? 0) + 1;

    /* -------------------- OPTIMISTIC UI -------------------- */
    addItem({
      productId: product.id,
      quantity: newQuantity,
      priceSnapshot: product.price,
      currencyId: product.currency.id,
      product,
    });

    /* ==================== AUTH USER ==================== */
    if (isAuthenticated) {
      cartAddMutation.mutate(
        { productId: product.id, quantity: 1 },
        {
          onSuccess: (item) => {
            const current = useCartStore
              .getState()
              .items.find((i) => i.productId === product.id);

            if (!current) {
              return;
            }

            // quantity authoritative → UI sync
            if (current.quantity !== item.quantity) {
              updateItem(item.productId, item.quantity);
            }

            // id authoritative → UI sync
            if (!current.id && item.id) {
              setItems(
                useCartStore
                  .getState()
                  .items.map((i) =>
                    i.productId === product.id ? { ...i, id: item.id } : i,
                  ),
              );
            }
          },
          onError: (error: AxiosError) => {
            // ---- PRODUCT-LEVEL ROLLBACK ----
            if (existing) {
              updateItem(product.id, existing.quantity);
            } else {
              removeItem(product.id);
            }

            if (error.response?.status === 409) {
              queryClient.invalidateQueries({ queryKey: ["cart"] });
            }
          },
        },
      );
      return;
    }

    /* ==================== GUEST USER ==================== */
    try {
      const addedItem = addCartItemToGuestCart({
        productId: product.id,
        quantity: 1,
        priceSnapshot: product.price,
        currencyId: product.currency.id,
        product,
      });

      const current = useCartStore
        .getState()
        .items.find((i) => i.productId === product.id);

      // guest cart authoritative → quantity sync
      if (current && current.quantity !== addedItem.quantity) {
        updateItem(addedItem.productId, addedItem.quantity);
      }
    } catch {
      // ---- PRODUCT-LEVEL ROLLBACK ----
      if (existing) {
        updateItem(product.id, existing.quantity);
      } else {
        removeItem(product.id);
      }

      showToast({
        description: "Failed to add the item to the cart.",
        type: TOAST_TYPE.ERROR,
      });
    }
  };

  const updateCart = ({
    id,
    productId,
    newQuantity,
  }: {
    id?: number;
    productId: number;
    newQuantity: number;
  }) => {
    const snapshotQuantity = useCartStore
      .getState()
      .items.find((item) => item.productId === productId)?.quantity;

    if (snapshotQuantity === undefined) {
      return;
    }

    updateItem(productId, newQuantity);

    if (isAuthenticated && !!id) {
      cartUpdateMutation.mutate(
        {
          itemId: id,
          quantity: newQuantity,
        },
        {
          onSuccess: (item) => {
            if (item.quantity !== newQuantity) {
              updateItem(item.productId, item.quantity);
            }
          },
          onError: (error: AxiosError) => {
            updateItem(productId, snapshotQuantity);

            if (error.response?.status === 409) {
              queryClient.invalidateQueries({
                queryKey: ["cart"],
              });
            }
          },
        },
      );
      return;
    }

    try {
      const updatedItem = updateGuestCartItem(productId, newQuantity);

      if (updatedItem) {
        if (updatedItem.quantity !== newQuantity) {
          updateItem(updatedItem.productId, updatedItem.quantity);
        }
      } else {
        updateItem(productId, snapshotQuantity);
      }
    } catch {
      updateItem(productId, snapshotQuantity);

      showToast({
        description: "Failed to update the cart item.",
        type: TOAST_TYPE.ERROR,
      });
    }
  };

  const removeFromCart = ({
    id,
    productId,
  }: {
    id?: number;
    productId: number;
  }) => {
    const snapshotItems = useCartStore.getState().items;

    removeItem(productId);

    if (isAuthenticated && !!id) {
      cartRemoveMutation.mutate(id, {
        onSuccess: () => {
          queryClient.removeQueries({ queryKey: ["cart"] });
        },
        onError: () => {
          setItems(snapshotItems);
        },
      });
      return;
    }

    try {
      removeCartItemFromGuestCart(productId);
    } catch {
      setItems(snapshotItems);

      showToast({
        description: "Failed to remove the item from your cart.",
        type: TOAST_TYPE.ERROR,
      });
    }
  };

  const clearCart = () => {
    const snapshotItems = useCartStore.getState().items;

    clearStoreCart();

    if (isAuthenticated) {
      cartClearMutation.mutate(undefined, {
        onSuccess: () => {
          queryClient.removeQueries({ queryKey: ["cart"] });
        },
        onError: () => {
          setItems(snapshotItems);
        },
      });
      return;
    }

    try {
      clearGuestCart();
    } catch {
      setItems(snapshotItems);

      showToast({
        description: "Failed to clear the cart.",
        type: TOAST_TYPE.ERROR,
      });
    }
  };

  return {
    getCart,
    addToCart,
    updateCart,
    removeFromCart,
    clearCart,

    isLoading:
      cartAddMutation.isPending ||
      cartUpdateMutation.isPending ||
      cartRemoveMutation.isPending ||
      cartClearMutation.isPending,
  };
};
