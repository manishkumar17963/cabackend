"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var sendBy_1 = __importDefault(require("../enums/sendBy"));
var enumArray_1 = __importDefault(require("../helpers/enumArray"));
var CommentSchema = new mongoose_1.default.Schema({
    senderId: { type: String, required: true },
    sendBy: {
        type: String,
        default: sendBy_1.default.Employee,
        enum: enumArray_1.default(sendBy_1.default),
    },
    parent: { type: Boolean, default: true },
    senderName: { type: String, required: true },
    senderProfile: { type: String },
    taskId: { type: mongoose_1.default.Types.ObjectId, required: true, ref: "Task" },
    threads: [{ type: mongoose_1.default.Types.ObjectId, ref: "Comment" }],
    comment: { type: String, required: true },
}, {
    timestamps: true,
});
var Comment = mongoose_1.default.model("Comment", CommentSchema);
exports.default = Comment;
