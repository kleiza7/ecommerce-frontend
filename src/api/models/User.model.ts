import { USER_ROLE } from "./../enums/UserRole.enum";

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: typeof USER_ROLE;
};
