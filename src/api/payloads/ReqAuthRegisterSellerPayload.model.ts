import type { User } from "../models/User.model";

export type ReqAuthRegisterSellerPayload = {
  name: User["name"];
  email: User["email"];
  password: User["password"];
};
