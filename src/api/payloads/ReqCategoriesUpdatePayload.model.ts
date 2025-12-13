import type { Category } from "../models/Category.model";

export type ReqCategoriesUpdatePayload = Omit<Category, "id" | "slug">;
