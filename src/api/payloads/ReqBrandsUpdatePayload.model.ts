import type { Brand } from "../models/Brand.model";

export type ReqBrandsUpdatePayload = Partial<Omit<Brand, "id" | "slug">>;
