import { create } from 'zustand';
import type { Product } from '../api/models/Product.model';

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Product 1',
    description: 'Description for Product 1',
    price: 100,
    image: '',
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'Description for Product 2',
    price: 200,
    image: '',
  },
  {
    id: 3,
    name: 'Product 3',
    description: 'Description for Product 3',
    price: 300,
    image: '',
  },
  {
    id: 4,
    name: 'Product 4',
    description: 'Description for Product 4',
    price: 400,
    image: '',
  },
  {
    id: 5,
    name: 'Product 5',
    description: 'Description for Product 5',
    price: 400,
    image: '',
  },
  {
    id: 6,
    name: 'Product 6',
    description: 'Description for Product 4',
    price: 400,
    image: '',
  },
  {
    id: 7,
    name: 'Product 7',
    description: 'Description for Product 4',
    price: 400,
    image: '',
  },
  {
    id: 8,
    name: 'Product 8',
    description: 'Description for Product 4',
    price: 400,
    image: '',
  },
];

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
