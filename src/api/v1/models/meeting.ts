import mongoose from "mongoose";
import MeetingMode from "../enums/meetingMode";
import PointLocation from "../interfaces/pointLocation";
import convertEnumToArray from "../helpers/enumArray";
import { PointLocationSchema } from "./common";
import SendBy from "../enums/sendBy";
import MeetingStatus from "../enums/meetingStatus";
import MeetingType from "../enums/meetingType";
import { Participant, participantSchema } from "./conversation.model";

export enum MeetingEmployeeAction {
  Approved = "approved",
  Pending = "pending",
  Declined = "declined",
}

export interface MeetingDocument extends mongoose.Document {
  employeeId?: string;
  projectId?: mongoose.Types.ObjectId;
  meetingType: MeetingType;
  requestedBy: SendBy;
  creatorId: { name: string; id: string; number: string };
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
  conversationId?: mongoose.Types.ObjectId;
  participants: Participant[];

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

const creatorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
  id: { type: String, required: true },
});

var MeetingSchema = new mongoose.Schema(
  {
    employeeId: { type: String },
    creatorId: creatorSchema,
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
    meetingType: {
      default: MeetingType.Project,
      type: String,
      enum: convertEnumToArray(MeetingType),
    },
    projectId: {
      type: mongoose.Types.ObjectId,
      required: () => {
        //@ts-ignore
        return this.meetingType == MeetingType.Project;
      },
    },
    customerId: {
      type: mongoose.Types.ObjectId,
      required: () => {
        return (
          //@ts-ignore
          this.meetingType == MeetingType.Project &&
          //@ts-ignore
          this.meetingType == MeetingType.Primary
        );
      },
    },
    conversationId: {
      type: mongoose.Types.ObjectId,
      required: () => {
        //@ts-ignore
        return (
          //@ts-ignore
          this.meetingType == MeetingType.Conversation ||
          //@ts-ignore
          this.meetingType == MeetingType.Primary
        );
      },
    },
    participants: {
      type: [participantSchema],
      required: () => {
        //@ts-ignore
        return this.meetingType == MeetingType.Direct;
      },
    },
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
