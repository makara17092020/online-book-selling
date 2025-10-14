import mongoose, { Schema, Document, Model } from "mongoose";

// Role
export interface RoleDocument extends Document {
  name: string;
}

const roleSchema = new Schema<RoleDocument>({
  name: { type: String, required: true },
});

export const Role: Model<RoleDocument> = mongoose.model<RoleDocument>(
  "Role",
  roleSchema
);

// User
export interface UserDocument extends Document {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  roleId: mongoose.Types.ObjectId;
  phone?: number;
  age?: number;
}

const userSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    roleId: { type: Schema.Types.ObjectId, ref: "Role", required: true },
    phone: { type: Number },
    age: { type: Number },
  },
  { timestamps: true }
);

export const User: Model<UserDocument> = mongoose.model<UserDocument>(
  "User",
  userSchema
);
