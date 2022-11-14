import mongoose from "mongoose";
import HolidayType from "../enums/holidayType";
import convertEnumToArray from "../helpers/enumArray";
import { SickLeaveCategoryWithout } from "./employee";

export interface SettingDocument extends mongoose.Document {
  types: { [key: string]: SickLeaveCategoryWithout };
  startTime: number;
  endTime: number;
}

const SickLeaveCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: convertEnumToArray(HolidayType),
    },
    value: { type: Number, required: true },
  },
  { _id: false }
);

var SettingSchema = new mongoose.Schema(
  {
    types: { type: Map, of: SickLeaveCategorySchema },
    startTime: { type: Number, required: true },
    endTime: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Setting = mongoose.model<SettingDocument>("Setting", SettingSchema);
export default Setting;
