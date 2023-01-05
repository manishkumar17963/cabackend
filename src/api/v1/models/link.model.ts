import mongoose from "mongoose";
import SendBy from "../enums/sendBy";
import StateList from "../enums/stateList.enum";
import convertEnumToArray from "../helpers/enumArray";

export enum LinkOwned {
  All = "all",
  Personal = "personal",
}

export interface LinkInput {
  name: string;
  url: string;
  type: LinkOwned;
  ownerId: string;
  ownerType: SendBy;
  hide: boolean;
  sharedTo: string[];
}

export interface LinkDocument extends mongoose.Document, LinkInput {}

const LinkSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    type: {
      type: String,
      default: LinkOwned.All,
      enum: convertEnumToArray(LinkOwned),
    },
    ownerId: {
      type: String,
      required: true,
    },
    ownerType: {
      type: String,
      enum: convertEnumToArray(SendBy),
      default: SendBy.Admin,
    },
    hide: { type: Boolean, default: true },
    sharedTo: [String],
  },
  { timestamps: true }
);

const Link = mongoose.model<LinkDocument>("Link", LinkSchema);
export default Link;
