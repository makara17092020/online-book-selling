import jwt from "jsonwebtoken";
import { environment } from "@/config/environment";
import { BlacklistToken } from "@/models/blacklistToken";

// ✅ Verify Token Middleware
export const verifyToken = async (req: any, res: any, next: any) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];

    // Check if token was logged out
    const blacklisted = await BlacklistToken.findOne({ token });
    if (blacklisted)
      return res.status(401).json({ message: "Token is invalid (logged out)" });

    const decoded = jwt.verify(token, environment.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// ✅ Admin Role Middleware
export const isAdmin = (req: any, res: any, next: any) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
};
