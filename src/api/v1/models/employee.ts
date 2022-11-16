import mongoose, { CallbackWithoutResultAndOptionalError } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PushSubscription } from "web-push";
import BaseIdentifier from "../interfaces/baseIdentifier";
import convertEnumToArray from "../helpers/enumArray";
import HolidayStatus from "../enums/holidayStatus";
import HolidayRequest from "../interfaces/holidayDate";
import HolidayType from "../enums/holidayType";
import Schdule from "../interfaces/schdule";
import SendBy from "../enums/sendBy";

export interface SickLeaveCategoryWithout extends mongoose.Document {
  name: string;
  type: HolidayType;
  value: number;
}

export interface SickLeaveCategory extends SickLeaveCategoryWithout {
  completed: number;
}

export interface SickLeave {
  date: Date;
  types: { [key: string]: SickLeaveCategory };
}

export interface EmployeeDocument extends mongoose.Document, BaseIdentifier {
  _id: string;
  webToken: { token: string; notificationToken: PushSubscription }[];
  deviceToken: { token: string; deviceToken: string }[];
  holidayRequest: HolidayRequest[];
  schdule: Schdule[];
  importantFiles: mongoose.Types.ObjectId[];
  username: string;
  email: string;
  forgotOtp?: number;
  sickLeave: SickLeave[];
  profileUri?: string;

  generateAuthToken(
    notificationToken: PushSubscription | string
  ): Promise<string>;
}
export const SickLeaveCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: convertEnumToArray(HolidayType),
    },
    value: { type: Number, required: true },
    completed: { type: Number, required: true },
  },
  { _id: false, timestamps: false }
);
const SickLeaveSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    types: { type: Map, of: SickLeaveCategorySchema },
  },
  { timestamps: false, _id: true }
);
const SchduleSchema = new mongoose.Schema({
  meetingId: { type: mongoose.Types.ObjectId, required: true, ref: "Meeting" },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
});

const HolidayRequestSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: convertEnumToArray(HolidayStatus),
    default: HolidayStatus.Pending,
  },
  sickId: { type: mongoose.Types.ObjectId, required: true },
  date: { type: Date, required: true },
  approvedBy: { type: String, ref: "Admin" },
  reason: { type: String, default: "" },
  holidayType: {
    type: String,
    required: true,
    enum: convertEnumToArray(HolidayType),
  },
  type: { type: String, required: true },
  holidayAdded: { type: Boolean, default: false },

  denyReason: { type: String },
});

var EmployeeSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    _id: {
      type: String,
      min: 7,
      required: true,
      trim: true,
      unique: true,
    },
    importantFiles: [{ type: mongoose.Types.ObjectId, ref: "Message" }],
    profileUri: String,
    number: {
      type: String,
      required: true,
      unique: true,
    },
    email: { type: String, required: true, unique: true },
    sickLeave: [SickLeaveSchema],
    password: {
      type: String,
      min: 8,
      trim: true,
      validate(value: string) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("password cannot contain password");
        }
      },
      required: true,
    },
    forgotOtp: Number,
    tokens: [
      {
        token: {
          type: String,
        },
      },
    ],

    schdule: [SchduleSchema],

    code: { type: Number, required: true },
    codeValid: { type: Boolean, required: true },
    holidayRequest: [HolidayRequestSchema],
    webToken: [
      {
        token: String,
        notificationToken: {
          endpoint: String,
          keys: {
            p256dh: String,
            auth: String,
          },
        },
      },
    ],
    deviceToken: [{ token: String, deviceToken: String }],
  },
  {
    timestamps: true,
    _id: false,
  }
);

EmployeeSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 600, partialFilterExpression: { codeValid: true } }
);

EmployeeSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<Boolean> {
  const employee = this as EmployeeDocument;
  return bcrypt.compare(candidatePassword, employee.password);
};

EmployeeSchema.methods.generateAuthToken = async function (
  notificationToken: PushSubscription | string
): Promise<string> {
  const employee = this as EmployeeDocument;
  const token = jwt.sign(
    { _id: employee._id, type: SendBy.Employee },
    process.env.JWT_SECRET as string
  );

  employee.tokens.push({ token });
  if (typeof notificationToken == "string") {
    employee.deviceToken.push({ token, deviceToken: notificationToken });
  } else {
    employee.webToken.push({ token, notificationToken });
  }

  employee.codeValid = false;
  await employee.save();
  return token;
};

EmployeeSchema.methods.toJSON = function () {
  const employee = this as EmployeeDocument;
  const employeeObject = employee.toObject() as any;

  delete employeeObject.password;
  delete employeeObject.tokens;

  return employeeObject;
};

EmployeeSchema.pre(
  "save",
  async function (
    this: EmployeeDocument,
    next: CallbackWithoutResultAndOptionalError
  ) {
    const employee = this;
    if (employee.isModified("password")) {
      employee.password = await bcrypt.hash(employee.password, 8);
    }
    next();
  }
);

const Employee = mongoose.model<EmployeeDocument>("Employee", EmployeeSchema);
export default Employee;
