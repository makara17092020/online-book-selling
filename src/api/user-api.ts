import { User } from "@/models/user";
import { IUser } from "@/models/user";

export const createUserAPI = async (data: IUser) => {
  const user = new User(data);
  await user.save();
  return user.toObject();
};

export const getAllUsersAPI = async () => User.find().lean();
export const getUserByIdAPI = async (id: string) => User.findById(id).lean();
export const updateUserAPI = async (id: string, data: Partial<IUser>) =>
  User.findByIdAndUpdate(id, data, { new: true }).lean();
export const deleteUserAPI = async (id: string) =>
  User.findByIdAndDelete(id).lean();
