import type { Category } from "../models/Category.model";

export type ReqCategoriesUpdatePayload = Partial<Omit<Category, "id" | "slug">>;
