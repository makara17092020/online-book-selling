import { IOrderItem } from "@/types/order";
import { OrderItem } from "@/models/orderItem";
import mongoose from "mongoose";

export const createOrderItemService = async (data: IOrderItem) => {
  try {
    const newItem = await OrderItem.create(data);
    return { success: true, status: 201, data: newItem };
  } catch (error: any) {
    return { success: false, status: 500, message: error.message };
  }
};

export const getAllOrderItemsService = async () => {
  try {
    const items = await OrderItem.find().populate("orderId").populate("bookId");
    return { success: true, status: 200, data: items };
  } catch (error: any) {
    return { success: false, status: 500, message: error.message };
  }
};

export const getOrderItemByIdService = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return { success: false, status: 400, message: "Invalid ID" };
  }

  try {
    const item = await OrderItem.findById(id)
      .populate("orderId")
      .populate("bookId");
    if (!item)
      return { success: false, status: 404, message: "OrderItem not found" };
    return { success: true, status: 200, data: item };
  } catch (error: any) {
    return { success: false, status: 500, message: error.message };
  }
};

export const updateOrderItemService = async (
  id: string,
  data: Partial<IOrderItem>
) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return { success: false, status: 400, message: "Invalid ID" };
  }

  try {
    const updatedItem = await OrderItem.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedItem)
      return { success: false, status: 404, message: "OrderItem not found" };
    return { success: true, status: 200, data: updatedItem };
  } catch (error: any) {
    return { success: false, status: 500, message: error.message };
  }
};

export const deleteOrderItemService = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return { success: false, status: 400, message: "Invalid ID" };
  }

  try {
    const deletedItem = await OrderItem.findByIdAndDelete(id);
    if (!deletedItem)
      return { success: false, status: 404, message: "OrderItem not found" };
    return {
      success: true,
      status: 200,
      message: "OrderItem deleted successfully",
    };
  } catch (error: any) {
    return { success: false, status: 500, message: error.message };
  }
};
