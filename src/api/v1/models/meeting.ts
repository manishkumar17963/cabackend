import mongoose from "mongoose";
import MeetingMode from "../enums/meetingMode";
import PointLocation from "../interfaces/pointLocation";
import convertEnumToArray from "../helpers/enumArray";
import { PointLocationSchema } from "./common";
import SendBy from "../enums/sendBy";
import MeetingStatus from "../enums/meetingStatus";

export enum MeetingEmployeeAction {
  Approved = "approved",
  Pending = "pending",
  Declined = "declined",
}

export interface MeetingDocument extends mongoose.Document {
  employeeId?: string;
  projectId: mongoose.Types.ObjectId;
  requestedBy: SendBy;
  employeeCompleted: Boolean;
  employeeHistory: {
    status: MeetingEmployeeAction;
    reason?: string;
    employeeId: string;
  }[];
  employeeConfirmed: Boolean;
  customerConfirmed: Boolean;
  customerId: mongoose.Types.ObjectId;
  mode: MeetingMode;
  slotTime?: number;
  meetingStartTime: Date;

  comment?: string;
  meetingEndTime?: Date;
  meetingStatus: MeetingStatus;
  requestedLocation?: PointLocation;
  meetingStartLocation?: PointLocation;
  meetingEndLocation?: PointLocation;
  actualStartTime?: Date;
  actualEndTime?: Date;
  attendanceGiven: Boolean;
}

var MeetingSchema = new mongoose.Schema(
  {
    employeeId: { type: String },
    employeeHistory: [
      {
        status: {
          type: String,
          enum: convertEnumToArray(MeetingEmployeeAction),
          default: MeetingEmployeeAction.Pending,
        },
        reason: { type: String },
        employeeId: { type: String },
      },
    ],
    projectId: { type: mongoose.Types.ObjectId, required: true },
    customerId: { type: mongoose.Types.ObjectId, required: true },
    requestedBy: {
      type: String,
      enum: convertEnumToArray(SendBy),
      required: true,
    },
    meetingStatus: {
      type: String,
      enum: convertEnumToArray(MeetingStatus),
      default: MeetingStatus.Pending,
    },
    attendanceGiven: { type: Boolean, default: false },
    employeeConfirmed: { type: Boolean, default: false },
    employeeCompleted: { type: Boolean, default: false },
    customerConfirmed: { type: Boolean, default: false },
    mode: {
      type: String,
      enum: convertEnumToArray(MeetingMode),
      required: true,
    },
    comment: { type: String },

    meetingStartTime: {
      type: Date,
      required: true,
    },
    meetingEndTime: {
      type: Date,
      required: () => {
        //@ts-ignore
        return this.mode == MeetingMode.Online;
      },
    },
    slotTime: {
      type: Number,
      required: () => {
        //@ts-ignore
        return this.mode == MeetingMode.Online;
      },
    },
    requestedLocation: {
      type: PointLocationSchema,
      required: () => {
        //@ts-ignore
        return this.mode == MeetingMode.Physical;
      },
    },
    meetingStartLocation: {
      type: PointLocationSchema,
    },
    actualStartTime: {
      type: Date,
    },
    actualEndTime: {
      type: Date,
    },
    meetingEndLocation: {
      type: PointLocationSchema,
    },
  },
  {
    timestamps: true,
  }
);

const Meeting = mongoose.model<MeetingDocument>("Meeting", MeetingSchema);
export default Meeting;
