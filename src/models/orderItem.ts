import mongoose, { Schema, model } from "mongoose";

const orderItemSchema = new Schema(
  {
    orderId: { type: Schema.Types.ObjectId, ref: "Order" },
    bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    sellPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

export const OrderItem = model("OrderItem", orderItemSchema);
