import type { CartItemUI } from "../models/CartItemUI.model";
import type { CartUI } from "../models/CartUI.model";

const STORAGE_KEY = "guest_cart";

const getEmptyCart = (): CartUI => ({
  items: [],
});

const saveGuestCart = (cart: CartUI) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
};

export const getGuestCart = (): CartUI => {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return getEmptyCart();
  }

  try {
    return JSON.parse(raw) as CartUI;
  } catch {
    return getEmptyCart();
  }
};

export const addCartItemToGuestCart = (item: CartItemUI): CartItemUI => {
  const cart = getGuestCart();

  const existing = cart.items.find((i) => i.productId === item.productId);

  let resultItem: CartItemUI;

  if (existing) {
    existing.quantity += item.quantity;
    resultItem = existing;
  } else {
    cart.items.push(item);
    resultItem = item;
  }

  saveGuestCart(cart);
  return resultItem;
};

export const updateGuestCartItem = (
  productId: number,
  quantity: number,
): CartItemUI | null => {
  const cart = getGuestCart();

  let updatedItem: CartItemUI | null = null;

  cart.items = cart.items.map((item) => {
    if (item.productId === productId) {
      updatedItem = { ...item, quantity };
      return updatedItem;
    }
    return item;
  });

  saveGuestCart(cart);
  return updatedItem;
};

export const removeCartItemFromGuestCart = (productId: number): void => {
  const cart = getGuestCart();

  cart.items = cart.items.filter((item) => item.productId !== productId);

  saveGuestCart(cart);
  return;
};

export const clearGuestCart = (): void => {
  const emptyCart = getEmptyCart();
  saveGuestCart(emptyCart);
  return;
};
