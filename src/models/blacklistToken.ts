import mongoose, { Document, Schema, Model } from "mongoose";

export interface IBlacklistTokenDocument extends Document {
  token: string;
}

const blacklistTokenSchema = new Schema<IBlacklistTokenDocument>({
  token: { type: String, required: true },
});

export const BlacklistToken: Model<IBlacklistTokenDocument> =
  mongoose.model<IBlacklistTokenDocument>(
    "BlacklistToken",
    blacklistTokenSchema
  );
