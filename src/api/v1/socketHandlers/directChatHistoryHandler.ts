import { Socket } from "socket.io";

import updateChatHistory from "./updates/chat";
import mongoose from "mongoose";

import Conversation from "../models/conversation.model";
import ConversationType from "../enums/conversationType";

const directChatHistoryHandler = async (
  socket: Socket,
  data: {
    conversationId: string;
    conversationType: ConversationType;
    receiverId?: string;
  }
) => {
  try {
    //@ts-ignore
    const { _id } = socket.user as ArtistDocument;
    console.log("data", data);
    const conversation = await Conversation.findOne({
      _id: data.conversationId,
      conversationType: data.conversationType,
    });
    if (conversation) {
      updateChatHistory(
        new mongoose.Types.ObjectId(conversation._id),
        socket,
        data.conversationType,
        data.receiverId
      );
    }
  } catch (err) {
    console.log(err);
  }
};

export default directChatHistoryHandler;
