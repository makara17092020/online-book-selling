import { Cart } from "@/models/cart";
import { ICart } from "@/types/cart";

export const addToCartAPI = async (data: ICart) => {
  const cart = new Cart(data);
  await cart.save();
  return cart.toObject();
};

export const getCartItemsAPI = async () =>
  Cart.find().populate("bookId").populate("userId").lean();
export const removeFromCartAPI = async (id: string) =>
  Cart.findByIdAndDelete(id).lean();
