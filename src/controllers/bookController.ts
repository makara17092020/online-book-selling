import { Request, Response } from "express";
import {
  createBookService,
  getAllBooksService,
  getBookByIdService,
  updateBookService,
  deleteBookService,
} from "@/services/bookService";

export const createBook = async (req: Request, res: Response) => {
  const result = await createBookService(req.body);
  res.status(result.status).json(result);
};

export const getBooks = async (_req: Request, res: Response) => {
  const result = await getAllBooksService();
  res.status(result.status).json(result);
};

export const getBookById = async (req: Request, res: Response) => {
  const result = await getBookByIdService(req.params.id);
  res.status(result.status).json(result);
};

export const updateBook = async (req: Request, res: Response) => {
  const result = await updateBookService(req.params.id, req.body);
  res.status(result.status).json(result);
};

export const deleteBook = async (req: Request, res: Response) => {
  const result = await deleteBookService(req.params.id);
  res.status(result.status).json(result);
};
