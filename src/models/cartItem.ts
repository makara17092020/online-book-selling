import { Schema, model, Document, Types } from "mongoose";

export interface ICartItem extends Document {
  product_name: string;
  quantity: number;
  price: number;
  cart: Types.ObjectId;
}

const cartItemSchema = new Schema<ICartItem>(
  {
    product_name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    cart: { type: Schema.Types.ObjectId, ref: "Cart", required: true },
  },
  { timestamps: true }
);

export const CartItem = model<ICartItem>("CartItem", cartItemSchema);
