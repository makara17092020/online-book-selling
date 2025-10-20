import { Types } from "mongoose";

// User interface
export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  roleId: Types.ObjectId; // 👈 use ObjectId instead of string
  phone?: number;
  age?: number;
}

// Role interface
export interface IRole {
  name: string;
}
