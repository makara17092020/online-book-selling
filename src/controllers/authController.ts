import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "@/models/user";
import { environment } from "@/config/environment";
import { BlacklistToken } from "@/models/blacklistToken";

const JWT_SECRET = environment.JWT_SECRET;

// ✅ Register function
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, adminPassword } = req.body;

    // Only allow admin creation with correct admin password
    if (role === "admin") {
      if (adminPassword !== environment.ADMIN_PASSWORD) {
        return res.status(403).json({ message: "Invalid admin password" });
      }
    }

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already used" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashed,
      role: role || "user",
    });

    res.status(201).json({ success: true, user });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Login function
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      success: true,
      token,
      role: user.role,
      message: `Welcome ${user.name}`,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    await BlacklistToken.create({ token });

    res.json({ success: true, message: "Logged out successfully" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
