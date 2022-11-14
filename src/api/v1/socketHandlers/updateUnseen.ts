import mongoose, { Document } from "mongoose";
import { Socket } from "socket.io";

import * as serverStore from "../../../socket/serverStore";
import ConversationType from "../enums/conversationType";
import { findConversation } from "../services/conversation.service";

import { updateAllMessage } from "../services/message.Service";

const updateUnseenHandler = async (
  socket: Socket,
  data: { receiverId: string }
) => {
  try {
    //@ts-ignore
    const userDetails = socket.user as Document;

    const activeReciverConnection = serverStore.getActiveConnections(
      data.receiverId
    );
    if (activeReciverConnection.length != 0) {
      await updateAllMessage(
        { ownerId: data.receiverId, seen: false },
        { $set: { seen: true } },
        {}
      );
      serverStore
        .getSocketServerInstance()
        ?.to(activeReciverConnection)
        .emit("update-unseen", {
          receiverId: userDetails._id,
        });
    }
    const activeSenderConnection = serverStore.getActiveConnections(
      userDetails._id
    );
    if (activeSenderConnection.length != 0) {
      serverStore
        .getSocketServerInstance()
        ?.to(activeSenderConnection)
        .emit("update-unseen-quantity", {
          receiverId: data.receiverId,
        });
    }
  } catch (err) {
    console.log(err);
  }
};

export default updateUnseenHandler;
