import type { Category } from "../models/Category.model";

export type ReqCategoriesCreatePayload = Omit<Category, "id" | "slug">;
