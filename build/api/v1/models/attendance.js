"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var attendanceType_1 = __importDefault(require("../enums/attendanceType"));
var holidayStatus_1 = __importDefault(require("../enums/holidayStatus"));
var enumArray_1 = __importDefault(require("../helpers/enumArray"));
var SingleAttendanceSchema = new mongoose_1.default.Schema({
    employeeId: { type: String, required: true },
    approved: {
        type: String,
        default: holidayStatus_1.default.Pending,
        enum: enumArray_1.default(holidayStatus_1.default),
    },
    time: { type: Date, required: true },
}, { _id: false });
var AttendanceSchema = new mongoose_1.default.Schema({
    date: { type: Date, required: true, unique: true },
    attendanceType: {
        type: String,
        enum: enumArray_1.default(attendanceType_1.default),
        required: true,
        default: attendanceType_1.default.Normal,
    },
    open: { type: Boolean, default: true },
    attendance: [SingleAttendanceSchema],
});
var Attendance = mongoose_1.default.model("Attendance", AttendanceSchema);
exports.default = Attendance;
