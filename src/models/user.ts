import mongoose, { Document, Schema, Model, Types } from "mongoose";
import { IUser } from "@/types/user";

export interface IUserDocument extends IUser, Document {}

const userSchema = new Schema<IUserDocument>({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  roleId: { type: Schema.Types.ObjectId, ref: "Role", required: true }, // 👈 now matches interface
  phone: Number,
  age: Number,
});

export const User: Model<IUserDocument> = mongoose.model<IUserDocument>(
  "User",
  userSchema
);
