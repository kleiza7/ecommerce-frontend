import type { PublicUser } from "../models/PublicUser.model";

export type ReqAuthLoginResponse = {
  user: PublicUser;
  accessToken: string;
};
