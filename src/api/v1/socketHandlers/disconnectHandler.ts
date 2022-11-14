import { Socket } from "socket.io";
import * as serverStore from "../../../socket/serverStore";

const disconnectHandler = (socket: Socket) => {
  serverStore.removeConnectedUser(socket.id);
};

export default disconnectHandler;
