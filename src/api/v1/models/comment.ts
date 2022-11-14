import mongoose from "mongoose";
import SendBy from "../enums/sendBy";
import convertEnumToArray from "../helpers/enumArray";

export interface CommentInput {
  senderId: string;
  sendBy: SendBy;
  taskId: mongoose.Types.ObjectId;

  comment: string;
  senderProfile?: string;
  senderName: String;
}

export interface CommentDocument extends mongoose.Document, CommentInput {
  threads: (mongoose.Types.ObjectId | CommentDocument)[];
}

var CommentSchema = new mongoose.Schema(
  {
    senderId: { type: String, required: true },
    sendBy: {
      type: String,
      default: SendBy.Employee,
      enum: convertEnumToArray(SendBy),
    },
    parent: { type: Boolean, default: true },
    senderName: { type: String, required: true },
    senderProfile: { type: String },
    taskId: { type: mongoose.Types.ObjectId, required: true, ref: "Task" },
    threads: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model<CommentDocument>("Comment", CommentSchema);
export default Comment;
