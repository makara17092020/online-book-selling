import { User } from "@/models/user";
import { Role } from "@/models/role";
import bcrypt from "bcrypt";

// ✅ Get all users
export const getAllUsersService = async () => {
  try {
    const users = await User.find().populate("roleId", "name");
    const formatted = users.map((u) => ({
      id: u._id,
      email: u.email,
      firstName: u.firstName,
      lastName: u.lastName,
      userName: u.userName,
      role: (u.roleId as any)?.name || "Unknown",
      phone: u.phone,
      age: u.age,
    }));

    return {
      success: true,
      status: 200,
      message: "All users fetched",
      data: formatted,
    };
  } catch (error: any) {
    return { success: false, status: 500, message: error.message };
  }
};

// ✅ Get one user by ID
export const getUserByIdService = async (id: string) => {
  try {
    const user = await User.findById(id).populate("roleId", "name");
    if (!user)
      return { success: false, status: 404, message: "User not found" };

    return {
      success: true,
      status: 200,
      message: "User found",
      data: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        role: (user.roleId as any)?.name || "Unknown",
        phone: user.phone,
        age: user.age,
      },
    };
  } catch (error: any) {
    return { success: false, status: 500, message: error.message };
  }
};

// ✅ Create new user
export const createUserService = async (data: any) => {
  try {
    const {
      email,
      firstName,
      lastName,
      userName,
      password,
      phone,
      age,
      roleName,
    } = data;

    const exists = await User.findOne({ email });
    if (exists)
      return { success: false, status: 400, message: "Email already exists" };

    const role = await Role.findOne({ name: roleName || "User" });
    if (!role)
      return { success: false, status: 400, message: "Role not found" };

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      firstName,
      lastName,
      userName,
      password: hashed,
      phone,
      age,
      roleId: role._id,
    });

    return {
      success: true,
      status: 201,
      message: "User created successfully",
      data: newUser,
    };
  } catch (error: any) {
    return { success: false, status: 500, message: error.message };
  }
};

// ✅ Update user
export const updateUserService = async (id: string, data: any) => {
  try {
    const { password, roleName, ...rest } = data;

    // Optional password change
    if (password) rest.password = await bcrypt.hash(password, 10);

    // Optional role change
    if (roleName) {
      const role = await Role.findOne({ name: roleName });
      if (!role)
        return { success: false, status: 400, message: "Role not found" };
      rest.roleId = role._id;
    }

    const updated = await User.findByIdAndUpdate(id, rest, { new: true });
    if (!updated)
      return { success: false, status: 404, message: "User not found" };

    return {
      success: true,
      status: 200,
      message: "User updated",
      data: updated,
    };
  } catch (error: any) {
    return { success: false, status: 500, message: error.message };
  }
};

// ✅ Delete user
export const deleteUserService = async (id: string) => {
  try {
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted)
      return { success: false, status: 404, message: "User not found" };

    return { success: true, status: 200, message: "User deleted successfully" };
  } catch (error: any) {
    return { success: false, status: 500, message: error.message };
  }
};
