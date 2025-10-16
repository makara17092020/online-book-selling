import express from "express";
import { register, login } from "@/controllers/userController";

const router = express.Router();

// Register new user
router.post("/register", register);

// Login existing user
router.post("/login", login);

export default router;
