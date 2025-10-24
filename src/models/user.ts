import mongoose, { Schema, Document, Model } from "mongoose";
import { IUser } from "@/types/user";

export interface IUserDocument extends Omit<IUser, "_id">, Document {}

const userSchema = new Schema<IUserDocument>(
  {
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    roleId: { type: String, enum: ["Admin", "Customer"], required: true },
    phone: String,
    age: Number,
    address: String,
    avatarUrl: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true } // auto createdAt & updatedAt
);

export const User: Model<IUserDocument> = mongoose.model<IUserDocument>(
  "User",
  userSchema
);
