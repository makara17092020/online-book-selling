import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "@/models/user";
import { Role } from "@/models/role";
import { BlacklistToken } from "@/models/blacklistToken";
import { environment } from "@/config/environment";
import { IUser } from "@/types/user";

const JWT_SECRET = environment.JWT_SECRET;

// Register service
export const registerService = async (userData: Partial<IUser>) => {
  const { email, firstName, lastName, userName, password, phone, age } =
    userData;

  const existing = await User.findOne({ email });
  if (existing)
    return { success: false, status: 400, message: "Email already used" };

  const hashed = await bcrypt.hash(password!, 10);

  // Assign default role
  const defaultRole = await Role.findOne({ name: "User" });
  if (!defaultRole)
    return { success: false, status: 500, message: "Default role not found" };

  const newUser = await User.create({
      firstName,
  lastName,
  userName,
  email,
  password,
  phone,
  age,
  Role,

  });

  return {
    success: true,
    status: 201,
    message: "User registered successfully",
    data: {
      id: newUser._id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      userName: newUser.userName,
      roleId: newUser.roleId,
      phone: newUser.phone,
      age: newUser.age,
    },
  };
};

// Login service
export const loginService = async (email: string, password: string) => {
  const user = await User.findOne({ email }).populate("roleId");
  if (!user) return { success: false, status: 404, message: "User not found" };

  const valid = await bcrypt.compare(password, user.password);
  if (!valid)
    return { success: false, status: 400, message: "Invalid password" };

  const token = jwt.sign(
    { id: user._id, role: (user.roleId as any).name },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

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
        role: (user.roleId as any).name,
        phone: user.phone,
        age: user.age,
      },
    },
  };
};

// Logout service
export const logoutService = async (token: string) => {
  await BlacklistToken.create({ token });
  return { success: true, status: 200, message: "Logged out successfully" };
};
