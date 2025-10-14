import { Request, Response } from "express";
import { Order, OrderItem } from "@/models/order";
import mongoose from "mongoose";

// Create Order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId, items } = req.body; // items = [{ bookId, quantity, sellPrice, totalPrice }]

    // Create OrderItems
    const orderItems = await OrderItem.insertMany(
      items.map((item: any) => ({ ...item }))
    );

    const order = await Order.create({
      userId,
      orderItemIds: orderItems.map((i) => i._id),
    });

    res.status(201).json({ success: true, data: order });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get Orders
export const getOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await Order.find().populate({
      path: "orderItemIds",
      populate: { path: "bookId" },
    });
    res.json({ success: true, data: orders });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get Single Order
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id).populate({
      path: "orderItemIds",
      populate: { path: "bookId" },
    });
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    res.json({ success: true, data: order });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete Order
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    // Delete all related OrderItems
    await OrderItem.deleteMany({ _id: { $in: order.orderItemIds } });
    await order.deleteOne();

    res.json({ success: true, message: "Order deleted" });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
