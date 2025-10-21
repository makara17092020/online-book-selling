import mongoose, { Document, Schema } from "mongoose";

export interface ICartItem extends Document {
  cartId: mongoose.Types.ObjectId;
  bookId: mongoose.Types.ObjectId;
  quantity: number;
  totalPrice: number;
  sellPrice: number;
}

const CartItemSchema: Schema = new Schema(
  {
    cartId: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    bookId: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    sellPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

export const CartItem = mongoose.model<ICartItem>("CartItem", CartItemSchema);
