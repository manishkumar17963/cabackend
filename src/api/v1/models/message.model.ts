import mongoose from "mongoose";
import FileType from "../enums/fileType";
import SendBy from "../enums/sendBy";
import convertEnumToArray from "../helpers/enumArray";
export interface MessageInput {
  ownerId: string;
  ownerProfile?: string;
  participants?: string[];

  ownerName: string;
  projectId?: string;
  projectName?: string;
  ownerType: SendBy;
  message?: string;
  conversationId: mongoose.Types.ObjectId;
  fileUri?: string;
  fileName?: string;
  fileDescription?: string;
  seen: Boolean;
  refType?: FileType;
  fileType?: string;
  fileSize?: number;
}
export interface MessageDocument extends mongoose.Document, MessageInput {}

var MessageSchema = new mongoose.Schema(
  {
    ownerId: {
      type: String,
      required: true,
    },
    ownerType: {
      type: String,
      required: true,
      enum: convertEnumToArray(SendBy),
    },
    projectId: String,
    projectName: String,
    ownerProfile: { type: String },
    ownerName: { type: String, required: true },
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
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
    refType: { type: String, enum: convertEnumToArray(FileType) },
    seen: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

MessageSchema.index({ fromId: 1, conversationId: 1, createdAt: 1 });

const Message = mongoose.model<MessageDocument>("Message", MessageSchema);
export default Message;
