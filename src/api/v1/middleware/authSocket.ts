import jwt, { decode } from "jsonwebtoken";
import { Document, Model } from "mongoose";
import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import SendBy from "../enums/sendBy";
import CustomError from "../helpers/customError";
import CustomJwtPayload from "../interfaces/jwtPayload";
import Admin from "../models/admin";
import Customer from "../models/customer";
import Employee from "../models/employee";

const verifyTokenSocket = async (
  socket: Socket,
  next: (error?: ExtendedError) => void
) => {
  const token = socket.handshake.auth?.token;

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as CustomJwtPayload;
    console.log("decoded", decoded);
    let Collection: Model<any>;
    if (decoded.type == SendBy.Admin) {
      Collection = Admin;
    } else if (decoded.type == SendBy.Employee) {
      Collection = Employee;
    } else {
      Collection = Customer;
    }
    const user = await Collection.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new CustomError("Bad request", 401, "Please Authenticate first");
    }
    //@ts-ignore
    socket.user = user;
    //@ts-ignore
    socket.type = decoded.type;
  } catch (err) {
    const socketError = new Error("NOT_AUTHORIZED");
    return next(socketError);
  }

  next();
};

export default verifyTokenSocket;
