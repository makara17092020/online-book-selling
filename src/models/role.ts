import mongoose, { Document, Schema, Model } from "mongoose";
import { IRole } from "@/types/user";

export interface IRoleDocument extends IRole, Document {}

const roleSchema = new Schema<IRoleDocument>({
  name: { type: String, required: true },
});

export const Role: Model<IRoleDocument> = mongoose.model<IRoleDocument>(
  "Role",
  roleSchema
);
