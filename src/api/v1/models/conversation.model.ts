import mongoose from "mongoose";
import convertEnumToArray from "../helpers/enumArray";
import SendBy from "../enums/sendBy";
import ConversationType from "../enums/conversationType";

export interface Participant {
  id: string;

  participantType: SendBy;
  participantName: string;
  participantProfile?: string;
}

export interface ConversationInput {
  participants: Participant[];
  projectId?: mongoose.Types.ObjectId;
  _id: mongoose.Types.ObjectId;
  projectName?: string;
  conversationType: ConversationType;
}
//@ts-ignore
export interface ConversationDocument
  extends mongoose.Document,
    ConversationInput {}

const participantSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    participantType: {
      type: String,
      required: true,
      enum: convertEnumToArray(SendBy),
    },
    participantName: {
      type: String,
      required: true,
    },
    participantProfile: {
      type: String,
    },
  },
  { _id: false, timestamps: false }
);

var ConversationSchema = new mongoose.Schema(
  {
    participants: [participantSchema],
    conversationType: {
      type: String,
      required: true,
      enum: convertEnumToArray(ConversationType),
    },
    projectId: {
      type: mongoose.Types.ObjectId,
      required: () => {
        return (
          //@ts-ignore
          this.conversationType == ConversationType.Project ||
          //@ts-ignore
          this.conversationType == ConversationType.Group
        );
      },
    },
    projectName: {
      type: String,
      required: () => {
        return (
          //@ts-ignore
          this.conversationType == ConversationType.Project ||
          //@ts-ignore
          this.conversationType == ConversationType.Group
        );
      },
    },
  },
  {
    timestamps: true,
  }
);

ConversationSchema.index({ "participants.id": 1 });

const Conversation = mongoose.model<ConversationDocument>(
  "Conversation",
  ConversationSchema
);
export default Conversation;
