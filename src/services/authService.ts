import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "@/models/user";
import { environment } from "@/config/environment";
import { IUser } from "@/types/user";
import { BlacklistToken } from "@/models/blacklistToken";

const JWT_SECRET = environment.JWT_SECRET;

// ---------------------- REGISTER ----------------------
export const registerService = async (userData: Partial<IUser>) => {
  const {
    email,
    firstName,
    lastName,
    userName,
    password,
    phone,
    age,
    address,
    avatarUrl,
    role,
  } = userData;

  const existing = await User.findOne({ email });
  if (existing)
    return { success: false, status: 400, message: "Email already used" };

  const hashedPassword = await bcrypt.hash(password!, 10);

  // Auto-assign Customer if role not Admin
  const roleName: "Admin" | "Customer" =
    role === "Admin" ? "Admin" : "Customer";

  const newUser = await User.create({
    email,
    firstName,
    lastName,
    userName,
    password: hashedPassword,
    roleId: roleName,
    phone,
    age,
    address,
    avatarUrl,
    isActive: true,
  });

  return {
    success: true,
    status: 201,
    message: `${roleName} registered successfully`,
    data: {
      id: newUser._id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      userName: newUser.userName,
      role: roleName,
      phone: newUser.phone,
      age: newUser.age,
      address: newUser.address,
      avatarUrl: newUser.avatarUrl,
      isActive: newUser.isActive,
    },
  };
};

// ---------------------- LOGIN ----------------------
export const loginService = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) return { success: false, status: 404, message: "User not found" };

  const valid = await bcrypt.compare(password, user.password);
  if (!valid)
    return { success: false, status: 400, message: "Invalid password" };

  const token = jwt.sign({ id: user._id, role: user.roleId }, JWT_SECRET, {
    expiresIn: "1d",
  });

  return {
    success: true,
    status: 200,
    message: `Welcome ${user.userName}`,
    data: {
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        role: user.roleId,
        phone: user.phone,
        age: user.age,
        address: user.address,
        avatarUrl: user.avatarUrl,
        isActive: user.isActive,
      },
    },
  };
};

// ---------------------- LOGOUT ----------------------
export const logoutService = async (token: string) => {
  await BlacklistToken.create({ token });
  return { success: true, status: 200, message: "Logged out successfully" };
};
