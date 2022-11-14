import mongoose from "mongoose";
import AttendanceType from "../enums/attendanceType";
import convertEnumToArray from "../helpers/enumArray";

interface SingleAttendanceDocument {
  employeeId: string;
  approved: Boolean;
  time: Date;
}

export interface AttendanceDocument extends mongoose.Document {
  date: Date;
  open: boolean;
  attendanceType: AttendanceType;
  attendance: SingleAttendanceDocument[];
}

const SingleAttendanceSchema = new mongoose.Schema(
  {
    employeeId: { type: String, required: true },
    approved: { type: Boolean, default: false },
    time: { type: Date, required: true },
  },
  { _id: false }
);

const AttendanceSchema = new mongoose.Schema({
  date: { type: Date, required: true, unique: true },
  attendanceType: {
    type: String,
    enum: convertEnumToArray(AttendanceType),
    required: true,
    default: AttendanceType.Normal,
  },
  open: { type: Boolean, default: true },
  attendance: [SingleAttendanceSchema],
});

const Attendance = mongoose.model<AttendanceDocument>(
  "Attendance",
  AttendanceSchema
);
export default Attendance;
