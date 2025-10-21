import { Request, Response } from "express";
import CartItemService from "@/services/cartItemService";

export const getAllCartItems = async (req: Request, res: Response) => {
  const result = await CartItemService.getAll();
  res.status(result.status).json(result);
};

export const getCartItemById = async (req: Request, res: Response) => {
  const result = await CartItemService.getById(req.params.id);
  res.status(result.status).json(result);
};

export const createCartItem = async (req: Request, res: Response) => {
  const result = await CartItemService.create(req.body);
  res.status(result.status).json(result);
};

export const updateCartItem = async (req: Request, res: Response) => {
  const result = await CartItemService.update(req.params.id, req.body);
  res.status(result.status).json(result);
};

export const deleteCartItem = async (req: Request, res: Response) => {
  const result = await CartItemService.delete(req.params.id);
  res.status(result.status).json(result);
};
