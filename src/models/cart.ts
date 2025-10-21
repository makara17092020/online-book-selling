import { Schema, model, Document, Types } from "mongoose";
import { ICartItem } from "./cartItem";

export interface ICart extends Document {
  user?: Types.ObjectId;
  items: Types.ObjectId[] | ICartItem[];
}

const cartSchema = new Schema<ICart>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: false },
    items: [{ type: Schema.Types.ObjectId, ref: "CartItem" }],
  },
  { timestamps: true }
);

export const Cart = model<ICart>("Cart", cartSchema);
