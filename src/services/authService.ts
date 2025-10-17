import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "@/models/user";
import { BlacklistToken } from "@/models/blacklistToken";
import { environment } from "@/config/environment";

const JWT_SECRET = environment.JWT_SECRET;

// Register service
export const registerService = async (
  name: string,
  email: string,
  password: string,
  role: string,
  adminPassword?: string
) => {
  if (role === "admin" && adminPassword !== environment.ADMIN_PASSWORD) {
    return {
      success: false,
      status: 403,
      message: "Invalid admin password",
    };
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return {
      success: false,
      status: 400,
      message: "Email already used",
    };
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
    role: role || "user",
  });

  return {
    success: true,
    status: 201,
    message: "User registered successfully",
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

// Login service
export const loginService = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    return {
      success: false,
      status: 404,
      message: "User not found",
    };
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return {
      success: false,
      status: 400,
      message: "Invalid password",
    };
  }

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: "1d",
  });

  return {
    success: true,
    status: 200,
    message: `Welcome ${user.name}`,
    data: {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
  };
};

// Logout service
export const logoutService = async (token: string) => {
  await BlacklistToken.create({ token });

  return {
    success: true,
    status: 200,
    message: "Logged out successfully",
  };
};
