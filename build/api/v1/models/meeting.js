"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetingEmployeeAction = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var meetingMode_1 = __importDefault(require("../enums/meetingMode"));
var enumArray_1 = __importDefault(require("../helpers/enumArray"));
var common_1 = require("./common");
var sendBy_1 = __importDefault(require("../enums/sendBy"));
var meetingStatus_1 = __importDefault(require("../enums/meetingStatus"));
var meetingType_1 = __importDefault(require("../enums/meetingType"));
var conversation_model_1 = require("./conversation.model");
var MeetingEmployeeAction;
(function (MeetingEmployeeAction) {
    MeetingEmployeeAction["Approved"] = "approved";
    MeetingEmployeeAction["Pending"] = "pending";
    MeetingEmployeeAction["Declined"] = "declined";
})(MeetingEmployeeAction = exports.MeetingEmployeeAction || (exports.MeetingEmployeeAction = {}));
var creatorSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    number: { type: String, required: true },
    id: { type: String, required: true },
});
var MeetingSchema = new mongoose_1.default.Schema({
    employeeId: { type: String },
    creatorId: creatorSchema,
    employeeHistory: [
        {
            status: {
                type: String,
                enum: enumArray_1.default(MeetingEmployeeAction),
                default: MeetingEmployeeAction.Pending,
            },
            reason: { type: String },
            employeeId: { type: String },
        },
    ],
    meetingType: {
        default: meetingType_1.default.Project,
        type: String,
        enum: enumArray_1.default(meetingType_1.default),
    },
    projectId: {
        type: mongoose_1.default.Types.ObjectId,
        required: function () {
            //@ts-ignore
            return _this.meetingType == meetingType_1.default.Project;
        },
    },
    customerId: {
        type: mongoose_1.default.Types.ObjectId,
        required: function () {
            return (
            //@ts-ignore
            _this.meetingType == meetingType_1.default.Project &&
                //@ts-ignore
                _this.meetingType == meetingType_1.default.Primary);
        },
    },
    conversationId: {
        type: mongoose_1.default.Types.ObjectId,
        required: function () {
            //@ts-ignore
            return (
            //@ts-ignore
            _this.meetingType == meetingType_1.default.Conversation ||
                //@ts-ignore
                _this.meetingType == meetingType_1.default.Primary);
        },
    },
    participants: {
        type: [conversation_model_1.participantSchema],
        required: function () {
            //@ts-ignore
            return _this.meetingType == meetingType_1.default.Direct;
        },
    },
    requestedBy: {
        type: String,
        enum: enumArray_1.default(sendBy_1.default),
        required: true,
    },
    meetingStatus: {
        type: String,
        enum: enumArray_1.default(meetingStatus_1.default),
        default: meetingStatus_1.default.Pending,
    },
    attendanceGiven: { type: Boolean, default: false },
    employeeConfirmed: { type: Boolean, default: false },
    employeeCompleted: { type: Boolean, default: false },
    customerConfirmed: { type: Boolean, default: false },
    mode: {
        type: String,
        enum: enumArray_1.default(meetingMode_1.default),
        required: true,
    },
    comment: { type: String },
    meetingStartTime: {
        type: Date,
        required: true,
    },
    meetingEndTime: {
        type: Date,
        required: function () {
            //@ts-ignore
            return _this.mode == meetingMode_1.default.Online;
        },
    },
    slotTime: {
        type: Number,
        required: function () {
            //@ts-ignore
            return _this.mode == meetingMode_1.default.Online;
        },
    },
    requestedLocation: {
        type: common_1.PointLocationSchema,
        required: function () {
            //@ts-ignore
            return _this.mode == meetingMode_1.default.Physical;
        },
    },
    meetingStartLocation: {
        type: common_1.PointLocationSchema,
    },
    actualStartTime: {
        type: Date,
    },
    actualEndTime: {
        type: Date,
    },
    meetingEndLocation: {
        type: common_1.PointLocationSchema,
    },
}, {
    timestamps: true,
});
var Meeting = mongoose_1.default.model("Meeting", MeetingSchema);
exports.default = Meeting;
