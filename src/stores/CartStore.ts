import { create } from "zustand";
import type { CartItemUI } from "../shared/models/CartItemUI.model";

const calculateCartTotals = (items: CartItemUI[]) => {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.quantity * item.priceSnapshot,
    0,
  );

  return { totalQuantity, totalPrice };
};

type CartStoreState = {
  items: CartItemUI[];
  totalQuantity: number;
  totalPrice: number;
};

type CartStoreActions = {
  setItems: (items: CartItemUI[]) => void;
  addItem: (item: CartItemUI) => void;
  updateItem: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStoreState & CartStoreActions>(
  (set, get) => ({
    items: [],
    totalQuantity: 0,
    totalPrice: 0,

    setItems: (items) => {
      const totals = calculateCartTotals(items);

      set({
        items,
        ...totals,
      });
    },
    addItem: (item) => {
      const { items } = get();

      const existing = items.find((i) => i.productId === item.productId);

      let updatedItems: CartItemUI[];

      if (existing) {
        updatedItems = items.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: item.quantity }
            : i,
        );
      } else {
        updatedItems = [...items, item];
      }

      const totals = calculateCartTotals(updatedItems);

      set({
        items: updatedItems,
        ...totals,
      });
    },
    updateItem: (productId, quantity) => {
      const { items } = get();

      const updatedItems = items.map((item) =>
        item.productId === productId ? { ...item, quantity } : item,
      );

      const totals = calculateCartTotals(updatedItems);

      set({
        items: updatedItems,
        ...totals,
      });
    },
    removeItem: (productId) => {
      const { items } = get();

      const updatedItems = items.filter((item) => item.productId !== productId);

      const totals = calculateCartTotals(updatedItems);

      set({
        items: updatedItems,
        ...totals,
      });
    },
    clearCart: () => {
      set({
        items: [],
        totalQuantity: 0,
        totalPrice: 0,
      });
    },
  }),
);
