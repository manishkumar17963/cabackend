import mongoose from "mongoose";

interface Schdule {
  meetingId: mongoose.Types.ObjectId;
  startTime: Date;
  endTime: Date;
}

export default Schdule;
