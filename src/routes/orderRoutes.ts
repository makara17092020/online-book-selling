import { Router } from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  deleteOrder,
} from "@/controllers/orderController";

const router = Router();

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.delete("/:id", deleteOrder);

export default router;
