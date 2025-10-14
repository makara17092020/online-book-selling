import mongoose, { Schema, Document, Model } from "mongoose";
import { IBook } from "@/types/book";

export interface BookDocument extends Document {
  title: string;
  author: string;
  category?: string;
  description?: string;
  image?: string;
  price?: number;
  createdAt?: Date;
  updatedAt?: Date;
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

export const Book: Model<BookDocument> = mongoose.model<BookDocument>(
  "Book",
  bookSchema
);
