import mongoose from "mongoose";

export interface RequestDocument extends mongoose.Document {
  name: string;
  email: string;
  phone: string;

  employeeConfirmed: Boolean;
  customerConfirmed: Boolean;
  assignedEmployee: string;
  meetingLink?: string;
  meetingStartTime?: Date;
  meetingEndTime?: Date;
}

var RequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    employeeConfirmed: { type: Boolean, default: false },
    assingedEmployee: { type: String, required: true },
    meetingLink: String,
    meetingStartTime: Date,
    meetingEndTime: Date,
  },
  {
    timestamps: true,
  }
);

const Request = mongoose.model<RequestDocument>("Request", RequestSchema);
export default Request;
