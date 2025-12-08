import type { Brand } from "../models/Brand.model";

export type ReqBrandsCreatePayload = Omit<Brand, "id" | "slug">;
