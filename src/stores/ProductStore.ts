import { create } from 'zustand';
import type { Product } from '../api/models/Product.model';

const PRODUCTS: Product[] = [];

type ProductStoreState = {
  products: Product[];
};

type ProductStoreActions = {
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  removeProduct: (id: number) => void;
};

export const useProductStore = create<ProductStoreState & ProductStoreActions>((set) => ({
  products: PRODUCTS,
  setProducts: (products) => set({ products }),
  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, product],
    })),
  removeProduct: (id) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    })),
}));
