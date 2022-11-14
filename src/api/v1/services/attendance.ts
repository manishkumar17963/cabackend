import {
  FilterQuery,
  UpdateQuery,
  QueryOptions,
  PipelineStage,
} from "mongoose";
import Attendance, { AttendanceDocument } from "../models/attendance";

export async function createAttendance(input: any) {
  return Attendance.create(input);
}

export async function findAttendance(
  query: FilterQuery<AttendanceDocument>,
  select: { [key: string]: number } = {},
  options: QueryOptions = {}
) {
  return Attendance.findOne(query, select, options);
}

export async function findAndUpdateAttendance(
  query: FilterQuery<AttendanceDocument>,
  update: UpdateQuery<AttendanceDocument>,
  options: QueryOptions
) {
  return Attendance.findOneAndUpdate(query, update, options);
}

export async function deletePost(query: FilterQuery<AttendanceDocument>) {
  return Attendance.deleteOne(query);
}

export async function aggregateAttendance(operators: PipelineStage[]) {
  return Attendance.aggregate(operators);
}
