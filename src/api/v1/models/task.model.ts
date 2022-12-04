import mongoose, { mongo } from "mongoose";

import Priority from "../enums/priority";

import ProjectStatus from "../enums/taskStatus";
import convertEnumToArray from "../helpers/enumArray";
import { CommentDocument } from "./comment";

export interface TaskInput {
  assignedEmployee?: string;
  timeLog: ITimeLog[];
  customerId: mongoose.Types.ObjectId;
  description: string;
  name: string;
  previousEmployee: PreviousEmployee[];
  expectedEndDate?: Date;
  projectId: mongoose.Types.ObjectId;
  status: ProjectStatus;
  priority: Priority;
}

export interface ITimeLog {
  startTime: Date;
  endTime?: Date;
  employeeId: string;
}

export interface PreviousEmployee {
  assignedBy: string;
  assignedDate: Date;
  removedDate?: Date;
  removedBy?: string;
  id: string;
  username: string;
  profileUri?: string;
}

export interface TaskDocument extends mongoose.Document, TaskInput {
  comments: (mongoose.Types.ObjectId | CommentDocument)[];
}

var TimeLogSchema = new mongoose.Schema({
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  employeeId: { type: String },
});

var PreviousEmployeeSchema = new mongoose.Schema({
  assignedDate: { type: Date, required: true },
  removedDate: { type: Date },
  removedBy: { type: String },
  assignedBy: { type: String, required: true },
  id: { type: String, required: true, ref: "Employee" },
  username: { type: String, required: true },
  profileUri: { type: String },
});

var TaskSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Customer",
    },
    name: { type: String, required: true },
    previousEmployee: [PreviousEmployeeSchema],
    projectId: {
      type: mongoose.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    expectedEndDate: Date,

    assignedEmployee: {
      type: String,

      ref: "Employee",
    },
    comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
    description: String,
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

const Task = mongoose.model<TaskDocument>("Task", TaskSchema);
export default Task;
