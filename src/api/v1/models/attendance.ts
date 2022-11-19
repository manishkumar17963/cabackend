import mongoose from "mongoose";
import AttendanceType from "../enums/attendanceType";
import HolidayStatus from "../enums/holidayStatus";
import convertEnumToArray from "../helpers/enumArray";

interface SingleAttendanceDocument {
  employeeId: string;
  approved: string;
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
    approved: {
      type: String,
      default: HolidayStatus.Pending,
      enum: convertEnumToArray(HolidayStatus),
    },
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
