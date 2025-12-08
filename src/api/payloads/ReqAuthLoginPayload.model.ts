import type { User } from "../models/User.model";

export type ReqAuthLoginPayload = {
  email: User["email"];
  password: User["password"];
};
