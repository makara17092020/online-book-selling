import { Request, Response } from "express";
import {
  createOrderService,
  getAllOrdersService,
  getOrderByIdService,
} from "@/services/orderService";
import { IOrder } from "@/types/order";

export const createOrder = async (req: Request, res: Response) => {
  const orderData: IOrder = req.body;
  const result = await createOrderService(orderData);
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
