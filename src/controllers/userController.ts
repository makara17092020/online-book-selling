import { Request, Response } from "express";
import {
  getAllUsersService,
  getUserByIdService,
  createUserService,
  updateUserService,
  deleteUserService,
} from "@/services/userService";

export const getAllUsers = async (req: Request, res: Response) => {
  const result = await getAllUsersService();
  res.status(result.status).json(result);
};

export const getUserById = async (req: Request, res: Response) => {
  const result = await getUserByIdService(req.params.id);
  res.status(result.status).json(result);
};

export const createUser = async (req: Request, res: Response) => {
  const result = await createUserService(req.body);
  res.status(result.status).json(result);
};

export const updateUser = async (req: Request, res: Response) => {
  const result = await updateUserService(req.params.id, req.body);
  res.status(result.status).json(result);
};

export const deleteUser = async (req: Request, res: Response) => {
  const result = await deleteUserService(req.params.id);
  res.status(result.status).json(result);
};
