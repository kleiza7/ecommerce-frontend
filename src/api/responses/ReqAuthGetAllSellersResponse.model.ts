import type { PublicUser } from "../models/PublicUser.model";

export type ReqAuthGetAllSellersResponse = Pick<PublicUser, "id" | "name">[];
