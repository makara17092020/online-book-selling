import { Order } from "@/models/order";
import { IOrder } from "@/types/order";

export const createOrderService = async (data: IOrder) => {
  try {
    if (!data.userId || !data.orderItemIds?.length) {
      return { success: false, status: 400, message: "Missing fields" };
    }

    const newOrder = await Order.create({
      userId: data.userId,
      orderItemIds: data.orderItemIds,
    });

    return { success: true, status: 201, data: newOrder };
  } catch (error: any) {
    return { success: false, status: 500, message: error.message };
  }
};

export const getAllOrdersService = async () => {
  try {
    const orders = await Order.find()
      .populate("userId")
      .populate("orderItemIds");
    return { success: true, status: 200, data: orders };
  } catch (error: any) {
    return { success: false, status: 500, message: error.message };
  }
};

export const getOrderByIdService = async (id: string) => {
  try {
    const order = await Order.findById(id)
      .populate("userId")
      .populate("orderItemIds");

    if (!order)
      return { success: false, status: 404, message: "Order not found" };

    return { success: true, status: 200, data: order };
  } catch (error: any) {
    return { success: false, status: 500, message: error.message };
  }
};
