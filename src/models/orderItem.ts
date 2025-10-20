import mongoose, { Schema, Document, Types } from "mongoose";
import { IOrderItem } from "@/types/order";

export interface IOrderItemDocument extends Omit<IOrderItem, "_id">, Document {}

const OrderItemSchema = new Schema<IOrderItemDocument>(
  {
    orderId: { type: Schema.Types.ObjectId, ref: "Order" }, // optional
    bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    sellPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

export const OrderItem = mongoose.model<IOrderItemDocument>(
  "OrderItem",
  OrderItemSchema
);
