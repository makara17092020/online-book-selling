import { Request, Response, NextFunction } from "express";

export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);

  // If the error already has a status and message, use them
  const status = err.status || 500;
  const message = err.message || "Internal server error";

  // Optional: include stack trace in development
  const response: any = {
    success: false,
    message,
  };
  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  res.status(status).json(response);
}
