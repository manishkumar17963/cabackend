import mongoose from "mongoose";

export interface HolidayDocument extends mongoose.Document {
  start: Date;
  end: Date;
  description: string;
  title: string;
  adminId: string;
}

var HolidaySchema = new mongoose.Schema(
  {
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    description: { type: String, default: "" },
    title: { type: String, default: "" },
    adminId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Holiday = mongoose.model<HolidayDocument>("Holiday", HolidaySchema);
export default Holiday;
