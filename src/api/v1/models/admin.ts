import mongoose, { CallbackWithoutResultAndOptionalError } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PushSubscription } from "web-push";
import BaseIdentifier from "../interfaces/baseIdentifier";
import SendBy from "../enums/sendBy";
import { NextFunction } from "express";

export interface AdminDocument extends mongoose.Document, BaseIdentifier {
  webToken: [{ token: string; notificationToken: PushSubscription }];
  _id: string;
  username: string;
  profileUri?: string;
  importantFiles: mongoose.Types.ObjectId[];
  forgotOtp?: number;
  generateAuthToken(notificationToken: PushSubscription): Promise<string>;
}

var AdminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    importantFiles: [{ type: mongoose.Types.ObjectId, ref: "Message" }],
    forgotOtp: Number,
    _id: {
      type: String,
      min: 10,
      trim: true,
      alias: "number",
      required: true,
    },
    password: {
      type: String,
      min: 8,
      trim: true,
      validate(value: string) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("password cannot contain password");
        }
      },
      required: true,
    },
    tokens: [
      {
        token: {
          type: String,
        },
      },
    ],
    profileUri: { type: String },
    code: { type: Number, required: true },
    codeValid: { type: Boolean, required: true },
    webToken: [
      {
        token: String,
        notificationToken: {
          endpoint: String,
          keys: {
            p256dh: String,
            auth: String,
          },
        },
      },
    ],
  },
  {
    timestamps: true,
    _id: false,
  }
);

AdminSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 600, partialFilterExpression: { codeValid: true } }
);

AdminSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<Boolean> {
  const admin = this as AdminDocument;
  return bcrypt.compare(candidatePassword, admin.password);
};

AdminSchema.methods.generateAuthToken = async function (
  notificationToken: PushSubscription
): Promise<string> {
  const admin = this as AdminDocument;
  const token = jwt.sign(
    { _id: admin._id, type: SendBy.Admin },
    process.env.JWT_SECRET as string
  );
  const webToken = { token, notificationToken };
  console.log("webToken", webToken);
  admin.tokens.push({ token });

  admin.webToken.push(webToken);

  admin.codeValid = false;
  await admin.save();
  return token;
};

AdminSchema.methods.toJSON = function () {
  const admin = this as AdminDocument;
  const adminObject = admin.toObject() as any;

  delete adminObject.password;
  delete adminObject.tokens;

  return adminObject;
};

AdminSchema.pre(
  "save",
  async function (
    this: AdminDocument,
    next: CallbackWithoutResultAndOptionalError
  ) {
    const admin = this;
    if (admin.isModified("password")) {
      admin.password = await bcrypt.hash(admin.password, 8);
    }
    next();
  }
);

const Admin = mongoose.model<AdminDocument>("Admin", AdminSchema);
export default Admin;
