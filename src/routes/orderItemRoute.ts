import express from "express";
import {
  createOrderItem,
  getOrderItems,
  getOrderItem,
  updateOrderItem,
  deleteOrderItem,
} from "@/controllers/orderItemController";

const router = express.Router();

router.post("/", createOrderItem);
router.get("/", getOrderItems);
router.get("/:id", getOrderItem);
router.put("/:id", updateOrderItem);
router.delete("/:id", deleteOrderItem);

export default router;
