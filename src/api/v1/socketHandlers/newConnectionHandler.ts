import * as serverStore from "../../../socket/serverStore";
import { Socket } from "socket.io";
import { Document } from "mongoose";

const newConnectionHandler = async (socket: Socket) => {
  //@ts-ignore
  const userDetails = socket.user as Document;

  serverStore.addNewConnectedUser({
    socketId: socket.id,
    userId: userDetails._id.toString(),
    //@ts-ignore
    userType: socket.type,
  });
};

export default newConnectionHandler;
