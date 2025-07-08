import { create } from 'zustand';
import type { ReqProductsGetAllResponse } from '../api/responses/ReqProductsGetAllResponse.model';

type ProductStoreState = {
  products: ReqProductsGetAllResponse;
};

type ProductStoreActions = {
  setProducts: (products: ReqProductsGetAllResponse) => void;
  addProduct: (product: ReqProductsGetAllResponse[number]) => void;
  removeProduct: (id: number) => void;
};

export const useProductStore = create<ProductStoreState & ProductStoreActions>((set) => ({
  products: [],
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
