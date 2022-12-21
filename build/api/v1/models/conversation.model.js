"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.participantSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var enumArray_1 = __importDefault(require("../helpers/enumArray"));
var sendBy_1 = __importDefault(require("../enums/sendBy"));
var conversationType_1 = __importDefault(require("../enums/conversationType"));
exports.participantSchema = new mongoose_1.default.Schema({
    id: { type: String, required: true },
    participantType: {
        type: String,
        required: true,
        enum: enumArray_1.default(sendBy_1.default),
    },
    participantName: {
        type: String,
        required: true,
    },
    participantProfile: {
        type: String,
    },
}, { _id: false, timestamps: false });
var ConversationSchema = new mongoose_1.default.Schema({
    participants: [exports.participantSchema],
    conversationType: {
        type: String,
        required: true,
        enum: enumArray_1.default(conversationType_1.default),
    },
    projectId: {
        type: mongoose_1.default.Types.ObjectId,
        required: function () {
            return (
            //@ts-ignore
            _this.conversationType == conversationType_1.default.Project ||
                //@ts-ignore
                _this.conversationType == conversationType_1.default.Group);
        },
    },
    projectName: {
        type: String,
        required: function () {
            return (
            //@ts-ignore
            _this.conversationType == conversationType_1.default.Project ||
                //@ts-ignore
                _this.conversationType == conversationType_1.default.Group);
        },
    },
}, {
    timestamps: true,
});
ConversationSchema.index({ "participants.id": 1 });
var Conversation = mongoose_1.default.model("Conversation", ConversationSchema);
exports.default = Conversation;
