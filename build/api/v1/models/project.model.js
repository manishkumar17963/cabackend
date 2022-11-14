"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var billingType_1 = __importDefault(require("../enums/billingType"));
var paymentMethod_1 = __importDefault(require("../enums/paymentMethod"));
var paymentStatus_1 = __importDefault(require("../enums/paymentStatus"));
var priority_1 = __importDefault(require("../enums/priority"));
var role_1 = __importDefault(require("../enums/role"));
var taskStatus_1 = __importDefault(require("../enums/taskStatus"));
var enumArray_1 = __importDefault(require("../helpers/enumArray"));
var AssignedEmployeeSchema = new mongoose_1.default.Schema({
    role: {
        type: String,
        enum: enumArray_1.default(role_1.default),
        default: role_1.default.Secondary,
    },
    employeeId: { required: true, type: String },
    taskCount: { default: 0, type: Number },
});
var FileSchema = new mongoose_1.default.Schema({
    fileUri: { type: String, required: true },
    senderId: { type: String || mongoose_1.default.Types.ObjectId, required: true },
    sendBy: { type: String, required: true },
    comment: String,
}, { timestamps: true });
var ProjectSchema = new mongoose_1.default.Schema({
    customerId: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
        ref: "Customer",
    },
    services: [mongoose_1.default.Types.ObjectId],
    primaryEmployee: { type: String },
    quotationId: [mongoose_1.default.Types.ObjectId],
    invoiceId: mongoose_1.default.Types.ObjectId,
    clientApproved: { type: Boolean, required: true, default: false },
    adminApproved: { type: Boolean, required: true, default: false },
    name: { type: String, required: true },
    lastUploaded: { type: Date },
    billingType: {
        type: String,
        required: true,
        default: billingType_1.default.Billable,
        enum: enumArray_1.default(billingType_1.default),
    },
    files: [mongoose_1.default.Types.ObjectId],
    assignedEmployees: [AssignedEmployeeSchema],
    description: String,
    status: {
        type: String,
        enum: enumArray_1.default(taskStatus_1.default),
        default: taskStatus_1.default.Initiated,
    },
    paymentInitiated: Boolean,
    paymentMethod: { enum: enumArray_1.default(paymentMethod_1.default), type: String },
    transactionId: String,
    paymentStatus: { enum: enumArray_1.default(paymentStatus_1.default), type: String },
    expectedPaymentDate: Date,
    actualPaymentDate: Date,
    startDate: { type: Date, default: new Date() },
    expectedEndDate: { type: Date },
    paymentAmount: Number,
    priority: {
        type: String,
        enum: enumArray_1.default(priority_1.default),
        default: priority_1.default.Default,
    },
}, {
    timestamps: true,
});
var Project = mongoose_1.default.model("Project", ProjectSchema);
exports.default = Project;
