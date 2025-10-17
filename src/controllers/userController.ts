import { Request, Response } from "express";
import { registerService, loginService } from "@/services/userService";

// Register Controller
export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const result = await registerService(name, email, password);
  res.status(result.status).json(result);
};

// Login Controller
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await loginService(email, password);
  res.status(result.status).json(result);
};
