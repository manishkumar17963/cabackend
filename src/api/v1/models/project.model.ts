import mongoose from "mongoose";
import BillingType from "../enums/billingType";
import PaymentMethod from "../enums/paymentMethod";
import PaymentStatus from "../enums/paymentStatus";
import Priority from "../enums/priority";
import EmployeeRole from "../enums/role";
import SendBy from "../enums/sendBy";

import ProjectStatus from "../enums/taskStatus";
import convertEnumToArray from "../helpers/enumArray";
import { CommentDocument } from "./comment";

interface assignedEmployee {
  role: EmployeeRole;
  taskCount: number;
  employeeId: string;
}

export interface ProjectInput {
  customerId: mongoose.Types.ObjectId;
  assignedEmployees: assignedEmployee[];
  name: string;
  services: mongoose.Types.ObjectId[];
  primaryEmployee?: string;
  lastUploaded?: Date;
  priority: Priority;
  billingType: BillingType;
  startDate: Date;
  expectedEndDate: Date;
  description: string;
  clientApproved: boolean;
  adminApproved: boolean;
  status: ProjectStatus;
}

export interface ProjectDocument extends mongoose.Document, ProjectInput {
  files: mongoose.Types.ObjectId[];

  invoiceId?: mongoose.Types.ObjectId;
  quotationId: mongoose.Types.ObjectId[];
  paymentInitiated?: Boolean;
  paymentMethod?: PaymentMethod;
  transactionId?: string;
  paymentStatus?: PaymentStatus;

  expectedPaymentDate?: Date;
  actualPaymentDate?: Date;
  paymentAmount?: number;
}
const AssignedEmployeeSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: convertEnumToArray(EmployeeRole),
    default: EmployeeRole.Secondary,
  },
  employeeId: { required: true, type: String },
  taskCount: { default: 0, type: Number },
});
const FileSchema = new mongoose.Schema(
  {
    fileUri: { type: String, required: true },
    senderId: { type: String || mongoose.Types.ObjectId, required: true },
    sendBy: { type: String, required: true },
    comment: String,
  },
  { timestamps: true }
);

var ProjectSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Customer",
    },
    services: [mongoose.Types.ObjectId],
    primaryEmployee: { type: String },
    quotationId: [mongoose.Types.ObjectId],
    invoiceId: mongoose.Types.ObjectId,
    clientApproved: { type: Boolean, required: true, default: false },
    adminApproved: { type: Boolean, required: true, default: false },
    name: { type: String, required: true },
    lastUploaded: { type: Date },
    billingType: {
      type: String,
      required: true,
      default: BillingType.Billable,
      enum: convertEnumToArray(BillingType),
    },
    files: [mongoose.Types.ObjectId],
    assignedEmployees: [AssignedEmployeeSchema],
    description: String,
    status: {
      type: String,
      enum: convertEnumToArray(ProjectStatus),
      default: ProjectStatus.Initiated,
    },
    paymentInitiated: Boolean,
    paymentMethod: { enum: convertEnumToArray(PaymentMethod), type: String },
    transactionId: String,
    paymentStatus: { enum: convertEnumToArray(PaymentStatus), type: String },
    expectedPaymentDate: Date,
    actualPaymentDate: Date,
    startDate: { type: Date, default: new Date() },
    expectedEndDate: { type: Date },
    paymentAmount: Number,
    priority: {
      type: String,
      enum: convertEnumToArray(Priority),
      default: Priority.Default,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model<ProjectDocument>("Project", ProjectSchema);
export default Project;
