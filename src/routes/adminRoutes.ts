import express from "express";
import { verifyToken, isAdmin } from "@/middlewares/auth";

const router = express.Router();

// GET /api/admin/dashboard
router.get("/dashboard", verifyToken, isAdmin, (_req, res) => {
  res.json({ message: "Welcome, Admin!" });
});

export default router;
