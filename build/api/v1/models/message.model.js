"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var fileType_1 = __importDefault(require("../enums/fileType"));
var sendBy_1 = __importDefault(require("../enums/sendBy"));
var enumArray_1 = __importDefault(require("../helpers/enumArray"));
var MessageSchema = new mongoose_1.default.Schema({
    ownerId: {
        type: String,
        required: true,
    },
    ownerType: {
        type: String,
        required: true,
        enum: enumArray_1.default(sendBy_1.default),
    },
    projectId: String,
    projectName: String,
    ownerProfile: { type: String },
    ownerName: { type: String, required: true },
    conversationId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "Conversation",
    },
    participants: [String],
    message: { type: String, default: "" },
    fileUri: { type: String },
    fileDescription: String,
    fileName: String,
    fileSize: Number,
    fileType: String,
    refType: { type: String, enum: enumArray_1.default(fileType_1.default) },
    seen: { type: Boolean, default: false },
}, {
    timestamps: true,
});
MessageSchema.index({ fromId: 1, conversationId: 1, createdAt: 1 });
var Message = mongoose_1.default.model("Message", MessageSchema);
exports.default = Message;
