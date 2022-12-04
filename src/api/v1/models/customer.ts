import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PushSubscription } from "web-push";
import BaseIdentifier from "../interfaces/baseIdentifier";
import { PointLocationSchema } from "./common";
import PointLocation from "../interfaces/pointLocation";
import convertEnumToArray from "../helpers/enumArray";
import CompanyType from "../enums/companyType";
import SendBy from "../enums/sendBy";

export interface CustomerDocument extends mongoose.Document, BaseIdentifier {
  webToken: [{ token: string; notificationToken: PushSubscription }];
  generateAuthToken(notificationToken: PushSubscription): Promise<string>;
  companyName: string;
  firstname: string;
  importantFiles: mongoose.Types.ObjectId[];
  gstNumber?: string;
  state: string;
  lastname?: string;

  profileUri?: string;
  email: string;
  deviceToken: { token: string; deviceToken: string }[];
  assignedEmployee?: string;
  companyLocation: PointLocation;

  companyType: CompanyType;
}

var CustomerSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    importantFiles: [{ type: mongoose.Types.ObjectId, ref: "Message" }],
    profileUri: String,
    companyType: {
      type: String,
      required: true,
      enum: convertEnumToArray(CompanyType),
    },
    gstNumber: { type: String },
    state: { type: String, required: true },
    lastname: { type: String },
    assignedEmployee: String,
    companyLocation: { type: PointLocationSchema },
    email: { type: String, required: true },
    number: {
      type: String,
      min: 10,
      trim: true,
      unique: true,
      required: true,
    },
    companyName: { type: String, required: true },
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

    code: { type: Number, required: true },
    codeValid: { type: Boolean, required: true },
    deviceToken: [{ token: String, deviceToken: String }],
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
  }
);

CustomerSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 600, partialFilterExpression: { codeValid: true } }
);

CustomerSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<Boolean> {
  const customer = this as CustomerDocument;
  return bcrypt.compare(candidatePassword, customer.password);
};

CustomerSchema.methods.generateAuthToken = async function (
  notificationToken: PushSubscription
): Promise<string> {
  const customer = this as CustomerDocument;
  const token = jwt.sign(
    { _id: customer._id, type: SendBy.Customer },
    process.env.JWT_SECRET as string
  );
  const webToken = { token, notificationToken };
  console.log("webToken", webToken);
  customer.tokens.push({ token });

  customer.webToken.push(webToken);

  customer.codeValid = false;
  await customer.save();
  return token;
};

CustomerSchema.methods.toJSON = function () {
  const customer = this as CustomerDocument;
  const customerObject = customer.toObject() as any;

  delete customerObject.password;
  delete customerObject.tokens;

  return customerObject;
};

CustomerSchema.pre(
  "save",
  async function (
    this: CustomerDocument,
    next: mongoose.CallbackWithoutResultAndOptionalError
  ) {
    const customer = this;
    if (customer.isModified("password")) {
      customer.password = await bcrypt.hash(customer.password, 8);
    }
    next();
  }
);

const Customer = mongoose.model<CustomerDocument>("Customer", CustomerSchema);
export default Customer;
