import jwt, { decode } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import mongoose, { Document, Model } from "mongoose";
import CustomJwtPayload from "../interfaces/jwtPayload";

import CustomError from "../helpers/customError";
import checkError from "../helpers/checkErrors";
import Admin from "../models/admin";

declare global {
  namespace Express {
    interface Request {
      user?: Document;
      number?: String;
      token?: string;
      id?: string;
      admin?: boolean;
    }
  }
}

const authRequired =
  (model: Model<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req
        .header("Authorization")
        ?.replace("Bearer ", "") as string;

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as CustomJwtPayload;

      const user = await model.findOne({
        _id: decoded._id,

        "tokens.token": token,
      });

      if (!user) {
        throw new CustomError("Bad request", 401, "Please Authenticate first");
      }

      req.token = token;

      req.user = user;
      //@ts-ignore
      req.id = decoded._id;

      // console.log("user", user);
      next();
    } catch (err) {
      checkError(err, res);
    }
  };

export const bodyAuthRequired =
  (model: Model<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.body.Authorization?.replace("Bearer ", "") as string;

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as CustomJwtPayload;

      const user = await model.findOne({
        _id: decoded._id,
        "tokens.token": token,
      });

      if (!user) {
        throw new CustomError("Bad request", 401, "Please Authenticate first");
      }

      req.token = token;

      req.user = user;
      //@ts-ignore
      req.id = mongoose.Types.ObjectId(decoded._id);
      next();
    } catch (err) {
      checkError(err, res);
    }
  };

export default authRequired;
