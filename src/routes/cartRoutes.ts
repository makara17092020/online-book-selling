import { Router } from "express";
import {
  addToCart,
  getCartItems,
  removeFromCart,
} from "@/controllers/cartController";

const router = Router();

router.post("/", addToCart);
router.get("/", getCartItems);
router.delete("/:id", removeFromCart);

export default router;
