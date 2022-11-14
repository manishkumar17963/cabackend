import Message, {
  MessageDocument,
  MessageInput,
} from "../models/message.model";
import Conversation, {
  ConversationDocument,
  Participant,
} from "../models/conversation.model";
import updateChatHistory from "./updates/chat";
import { Socket } from "socket.io";
import mongoose from "mongoose";

import {
  getActiveConnections,
  getSocketServerInstance,
} from "../../../socket/serverStore";
import ConversationType from "../enums/conversationType";
import { findConversation } from "../services/conversation.service";
import SendBy from "../enums/sendBy";
import { AdminDocument } from "../models/admin";
import { CustomerDocument } from "../models/customer";
import { EmployeeDocument } from "../models/employee";
import FileType from "../enums/fileType";
import { findCustomer } from "../services/customer";
import { findAdmin } from "../services/admin";
import { findEmployee } from "../services/employee";
import { findProject } from "../services/project.Service";

const directMessageHandler = async (
  socket: Socket,
  data: {
    message: string;
    fileName: string | undefined;
    fileUri: string | undefined;
    fileSize: number | undefined;
    fileType: string | undefined;
    conversationId: string | undefined;
    receiverId: string | undefined;
    receiverType: SendBy | undefined;
    conversationType: ConversationType;
  }
) => {
  try {
    //@ts-ignore
    const { _id, profileUri } = socket.user as
      | AdminDocument
      | CustomerDocument
      | EmployeeDocument;

    let name: string;
    //@ts-ignore
    if (socket.type != SendBy.Customer) {
      //@ts-ignore
      const user = socket.user as EmployeeDocument | AdminDocument;

      name = user.username;
    } else {
      //@ts-ignore
      name = (socket.user as CustomerDocument).companyName;
    }

    const {
      conversationId,
      conversationType,
      message,
      fileUri,
      fileName,
      fileSize,
      fileType,
      receiverId,
      receiverType,
    } = data;

    // find if conversation exist with this two users - if not create new
    let conversation: ConversationDocument | null = null;
    let newConversation = false;
    if (conversationType == ConversationType.Direct) {
      if (conversationId) {
        conversation = await findConversation({
          _id: conversationId,
          "participants.id": _id.toString(),
        });
      }
    } else {
      if (!conversationId) {
        return;
      } else {
        conversation = await findConversation({ _id: conversationId });
        if (!conversation) {
          return;
        }
      }
    }
    if (!conversation) {
      let receiverInput: Participant;
      if (receiverType == SendBy.Customer) {
        const customer = await findCustomer({ _id: receiverId });
        if (!customer) {
          return;
        }
        receiverInput = {
          id: customer._id.toString(),
          //@ts-ignore
          participantType: receiverType,
          participantProfile: customer.profileUri,
          participantName: customer.companyName,
        };
      } else {
        let func;
        if (receiverType == SendBy.Admin) {
          func = findAdmin;
        } else {
          func = findEmployee;
        }
        const cust = await func({ _id: receiverId });
        if (!cust) {
          return;
        }
        receiverInput = {
          id: cust._id.toString(),
          //@ts-ignore
          participantType: receiverType,
          participantProfile: cust.profileUri,
          participantName: cust.username,
        };
      }
      conversation = await Conversation.create({
        participants: [
          {
            id: _id.toString(),
            //@ts-ignore
            participantType: socket.type,
            participantProfile: profileUri,
            participantName: name,
          },
          receiverInput,
        ],
        conversationType: ConversationType.Direct,
      });
      newConversation = true;
    }
    let additional = {};
    if (fileUri && conversation.conversationType == ConversationType.Project) {
      additional = {
        participants: conversation.participants.map((value) => value.id),
        projectId: conversation.projectId,
        projectName: conversation.projectName,
      };
    }
    let messageInput: MessageInput = {
      ownerProfile: profileUri,
      ownerName: name,
      //@ts-ignore
      ownerType: socket.type as SendBy,
      ownerId: _id?.toString(),
      fileType,
      ...additional,
      participants:
        fileUri && conversation.conversationType == ConversationType.Project
          ? conversation.participants.map((value) => value.id)
          : [],
      seen: false,
      message: message,
      fileUri: fileUri,
      fileName: fileName,
      fileSize: fileSize,
      conversationId: conversation._id,
    };

    let newMessage: MessageDocument;
    newMessage = await Message.create(messageInput);
    if (conversation.conversationType == ConversationType.Project && fileUri) {
      const project = await findProject(
        { _id: conversation.projectId },
        { files: 1 }
      );
      if (project) {
        project.files.push(newMessage._id);
        //@ts-ignore
        project.lastUploaded = newMessage.createdAt;
        await project.save();
      }
    }
    conversation!.participants.forEach(async function (
      participant,
      index,
      arr
    ) {
      const activeConnections = getActiveConnections(participant.id);
      let conver: { [key: string]: any } = {};
      activeConnections.forEach((value) => {
        getSocketServerInstance()
          ?.to(value)
          .emit("direct-message", {
            message: newMessage,
            owned: participant.id == _id.toString() ? true : false,
            unseen: participant.id == _id.toString() ? 0 : 1,
            ...(conversationType == ConversationType.Direct ||
            conversationType == ConversationType.Primary
              ? { receiverId: index == 0 ? arr[1].id : arr[0].id }
              : {}),
            receiverType,
            _id: conversation?._id,
            conversationType,
            new: newConversation,
            ...(newConversation
              ? {
                  participants: conversation?.participants,
                }
              : {}),
          });
      });
    });
  } catch (err) {
    console.log(err);
  }
};

export default directMessageHandler;
