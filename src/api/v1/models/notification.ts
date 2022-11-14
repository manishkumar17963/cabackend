import mongoose from "mongoose";
import NotificationType from "../enums/notificationType";
import SendBy from "../enums/sendBy";
import convertEnumToArray from "../helpers/enumArray";

export interface NotificationDocument extends mongoose.Document {
  notificationType: NotificationType;
  contentId: mongoose.Types.ObjectId;
  notificationFor: SendBy;
  message?: string;
  userId: mongoose.Types.ObjectId;
  seen: Boolean;
}

var NotificationSchema = new mongoose.Schema(
  {
    contentId: { type: mongoose.Types.ObjectId, required: true },
    notificationFor: {
      type: String,
      enum: convertEnumToArray(SendBy),
      required: true,
    },
    message: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, required: true },
    seen: { type: Boolean, default: false },
    notificationType: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model<NotificationDocument>(
  "Notification",
  NotificationSchema
);
export default Notification;
