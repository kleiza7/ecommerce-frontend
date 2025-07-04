import { create } from 'zustand';

type CartStoreState = {
  cart: {
    productId: number;
    count: number;
  }[];
};

type CartStoreActions = {
  addProductToCart: (productId: number) => void;
  removeProductFromCart: (productId: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStoreState & CartStoreActions>((set) => ({
  cart: [],
  addProductToCart: (productId) =>
    set((state) => {
      const isProductExistsInCart = state.cart.find((item) => item.productId === productId);

      if (isProductExistsInCart) {
        return {
          cart: state.cart.map((item) =>
            item.productId === productId ? { ...item, count: item.count + 1 } : item,
          ),
        };
      }
      return {
        cart: [...state.cart, { productId, count: 1 }],
      };
    }),
  removeProductFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.productId !== productId),
    })),
  clearCart: () => set({ cart: [] }),
}));
