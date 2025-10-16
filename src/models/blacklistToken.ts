import mongoose from "mongoose";

const blacklistTokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: "7d" }, // auto-delete after 1 day
});

export const BlacklistToken = mongoose.model(
  "BlacklistToken",
  blacklistTokenSchema
);
