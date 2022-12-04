import mongoose from "mongoose";
import QuotationRel from "../enums/quotationRel";
import QuotationType from "../enums/quotationType.enum";
import convertEnumToArray from "../helpers/enumArray";
import { ServiceSchema } from "./common";
export interface ServiceInput {
  name: string;
  description?: string;
  price: number;
}

export interface QuotationInput {
  projectName: string;
  projectId: mongoose.Types.ObjectId;
  customerId: mongoose.Types.ObjectId;
  quotationType: QuotationType;
  version: number;
  gstNumber: string;
  runningVersion?: number;
  quotationRel: QuotationRel;
  templateId: string;
  branchId: string;
  quotationNo: string;
  details: string;

  additionalNotes: string;
  terms: string[];
  approved: boolean;
  createdBy: string;
  services: ServiceInput[];
}

export interface QuotationDocument extends mongoose.Document, QuotationInput {}

const QuotationSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Customer",
  },
  gstNumber: { type: String, required: true },
  createdBy: { type: String, required: true, ref: "Admin" },
  projectId: { type: mongoose.Types.ObjectId, required: true, ref: "Project" },
  templateId: {
    type: String,
    required: true,
    ref: "QuotTemplate",
  },
  projectName: { type: String, required: true },
  branchId: {
    type: String,
    required: true,
    ref: "Branch",
  },
  quotationType: {
    type: String,
    enum: convertEnumToArray(QuotationType),
    default: QuotationType.Current,
  },
  runningVersion: {
    type: Number,
    required: () => {
      //@ts-ignore
      return this.quotationRel == QuotationRel.Parent;
    },
  },
  quotationRel: {
    type: String,
    enum: convertEnumToArray(QuotationRel),
    default: QuotationRel.Child,
  },
  quotationNo: { type: String, required: true },
  details: { type: String, required: true },
  additionalNotes: { type: String, required: true },
  terms: [String],
  approved: { type: Boolean, default: false },
  version: { type: Number, default: 0 },
  services: [ServiceSchema],
});

const Quotation = mongoose.model<QuotationDocument>(
  "Quotation",
  QuotationSchema
);
export default Quotation;
