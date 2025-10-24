import mongoose, { Document, Schema, Model } from "mongoose";
import { IRole } from "@/types/role"; // ✅ fix import

// Avoid _id conflict
export interface IRoleDocument extends Omit<IRole, "_id">, Document {}

const roleSchema = new Schema<IRoleDocument>({
  name: { type: String, required: true, unique: true },
});

export const Role: Model<IRoleDocument> = mongoose.model<IRoleDocument>(
  "Role",
  roleSchema
);
