import { Request, Response } from "express";
import { Book } from "@/models/book";
import { CreateBookInput } from "@/types/book";

// Create a book
export const createBook = async (req: Request, res: Response) => {
  try {
    const bookData: CreateBookInput = req.body;
    const newBook = await Book.create(bookData);
    res.status(201).json({ success: true, data: newBook });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all books
export const getBooks = async (_req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.json({ success: true, data: books });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get book by ID
export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book)
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    res.json({ success: true, data: book });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update book
export const updateBook = async (req: Request, res: Response) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBook)
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    res.json({ success: true, data: updatedBook });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete book
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook)
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    res.json({ success: true, data: deletedBook });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
