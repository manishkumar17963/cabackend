import { number } from "joi";
import mongoose from "mongoose";
import PaymentMethod from "../enums/paymentMethod";
import PaymentStatus from "../enums/paymentStatus";
import convertEnumToArray from "../helpers/enumArray";
import { ServiceSchema } from "./common";
export interface ServiceInput {
  name: string;
  description?: string;
  price: number;
}
export interface InvoiceInput {
  projectId: mongoose.Types.ObjectId;
  customerId: mongoose.Types.ObjectId;
  projectName: string;
  gstNumber: string;
  notes: string[];
  branchId: string;
  invoiceNo: string;
  expectedPaymentDate: Date;
  amount: number;
  paymentStatus: PaymentStatus;
  cgst: number;
  taxPercentage: number;
  sameCity: boolean;
  sgst: number;
  tds?: number;
  createdBy: string;
  services: ServiceInput[];
}

export interface InvoiceDocument extends mongoose.Document, InvoiceInput {
  actualPaymentDate?: Date;
  transactionId?: string;
}

const InvoiceSchema = new mongoose.Schema({
  createdBy: { type: String, required: true, ref: "Admin" },
  projectId: { type: mongoose.Types.ObjectId, required: true, ref: "Project" },
  gstNumber: { type: String, required: true },
  projectName: { type: String, required: true },
  paymentMethod: { enum: convertEnumToArray(PaymentMethod), type: String },
  transactionId: String,
  expectedPaymentDate: Date,
  customerId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Customer",
  },
  sameCity: { type: Boolean, required: true },
  taxPercentage: { type: Number, required: true },
  tds: { type: Number },
  cgst: { type: Number, required: true },
  sgst: { type: Number, required: true },
  actualPaymentDate: Date,
  amount: { type: Number, required: true },
  paymentStatus: {
    enum: convertEnumToArray(PaymentStatus),
    type: String,
    default: PaymentStatus.Unpaid,
  },
  branchId: {
    type: String,
    required: true,
    ref: "Branch",
  },

  invoiceNo: { type: String, required: true },

  notes: [String],

  services: [ServiceSchema],
});

const Invoice = mongoose.model<InvoiceDocument>("Invoice", InvoiceSchema);
export default Invoice;
