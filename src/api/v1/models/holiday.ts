import mongoose from "mongoose";

export interface HolidayDocument extends mongoose.Document {
  fromDate: Date;
  toDate: Date;
  description: String;
  adminId: string;
}

var HolidaySchema = new mongoose.Schema(
  {
    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },
    description: { type: String, default: "" },
    adminId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Holiday = mongoose.model<HolidayDocument>("Holiday", HolidaySchema);
export default Holiday;
