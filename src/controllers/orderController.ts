import { Request, Response } from "express";
import {
  createOrderService,
  getAllOrdersService,
  getOrderByIdService,
  updateOrderService,
  deleteOrderService,
} from "@/services/orderService";
import { IOrder } from "@/types/order";

export const createOrder = async (req: Request, res: Response) => {
  const data: IOrder = req.body;
  const result = await createOrderService(data);
  res.status(result.status).json(result);
};

export const getOrders = async (_req: Request, res: Response) => {
  const result = await getAllOrdersService();
  res.status(result.status).json(result);
};

export const getOrder = async (req: Request, res: Response) => {
  const result = await getOrderByIdService(req.params.id);
  res.status(result.status).json(result);
};

export const updateOrder = async (req: Request, res: Response) => {
  const result = await updateOrderService(req.params.id, req.body);
  res.status(result.status).json(result);
};

export const deleteOrder = async (req: Request, res: Response) => {
  const result = await deleteOrderService(req.params.id);
  res.status(result.status).json(result);
};
