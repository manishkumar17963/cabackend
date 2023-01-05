import mongoose, { mongo } from "mongoose";

import Priority from "../enums/priority";
import SendBy from "../enums/sendBy";

import ProjectStatus from "../enums/taskStatus";
import WorkFrom from "../enums/workFrom";
import convertEnumToArray from "../helpers/enumArray";
import Location from "../interfaces/location";

import { CommentDocument } from "./comment";
import { LocationSchema, PointLocationSchema } from "./common";

export interface SelfTaskInput {
  assignedEmployee: string;
  timeLog: ITimeLog[];
  userType: SendBy;
  description?: string;
  name: string;
  startDate?: Date;
  endDate?: Date;
  expectedEndDate?: Date;

  status: ProjectStatus;
  priority: Priority;
}

export interface ITimeLog {
  workFrom: WorkFrom;
  location?: Location;

  startTime: Date;
  endTime?: Date;
  employeeId: string;
}

export interface SelfTaskDocument extends mongoose.Document, SelfTaskInput {
  comments: (mongoose.Types.ObjectId | CommentDocument)[];
  attachments: string[];
}

var TimeLogSchema = new mongoose.Schema({
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  employeeId: { type: String },
  workFrom: {
    type: String,
    enum: convertEnumToArray(WorkFrom),
    required: true,
  },
  location: {
    type: LocationSchema,
  },
});

var TaskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    startDate: Date,
    endDate: Date,
    expectedEndDate: Date,
    userType: {
      type: String,
      enum: convertEnumToArray(SendBy),
      default: SendBy.Employee,
    },
    assignedEmployee: {
      type: String,
      required: true,
      ref: "Employee",
    },
    comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
    description: String,
    attachments: [String],
    status: {
      type: String,
      enum: convertEnumToArray(ProjectStatus),
      default: ProjectStatus.Initiated,
    },
    timeLog: [TimeLogSchema],

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

const SelfTask = mongoose.model<SelfTaskDocument>("SelfTask", TaskSchema);
export default SelfTask;
