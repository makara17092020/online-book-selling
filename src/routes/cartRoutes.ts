import { Router } from "express";
import {
  createCart,
  addItemToCart,
  getCartWithItems,
  removeItemFromCart,
  deleteCart
} from "../controllers/cartController";

const router = Router();

// Create cart
router.post("/", createCart);

// Add item
router.post("/item", addItemToCart);

// Get cart with items
router.get("/:id", getCartWithItems);

// Remove item
router.delete("/item/:item_id", removeItemFromCart);

// Delete cart
router.delete("/:id", deleteCart);

export default router;
