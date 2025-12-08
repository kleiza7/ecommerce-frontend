import type { User } from "../models/User.model";

export type ReqAuthRegisterUserPayload = {
  name: User["name"];
  email: User["email"];
  password: User["password"];
};
