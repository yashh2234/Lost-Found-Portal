import mongoose, { Schema, Document } from "mongoose";

export interface IItem extends Document {
  title: string;
  description: string;
  type: "Lost" | "Found";
  status: "Pending" | "Approved" | "Claimed";
  createdAt: Date;
}

const ItemSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ["Lost", "Found"], required: true },
    status: { type: String, enum: ["Pending", "Approved", "Claimed"], default: "Pending" },
  },
  { timestamps: true } // adds createdAt & updatedAt
);

export default mongoose.model<IItem>("Item", ItemSchema);
