import mongoose, { Schema, Document, Types } from "mongoose";
import { IBook } from "@/types/book";

export interface BookDocument extends Omit<IBook, "_id" | "createdAt" | "updatedAt">, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const bookSchema = new Schema<BookDocument>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String },
    description: { type: String },
    image: { type: String },
    price: { type: Number },
  },
  { timestamps: true }
);

export const Book = mongoose.model<BookDocument>("Book", bookSchema);
