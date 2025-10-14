import { Request, Response } from "express";
import { Cart } from "@/models/cart";

// Add to Cart
export const addToCart = async (req: Request, res: Response) => {
  try {
    const cartItem = await Cart.create(req.body);
    res.status(201).json({ success: true, data: cartItem });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get Cart Items
export const getCartItems = async (_req: Request, res: Response) => {
  try {
    const items = await Cart.find().populate("bookId").populate("userId");
    res.json({ success: true, data: items });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Remove from Cart
export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const item = await Cart.findByIdAndDelete(req.params.id);
    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    res.json({ success: true, message: "Removed from cart" });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
