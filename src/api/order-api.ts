import mongoose from "mongoose";
import { Order, OrderItem } from "@/models/order";
import { IOrderItem } from "@/types/order";

// Create an order
export const createOrderAPI = async (userId: string, items: IOrderItem[]) => {
  // Create the order first
  const order = new Order({
    userId: new mongoose.Types.ObjectId(userId),
    orderItemIds: [],
  });
  await order.save();

  // Create order items
  const savedItemIds: mongoose.Types.ObjectId[] = await Promise.all(
    items.map(async (item) => {
      const orderItem = new OrderItem({
        orderId: order._id,
        bookId: new mongoose.Types.ObjectId(item.bookId),
        quantity: item.quantity,
        totalPrice: item.totalPrice,
        sellPrice: item.sellPrice,
      });
      await orderItem.save();
      return orderItem._id as mongoose.Types.ObjectId;
    })
  );

  // Assign savedItemIds to order
  order.orderItemIds = savedItemIds;
  await order.save();

  return order.toObject();
};

// Get all orders
export const getOrdersAPI = async () => {
  return Order.find().populate("orderItemIds").lean();
};

// Get order by ID
export const getOrderByIdAPI = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return Order.findById(id).populate("orderItemIds").lean();
};

// Delete order
export const deleteOrderAPI = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return Order.findByIdAndDelete(id).lean();
};
