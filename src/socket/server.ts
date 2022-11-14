import socketIo, { Server, Socket } from "socket.io";
import directMessageHandler from "../api/v1/socketHandlers/directMessageHandler";
import directChatHistoryHandler from "../api/v1/socketHandlers/directChatHistoryHandler";
import * as core from "express-serve-static-core";
import * as http from "http";
import authSocket from "../api/v1/middleware/authSocket";
import * as serverStore from "./serverStore";
import disconnectHandler from "../api/v1/socketHandlers/disconnectHandler";
import newConnectionHandler from "../api/v1/socketHandlers/newConnectionHandler";
import conversationsHandler from "../api/v1/socketHandlers/conversationsHandler";
import updateUnseenHandler from "../api/v1/socketHandlers/updateUnseen";
import {
  adminSocketHandler,
  initialDataHandler,
} from "../api/v1/socketHandlers/admin";
import {
  employeeSocketHandler,
  initialEmployeeDataHandler,
} from "../api/v1/socketHandlers/employee";
import SendBy from "../api/v1/enums/sendBy";
import {
  customerSocketHandler,
  initialCustomerDataHandler,
} from "../api/v1/socketHandlers/customer";

const registerSocketServer = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  serverStore.setSocketServerInstance(io);

  io.use((socket: Socket, next) => {
    authSocket(socket, next);
  });

  io.on("connection", (socket) => {
    console.log("user connected");
    console.log(socket.id);

    newConnectionHandler(socket);
    //@ts-ignore
    if (socket.type == SendBy.Admin) {
      initialDataHandler(socket);
      //@ts-ignore
    } else if (socket.type == SendBy.Employee) {
      initialEmployeeDataHandler(socket);
    } else {
      initialCustomerDataHandler(socket);
    }

    socket.on("direct-message", (data) => {
      console.log("direct", data);

      directMessageHandler(socket, data);
    });

    adminSocketHandler(socket);

    customerSocketHandler(socket);
    employeeSocketHandler(socket);

    socket.on("direct-chat-history", (data) => {
      directChatHistoryHandler(socket, data);
    });

    socket.on("update-unseen", (data) => {
      updateUnseenHandler(socket, data);
    });

    socket.on("all-conversation", (data) => {
      conversationsHandler(socket);
    });

    socket.on("disconnect", () => {
      disconnectHandler(socket);
    });
  });
};

export default registerSocketServer;
