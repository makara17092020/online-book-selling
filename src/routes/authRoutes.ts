import express from "express";
import { login, register, logout } from "@/controllers/authController";
import { verifyToken } from "@/middlewares/auth";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", verifyToken, logout); // Protected logout

export default router;
