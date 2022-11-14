import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import SendBy from "../api/v1/enums/sendBy";

const connectedUsers: Map<string, { userId: string; userType: SendBy }> =
  new Map();

let io: Server<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  any
> | null = null;

export const setSocketServerInstance = (ioInstance: Server) => {
  io = ioInstance;
};

export const getSocketServerInstance = () => {
  return io;
};

export const addNewConnectedUser = ({
  socketId,
  userId,
  userType,
}: {
  socketId: string;
  userId: string;
  userType: SendBy;
}) => {
  connectedUsers.set(socketId, { userId, userType });
  console.log("new connected users");
  console.log(connectedUsers);
};

export const removeConnectedUser = (socketId: string) => {
  if (connectedUsers.has(socketId)) {
    connectedUsers.delete(socketId);
    console.log("new connected users");
    console.log(connectedUsers);
  }
};

export const getActiveConnections = (userId: string) => {
  const activeConnections: string[] = [];

  connectedUsers.forEach(function (value, key) {
    if (value.userId === userId) {
      activeConnections.push(key);
    }
  });

  return activeConnections;
};

export const getActiveAdmins = () => {
  const activeConnections: string[] = [];

  connectedUsers.forEach(function (value, key) {
    if (value.userType === SendBy.Admin) {
      activeConnections.push(key);
    }
  });

  return activeConnections;
};
