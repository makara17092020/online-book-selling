import { Types } from "mongoose";

export interface IOrderItem {
  _id?: Types.ObjectId;
  orderId?: Types.ObjectId; // optional because order may not exist yet
  bookId: Types.ObjectId;
  quantity: number;
  totalPrice: number;
  sellPrice: number;
}

export interface IOrder {
  _id?: Types.ObjectId;
  userId: Types.ObjectId;
  orderItemIds?: Types.ObjectId[];
}
