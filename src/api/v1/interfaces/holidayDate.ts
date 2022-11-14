import mongoose from "mongoose";
import HolidayStatus from "../enums/holidayStatus";
import HolidayType from "../enums/holidayType";
import { AdminDocument } from "../models/admin";

interface HolidayRequest {
  date: Date;
  status: HolidayStatus;
  approvedBy?: string | AdminDocument;
  reason: string;
  type: string;
  sickId: mongoose.Types.ObjectId;
  holidayType: HolidayType;
  holidayAdded: Boolean;
  removalRequest?: Boolean;
  removalReason?: string;
  denyReason?: string;
}

export default HolidayRequest;
