"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var RequestSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    employeeConfirmed: { type: Boolean, default: false },
    assingedEmployee: { type: String, required: true },
    meetingLink: String,
    meetingStartTime: Date,
    meetingEndTime: Date,
}, {
    timestamps: true,
});
var Request = mongoose_1.default.model("Request", RequestSchema);
exports.default = Request;
