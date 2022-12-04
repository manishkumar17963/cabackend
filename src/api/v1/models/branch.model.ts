import mongoose from "mongoose";
import StateList from "../enums/stateList.enum";
import convertEnumToArray from "../helpers/enumArray";

export interface BranchInput {
  name: string;
  appendId: string;
  invoiceNo: number;
  quotationNo: number;
  address: string;
  state: StateList;
  gstNumber: string;
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
  gstNumber: { type: String, required: true },
  state: { type: String, required: true, enum: convertEnumToArray(StateList) },
  address: { type: String, required: true },
  email: { type: String, required: true },
  number: { type: String, required: true },
  appendId: { type: String, required: true },
  invoiceNo: { type: Number, default: 0 },
  quotationNo: { type: Number, default: 0 },
});

const Branch = mongoose.model<BranchDocument>("Branch", BranchSchema);
export default Branch;
