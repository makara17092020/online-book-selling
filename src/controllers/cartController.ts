import { Request, Response } from "express";
import { Types } from "mongoose";
import { Cart } from "../models/cart";
import { CartItem } from "../models/cartItem";
import { User } from "../models/user";

// Create a cart
export const createCart = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.body;
    let user = null;
    if (user_id) {
      user = await User.findById(user_id);
      if (!user) return res.status(404).json({ message: "User not found" });
    }

    const cart = new Cart({ user: user?._id });
    await cart.save();
    return res.status(201).json(cart);
  } catch (err) {
    return res.status(500).json({ message: "Failed to create cart", error: err });
  }
};

// Add item to cart
export const addItemToCart = async (req: Request, res: Response) => {
  try {
    const { cart_id, product_name, quantity, price } = req.body;

    const cart = await Cart.findById(cart_id);
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    // Create the item
    const item = new CartItem({
      product_name,
      quantity,
      price,
      cart: cart._id,
    });
    await item.save();

    // Ensure cart.items is an array
    if (!cart.items) cart.items = [];
    // push the item's ObjectId (cast to any to avoid TypeScript expecting ICartItem)
    cart.items.push(item._id as any);
    await cart.save();

    return res.status(201).json(item);
  } catch (err) {
    return res.status(500).json({ message: "Failed to add item", error: err });
  }
};

// Get cart with items
export const getCartWithItems = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findById(id).populate("items");
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    return res.json(cart);
  } catch (err) {
    return res.status(500).json({ message: "Failed to get cart", error: err });
  }
};

// Remove item from cart
export const removeItemFromCart = async (req: Request, res: Response) => {
  try {
    const { item_id } = req.params;
    const item = await CartItem.findByIdAndDelete(item_id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    // Remove item reference from cart
    await Cart.findByIdAndUpdate(item.cart, { $pull: { items: item._id } });

    return res.json({ message: "Item removed" });
  } catch (err) {
    return res.status(500).json({ message: "Failed to remove item", error: err });
  }
};

// Delete cart
export const deleteCart = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findByIdAndDelete(id);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Delete all items in the cart
    await CartItem.deleteMany({ cart: cart._id });

    return res.json({ message: "Cart deleted" });
  } catch (err) {
    return res.status(500).json({ message: "Failed to delete cart", error: err });
  }
};
