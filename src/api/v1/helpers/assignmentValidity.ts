import moment from "moment";
import { EmployeeDocument } from "../models/employee";

export default function checkValidity(
  startTime: Date,
  endTime: Date,
  employee: EmployeeDocument
) {
  const invalid = employee.schdule.some((meetingTime) => {
    const firstCheck =
      moment(meetingTime.startTime).isBefore(startTime) &&
      moment(meetingTime.endTime).isAfter(startTime);

    const secondCheck =
      moment(meetingTime.startTime).isBefore(endTime) &&
      moment(meetingTime.endTime).isAfter(endTime);

    const thirdCheck =
      moment(meetingTime.startTime).isAfter(startTime) &&
      moment(meetingTime.startTime).isBefore(endTime);

    return firstCheck || secondCheck || thirdCheck;
  });
  return invalid;
}
