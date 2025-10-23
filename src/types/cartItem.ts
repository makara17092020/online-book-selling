import { ObjectId } from "mongoose";

export interface ICartItem {
  id?: ObjectId;       // optional because MongoDB generates _id
  cartId: ObjectId;
  bookId: ObjectId;
  quantity: number;
  createdAt?: Date;    // add timestamps
  updatedAt?: Date;    // add timestamps
}
