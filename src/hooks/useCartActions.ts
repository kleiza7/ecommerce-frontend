import type { Product } from "../api/models/Product.model";
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

  /**
   * GET CART
   */
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

  /**
   * ADD TO CART
   */
  const addToCart = (product: Product) => {
    if (isAuthenticated) {
      cartAddMutation.mutate(
        { productId: product.id, quantity: 1 },
        {
          onSuccess: (item) => {
            addItem({
              productId: item.productId,
              quantity: item.quantity,
              priceSnapshot: item.priceSnapshot,
              product: item.product,
            });
          },
        },
      );
      return;
    }

    try {
      const item: CartItemUI = {
        productId: product.id,
        quantity: 1,
        priceSnapshot: product.price,
        product,
      };

      const addedItem = addCartItemToGuestCart(item);
      addItem(addedItem);

      showToast({
        title: "Added to cart",
        description: "The item has been successfully added to your cart.",
        type: TOAST_TYPE.SUCCESS,
      });
    } catch {
      showToast({
        description: "Failed to add the item to the cart.",
        type: TOAST_TYPE.ERROR,
      });
    }
  };

  /**
   * UPDATE CART ITEM
   */
  const updateCart = (productId: number, quantity: number) => {
    if (isAuthenticated) {
      cartUpdateMutation.mutate(
        { id: productId, payload: { quantity } },
        {
          onSuccess: (item) => {
            updateItem(item.productId, item.quantity);
          },
        },
      );
      return;
    }

    try {
      const updatedItem = updateGuestCartItem(productId, quantity);

      if (updatedItem) {
        updateItem(updatedItem.productId, updatedItem.quantity);

        showToast({
          title: "Cart updated",
          description: "The item quantity has been successfully updated.",
          type: TOAST_TYPE.SUCCESS,
        });
      }
    } catch {
      showToast({
        description: "Failed to update the cart item.",
        type: TOAST_TYPE.ERROR,
      });
    }
  };

  /**
   * REMOVE FROM CART
   */
  const removeFromCart = (productId: number) => {
    if (isAuthenticated) {
      cartRemoveMutation.mutate(productId, {
        onSuccess: () => {
          removeItem(productId);
        },
      });
      return;
    }

    try {
      removeCartItemFromGuestCart(productId);
      removeItem(productId);

      showToast({
        title: "Item removed",
        description: "The item has been successfully removed from your cart.",
        type: TOAST_TYPE.SUCCESS,
      });
    } catch {
      showToast({
        description: "Failed to remove the item from your cart.",
        type: TOAST_TYPE.ERROR,
      });
    }
  };

  /**
   * CLEAR CART
   */
  const clearCart = () => {
    if (isAuthenticated) {
      cartClearMutation.mutate(undefined, {
        onSuccess: () => {
          clearStoreCart();
        },
      });
      return;
    }

    try {
      clearGuestCart();
      clearStoreCart();

      showToast({
        title: "Cart cleared",
        description: "All items have been removed from your cart.",
        type: TOAST_TYPE.SUCCESS,
      });
    } catch {
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
