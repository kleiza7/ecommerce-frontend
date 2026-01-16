import type { Brand } from "../models/Brand.model";
import type { Category } from "../models/Category.model";

export type ReqSearchResponse = {
  brands: Brand[];
  categories: Pick<Category, "id" | "name" | "slug">[];
  suggestions: string[];
};
