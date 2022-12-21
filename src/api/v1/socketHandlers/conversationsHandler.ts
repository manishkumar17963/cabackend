import { Socket } from "socket.io";

import mongoose, { Document } from "mongoose";

import * as serverStore from "../../../socket/serverStore";
import Conversation from "../models/conversation.model";

import ConversationType from "../enums/conversationType";

const conversationsHandler = async (socket: Socket) => {
  try {
    //@ts-ignore
    const userDetails = socket.user as Document;

    const conversations = await Conversation.aggregate([
      {
        $match: {
          "participants.id": userDetails._id.toString(),
        },
      },

      // {
      //   $lookup: {
      //     from: "artists",
      //     let: { artistId: "$receiverId" },
      //     pipeline: [
      //       {
      //         $match: {
      //           $expr: {
      //             $eq: ["$$artistId", "$_id"],
      //           },
      //         },
      //       },
      //       {
      //         $project: {
      //           profileUri: "$basicInfo.profileUri",
      //           username: "$basicInfo.username",
      //           gender: "$basicInfo.gender",
      //         },
      //       },
      //     ],
      //     as: "artist",
      //   },
      // },
      // { $unwind: "$artist" },
      {
        $lookup: {
          from: "messages",
          let: {
            conversationId: "$_id",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$$conversationId", "$conversationId"],
                },
              },
            },
            { $sort: { createdAt: -1 } },
          ],
          as: "messages",
        },
      },

      {
        $addFields: {
          receiverId: {
            $cond: {
              if: {
                $or: [
                  {
                    $eq: [ConversationType.Direct, "$conversationType"],
                  },
                  {
                    $eq: [ConversationType.Primary, "$conversationType"],
                  },
                ],
              },
              then: {
                $cond: {
                  if: {
                    $eq: [
                      userDetails._id?.toString(),
                      { $arrayElemAt: ["$participants.id", 0] },
                    ],
                  },
                  then: { $arrayElemAt: ["$participants.id", 1] },
                  else: { $arrayElemAt: ["$participants.id", 0] },
                },
              },
              else: undefined,
            },
          },

          unseen: {
            $cond: {
              if: {
                $eq: [ConversationType.Direct, "$conversationType"],
              },
              then: {
                $reduce: {
                  input: "$messages",
                  initialValue: 0,
                  in: {
                    $switch: {
                      branches: [
                        {
                          case: {
                            $and: [{ $eq: ["$$this.seen", false] }],
                          },
                          then: {
                            $add: ["$$value", 1],
                          },
                        },
                      ],
                      default: "$$value",
                    },
                  },
                },
              },
              else: 0,
            },
          },

          message: { $arrayElemAt: ["$messages", 0] },
        },
      },
      { $project: { messages: 0 } },
      { $addFields: { lastMessage: "$message.createdAt" } },
      { $sort: { lastMessage: -1 } },
    ]);

    const activeConnections = serverStore.getActiveConnections(
      userDetails._id.toString()
    );
    console.log("userDetails", userDetails._id, activeConnections);
    // console.log("conversations", conversations);
    // serverStore
    //   .getSocketServerInstance()
    //   ?.to(activeConnections)
    socket.emit("all-conversation", conversations);
    // activeConnections.forEach((socketId) => {

    // });
  } catch (err) {
    console.log(err);
  }
};

export default conversationsHandler;
