import { Request, Response } from "express";
import {
  createOrderItemService,
  getAllOrderItemsService,
  getOrderItemByIdService,
  updateOrderItemService,
  deleteOrderItemService,
} from "@/services/orderItemService";
import { IOrderItem } from "@/types/order";

// Create
export const createOrderItem = async (req: Request, res: Response) => {
  const data: IOrderItem = req.body;
  const result = await createOrderItemService(data);
  res.status(result.status).json(result);
};

// Get All
export const getOrderItems = async (_req: Request, res: Response) => {
  const result = await getAllOrderItemsService();
  res.status(result.status).json(result);
};

// Get One
export const getOrderItem = async (req: Request, res: Response) => {
  const result = await getOrderItemByIdService(req.params.id);
  res.status(result.status).json(result);
};

// Update
export const updateOrderItem = async (req: Request, res: Response) => {
  const result = await updateOrderItemService(req.params.id, req.body);
  res.status(result.status).json(result);
};

// Delete
export const deleteOrderItem = async (req: Request, res: Response) => {
  const result = await deleteOrderItemService(req.params.id);
  res.status(result.status).json(result);
};
