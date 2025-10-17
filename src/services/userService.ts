import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "@/models/user";
import { environment } from "@/config/environment";

// Register Service
export const registerService = async (
  name: string,
  email: string,
  password: string
) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return {
      success: false,
      status: 400,
      message: "Email already exists",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return {
    success: true,
    status: 201,
    message: "User registered successfully",
    data: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    },
  };
};

// Login Service
export const loginService = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    return {
      success: false,
      status: 400,
      message: "Invalid email or password",
    };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return {
      success: false,
      status: 400,
      message: "Invalid email or password",
    };
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    environment.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    success: true,
    status: 200,
    message: "Login successful",
    data: {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    },
  };
};
