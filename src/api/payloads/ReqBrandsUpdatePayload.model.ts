import type { Brand } from "../models/Brand.model";

export type ReqBrandsUpdatePayload = Omit<Brand, "slug">;
