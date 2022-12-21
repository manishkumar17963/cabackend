"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var priority_1 = __importDefault(require("../enums/priority"));
var taskStatus_1 = __importDefault(require("../enums/taskStatus"));
var workFrom_1 = __importDefault(require("../enums/workFrom"));
var enumArray_1 = __importDefault(require("../helpers/enumArray"));
var common_1 = require("./common");
var TimeLogSchema = new mongoose_1.default.Schema({
    startTime: { type: Date, required: true },
    endTime: { type: Date },
    employeeId: { type: String },
    workFrom: {
        type: String,
        enum: enumArray_1.default(workFrom_1.default),
        required: true,
    },
    location: {
        type: common_1.LocationSchema,
    },
});
var PreviousEmployeeSchema = new mongoose_1.default.Schema({
    assignedDate: { type: Date, required: true },
    removedDate: { type: Date },
    removedBy: { type: String },
    assignedBy: { type: String, required: true },
    id: { type: String, required: true, ref: "Employee" },
    username: { type: String, required: true },
    profileUri: { type: String },
});
var TaskSchema = new mongoose_1.default.Schema({
    customerId: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
        ref: "Customer",
    },
    name: { type: String, required: true },
    previousEmployee: [PreviousEmployeeSchema],
    projectId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    expectedEndDate: Date,
    assignedEmployee: {
        type: String,
        ref: "Employee",
    },
    comments: [{ type: mongoose_1.default.Types.ObjectId, ref: "Comment" }],
    description: String,
    status: {
        type: String,
        enum: enumArray_1.default(taskStatus_1.default),
        default: taskStatus_1.default.Initiated,
    },
    timeLog: [TimeLogSchema],
    priority: {
        type: String,
        enum: enumArray_1.default(priority_1.default),
        default: priority_1.default.Default,
    },
}, {
    timestamps: true,
});
var Task = mongoose_1.default.model("Task", TaskSchema);
exports.default = Task;
