// models/order.model.ts
import mongoose, { Schema, Document, Types } from "mongoose";
import { IOrder } from "@/types/order";

// Fix the _id conflict by omitting it from your interface
export interface IOrderDocument extends Omit<IOrder, "_id">, Document {}

// Define the schema
const OrderSchema = new Schema<IOrderDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    orderItemIds: [
      { type: Schema.Types.ObjectId, ref: "OrderItem", required: true },
    ],
  },
  { timestamps: true }
);

// Create the model
export const Order = mongoose.model<IOrderDocument>("Order", OrderSchema);
