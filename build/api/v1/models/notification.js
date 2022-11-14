"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var sendBy_1 = __importDefault(require("../enums/sendBy"));
var enumArray_1 = __importDefault(require("../helpers/enumArray"));
var NotificationSchema = new mongoose_1.default.Schema({
    contentId: { type: mongoose_1.default.Types.ObjectId, required: true },
    notificationFor: {
        type: String,
        enum: enumArray_1.default(sendBy_1.default),
        required: true,
    },
    message: { type: String, required: true },
    userId: { type: mongoose_1.default.Types.ObjectId, required: true },
    seen: { type: Boolean, default: false },
    notificationType: { type: String, required: true },
}, {
    timestamps: true,
});
var Notification = mongoose_1.default.model("Notification", NotificationSchema);
exports.default = Notification;
