import { Book } from "@/models/bookModel";
import { CreateBookInput } from "@/types/book";

export const createBookService = async (data: CreateBookInput) => {
  try {
    const book = await Book.create(data);
    return { status: 201, success: true, data: book };
  } catch (error: any) {
    return { status: 400, success: false, message: error.message };
  }
};

export const getAllBooksService = async () => {
  try {
    const books = await Book.find();
    return { status: 200, success: true, data: books };
  } catch (error: any) {
    return { status: 500, success: false, message: error.message };
  }
};

export const getBookByIdService = async (id: string) => {
  try {
    const book = await Book.findById(id);
    if (!book)
      return { status: 404, success: false, message: "Book not found" };
    return { status: 200, success: true, data: book };
  } catch (error: any) {
    return { status: 500, success: false, message: error.message };
  }
};

export const updateBookService = async (id: string, data: Partial<CreateBookInput>) => {
  try {
    const updated = await Book.findByIdAndUpdate(id, data, { new: true });
    if (!updated)
      return { status: 404, success: false, message: "Book not found" };
    return { status: 200, success: true, data: updated };
  } catch (error: any) {
    return { status: 400, success: false, message: error.message };
  }
};

export const deleteBookService = async (id: string) => {
  try {
    const deleted = await Book.findByIdAndDelete(id);
    if (!deleted)
      return { status: 404, success: false, message: "Book not found" };
    return { status: 200, success: true, message: "Book deleted successfully" };
  } catch (error: any) {
    return { status: 500, success: false, message: error.message };
  }
};
