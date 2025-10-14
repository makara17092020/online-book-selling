import mongoose, { Schema, Document, Model } from "mongoose";
import { IOrder, IOrderItem } from "@/types/order";

// --- OrderItem ---
export interface OrderItemDocument extends Document {
  orderId: mongoose.Types.ObjectId;
  bookId: mongoose.Types.ObjectId;
  quantity: number;
  totalPrice: number;
  sellPrice: number;
}

const orderItemSchema = new Schema<OrderItemDocument>(
  {
    orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    sellPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

export const OrderItem: Model<OrderItemDocument> =
  mongoose.model<OrderItemDocument>("OrderItem", orderItemSchema);

// --- Order ---
export interface OrderDocument extends Document {
  userId: mongoose.Types.ObjectId;
  orderItemIds: mongoose.Types.ObjectId[];
}

const orderSchema = new Schema<OrderDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    orderItemIds: [{ type: Schema.Types.ObjectId, ref: "OrderItem" }],
  },
  { timestamps: true }
);

export const Order: Model<OrderDocument> = mongoose.model<OrderDocument>(
  "Order",
  orderSchema
);
