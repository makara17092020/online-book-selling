import { Request, Response } from "express";
import {
  registerService,
  loginService,
  logoutService,
} from "@/services/authService";

export const register = async (req: Request, res: Response) => {
  const result = await registerService(req.body);
  res.status(result.status).json(result);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await loginService(email, password);
  res.status(result.status).json(result);
};

export const logout = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });

  const token = authHeader.split(" ")[1];
  const result = await logoutService(token);
  res.status(result.status).json(result);
};
