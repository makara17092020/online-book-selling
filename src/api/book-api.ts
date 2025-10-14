import { Book } from "@/models/book";
import { IBook, CreateBookInput } from "@/types/book";
import mongoose from "mongoose";

// Helper function to convert Mongoose _id to string
const formatBook = (doc: any): IBook => ({
  ...doc.toObject(),
  _id: doc._id.toString(),
});

export const createBookAPI = async (data: CreateBookInput): Promise<IBook> => {
  const book = new Book(data);
  await book.save();
  return formatBook(book);
};

export const getAllBooksAPI = async (): Promise<IBook[]> => {
  const books = await Book.find();
  return books.map(formatBook);
};

export const getBookByIdAPI = async (id: string): Promise<IBook | null> => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  const book = await Book.findById(id);
  return book ? formatBook(book) : null;
};

export const updateBookAPI = async (
  id: string,
  data: Partial<CreateBookInput>
): Promise<IBook | null> => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  const book = await Book.findByIdAndUpdate(id, data, { new: true });
  return book ? formatBook(book) : null;
};

export const deleteBookAPI = async (id: string): Promise<IBook | null> => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  const book = await Book.findByIdAndDelete(id);
  return book ? formatBook(book) : null;
};
