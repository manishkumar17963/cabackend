import mongoose, { Document } from "mongoose";

import * as serverStore from "../../../../socket/serverStore";
import {
  aggregateMessage,
  updateAllMessage,
} from "../../services/message.Service";

import { Socket } from "socket.io";
import ConversationType from "../../enums/conversationType";

const updateChatHistory = async (
  conversationId: mongoose.Types.ObjectId,
  socket: Socket,

  conversationType: ConversationType,
  receiverId: string | undefined
) => {
  //@ts-ignore
  const userDetails = socket.user as Document;

  if (conversationType == ConversationType.Direct) {
    const activeReciverConnection = serverStore.getActiveConnections(
      receiverId!
    );
    if (activeReciverConnection.length != 0) {
      await updateAllMessage(
        { conversationId, seen: false },
        { $set: { seen: true } },
        {}
      );
      serverStore
        .getSocketServerInstance()
        ?.to(activeReciverConnection)
        .emit("update-unseen", {
          conversationId,
        });
    }
  }

  const messages = await aggregateMessage([
    {
      $match: {
        conversationId,
      },
    },
    { $sort: { createdAt: 1 } },

    {
      $addFields: {
        owned: {
          $cond: {
            if: {
              $eq: [userDetails?._id?.toString(), "$ownerId"],
            },
            then: true,
            else: false,
          },
        },
      },
    },
  ]);
  const activeConnections = serverStore.getActiveConnections(
    userDetails._id.toString()
  );

  activeConnections.forEach((socketId) => {
    serverStore
      .getSocketServerInstance()
      ?.to(socketId)
      .emit("direct-chat-history", {
        messages: messages,
        conversationId,
        receiverId,
        conversationType,
      });
  });
};

export default updateChatHistory;
