import mongoose from "mongoose";

export interface BranchInput {
  name: string;
  appendId: string;
  invoiceNo: number;
  quotationNo: number;
  address: string;
  number: string;
  email: string;
}

export interface BranchDocument extends mongoose.Document, BranchInput {}

const BranchSchema = new mongoose.Schema({
  _id: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    alias: "name",
  },
  address: { type: String, required: true },
  email: { type: String, required: true },
  number: { type: String, required: true },
  appendId: { type: String, required: true },
  invoiceNo: { type: Number, default: 0 },
  quotationNo: { type: Number, default: 0 },
});

const Branch = mongoose.model<BranchDocument>("Branch", BranchSchema);
export default Branch;
