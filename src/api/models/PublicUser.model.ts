import type { User } from "./User.model";

export type PublicUser = Omit<User, "password">;
