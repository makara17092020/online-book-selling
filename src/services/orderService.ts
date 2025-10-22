import mongoose from "mongoose";
import { Order } from "@/models/order";
import { IOrder } from "@/types/order";

// Create order
export const createOrderService = async (data: IOrder) => {
  try {
    const newOrder = await Order.create(data);
    return { success: true, status: 201, data: newOrder };
  } catch (error: any) {
    return { success: false, status: 500, message: error.message };
  }
};

// Get all orders
export const getAllOrdersService = async () => {
  try {
    const orders = await Order.find()
      .populate("userId", "firstName lastName email")
      .populate({
        path: "orderItemIds",
        populate: { path: "bookId", select: "title price" },
      });
    return { success: true, status: 200, data: orders };
  } catch (error: any) {
    return { success: false, status: 500, message: error.message };
  }
};

// Get order by ID
export const getOrderByIdService = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id))
    return { success: false, status: 400, message: "Invalid ID" };

  try {
    const order = await Order.findById(id)
      .populate("userId", "firstName lastName email")
      .populate({
        path: "orderItemIds",
        populate: { path: "bookId", select: "title price" },
      });
    if (!order)
      return { success: false, status: 404, message: "Order not found" };
    return { success: true, status: 200, data: order };
  } catch (error: any) {
    return { success: false, status: 500, message: error.message };
  }
};

// Update order
export const updateOrderService = async (id: string, data: Partial<IOrder>) => {
  if (!mongoose.Types.ObjectId.isValid(id))
    return { success: false, status: 400, message: "Invalid ID" };

  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, data, { new: true });
    if (!updatedOrder)
      return { success: false, status: 404, message: "Order not found" };
    return { success: true, status: 200, data: updatedOrder };
  } catch (error: any) {
    return { success: false, status: 500, message: error.message };
  }
};

// Delete order
export const deleteOrderService = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id))
    return { success: false, status: 400, message: "Invalid ID" };

  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder)
      return { success: false, status: 404, message: "Order not found" };
    return {
      success: true,
      status: 200,
      message: "Order deleted successfully",
    };
  } catch (error: any) {
    return { success: false, status: 500, message: error.message };
  }
};
