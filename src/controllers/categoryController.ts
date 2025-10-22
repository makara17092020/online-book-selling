import { Request, Response } from "express";
import CategoryService from "@/services/categoryService";

// Get all categories
export const getAllCategories = async (req: Request, res: Response) => {
  const result = await CategoryService.getAll();
  res.status(result.status).json(result);
};

// Get category by ID
export const getCategoryById = async (req: Request, res: Response) => {
  const result = await CategoryService.getById(req.params.id);
  res.status(result.status).json(result);
};

// Create new category
export const createCategory = async (req: Request, res: Response) => {
  const result = await CategoryService.createCategory(req.body.name);
  res.status(result.status).json(result);
};

// Update category
export const updateCategory = async (req: Request, res: Response) => {
  const result = await CategoryService.updateCategory(
    req.params.id,
    req.body.name
  );
  res.status(result.status).json(result);
};

// Delete category
export const deleteCategory = async (req: Request, res: Response) => {
  const result = await CategoryService.deleteCategory(req.params.id);
  res.status(result.status).json(result);
};
