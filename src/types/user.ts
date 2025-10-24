export interface IUser {
  _id?: string;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  phone?: string | number;
  age?: number;
  address?: string;
  avatarUrl?: string;
  roleId?: "Admin" | "Customer"; // stored in DB
  role?: "Admin" | "Customer"; // optional input during registration
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  lastLogin?: Date;
}
