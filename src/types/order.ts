export interface IOrderItem {
  _id?: string;
  orderId: string;
  bookId: string;
  quantity: number;
  totalPrice: number;
  sellPrice: number;
}

export interface IOrder {
  _id?: string;
  userId: string;
  orderItemIds: string[];
}
