import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { environment } from "@/config/environment";

const JWT_SECRET = environment.JWT_SECRET;

// ---------------------- VERIFY TOKEN ----------------------
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      role: "Admin" | "Customer";
    };
    req.user = decoded; // ✅ req.user now has id and role
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

// ---------------------- CHECK ADMIN ROLE ----------------------
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: "User not found" });
  }

  if (req.user.role !== "Admin") {
    return res
      .status(403)
      .json({ success: false, message: "Access denied, Admins only" });
  }

  next();
};

// ---------------------- CHECK ROLE (CUSTOMER OR ADMIN) ----------------------
export const checkRole = (roles: ("Admin" | "Customer")[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    next();
  };
};
