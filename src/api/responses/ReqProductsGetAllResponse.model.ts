import type { Product } from '../models/Product.model';

export type ReqProductsGetAllResponse = Omit<Product, 'createdAt' | 'updatedAt'>[];

