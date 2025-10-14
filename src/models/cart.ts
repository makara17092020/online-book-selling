import mongoose, { Schema, Document, Model } from "mongoose";
import { ICart } from "@/types/cart";

// Define CartDocument only extends Document
export interface CartDocument extends Document {
  userId: mongoose.Types.ObjectId;
  bookId: mongoose.Types.ObjectId;
}

// Define schema
const cartSchema = new Schema<CartDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  },
  { timestamps: true }
);

// Export Mongoose model
export const Cart: Model<CartDocument> = mongoose.model<CartDocument>(
  "Cart",
  cartSchema
);
