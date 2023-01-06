import { Types } from "aws-sdk/clients/acm";
import moment from "moment";
import mongoose, { ClientSession, mongo } from "mongoose";

import { Socket } from "socket.io";
import {
  getActiveAdmins,
  getActiveConnections,
  getSocketServerInstance,
} from "../../../socket/serverStore";
import { ITimeLog } from "../models/task.model";
import AttendanceType from "../enums/attendanceType";
import ConversationType from "../enums/conversationType";
import HolidayStatus from "../enums/holidayStatus";
import InvoiceType from "../enums/invoiceType";
import PaymentStatus from "../enums/paymentStatus";
import QuotationType from "../enums/quotationType.enum";
import SendBy from "../enums/sendBy";
import TaskStatus from "../enums/taskStatus";
import CustomError from "../helpers/customError";
import Admin, { AdminDocument } from "../models/admin";
import { BranchDocument } from "../models/branch.model";
import Comment from "../models/comment";
import {
  ConversationDocument,
  ConversationInput,
} from "../models/conversation.model";
import {
  EmployeeDocument,
  SickLeave,
  SickLeaveCategoryWithout,
} from "../models/employee";
import { HolidayDocument } from "../models/holiday";

import { InvoiceDocument } from "../models/invoice.model";
import Meeting from "../models/meeting";
import Message from "../models/message.model";
import { ProjectDocument } from "../models/project.model";
import { QuotationDocument } from "../models/quotation.model";
import Task, { TaskDocument } from "../models/task.model";
import { TemplateDocument } from "../models/template.model";
import { aggregateAdmin, findAndUpdateAdmin } from "../services/admin";
import {
  aggregateAttendance,
  createAttendance,
  findAllAttendance,
  findAndUpdateAttendance,
  findAttendance,
} from "../services/attendance";
import {
  aggregateBranch,
  findAllBranch,
  findBranch,
} from "../services/branch.service";
import { aggregateCustomer, findCustomer } from "../services/customer";
import {
  aggregateEmployee,
  findAllEmployee,
  findAndUpdateEmployee,
  findEmployee,
} from "../services/employee";
import { aggregateHoliday, findHoliday } from "../services/holiday";
import { aggregateInvoice } from "../services/invoice.service";
import {
  aggregateMeeting,
  findAndUpdateMeeting,
  findMeeting,
} from "../services/meeting";
import { aggregateMessage } from "../services/message.Service";
import {
  aggregateProject,
  findAndUpdateProject,
  findProject,
} from "../services/project.Service";
import { aggregateQuotation } from "../services/quotation.Service";
import { createSetting, findSetting } from "../services/setting.service";
import { aggregateTask, findAllTask, findTask } from "../services/task";
import { aggregateTemplate } from "../services/template.service";
import MeetingType from "../enums/meetingType";
import ReportView from "../enums/projectReport";
import MeetingStatus from "../enums/meetingStatus";
import { LinkOwned } from "../models/link.model";
import {
  createLink,
  findAllLink,
  findAndDeleteLink,
  findAndUpdateLink,
  findLink,
} from "../services/link.service";

export function adminSocketHandler(socket: Socket) {
  //@ts-ignore
  if (socket.type == SendBy.Admin) {
    socket.on("admin-project", async (data) => {
      await adminProjectHandler(socket, data);
    });

    socket.on("admin-dashboard", async (data) => {
      await dashboardHandler(socket, data);
    });

    socket.on("admin-project-meeting", async (data) => {
      await adminMeetingHandler(socket, data);
    });

    socket.on("admin-task", async (data) => {
      await adminTaskHandler(socket, data);
    });

    socket.on("admin-start-attendance", async (data, callback) => {
      await startAttendanceHandler(socket, data, callback);
    });

    socket.on("add-employee-leave", async (data, callback) => {
      await addSickHandler(socket, data, callback);
    });

    socket.on("approve-attendance", async (data, callback) => {
      await approveAttendanceHandler(socket, data, callback);
    });
    socket.on("deny-attendance", async (data, callback) => {
      await denyAttendanceHandler(socket, data, callback);
    });
    socket.on("approve-leave", async (data, callback) => {
      await approveLeaveHandler(socket, data, callback);
    });

    socket.on("employee-leave", async (data, callback) => {
      await employeeLeaveHandler(socket, data, callback);
    });

    socket.on("time-log", async (data, callback) => {
      await employeeTaskLogHandler(socket, data, callback);
    });

    socket.on("employee-monthly-report", async (data, callback) => {
      await employeeMonthlyReportHandler(socket, data, callback);
    });

    socket.on("deny-leave", async (data, callback) => {
      await denyLeaveHandler(socket, data, callback);
    });

    socket.on("admin-branch", async (data) => {
      await adminBranchHandler(socket);
    });

    socket.on("employee-task", async (data) => {
      await employeeTasksHandler(socket, data);
    });

    socket.on("admin-task-detail", async (data) => {
      await adminTaskDetailHandler(socket, data);
    });

    socket.on("admin-employee", async (data) => {
      await adminEmployeeHandler(socket);
    });

    socket.on("admin-employee-detail", async (data) => {
      await employeeDetailHandler(socket, data);
    });

    socket.on("admin-customer", async (data) => {
      await adminCustomerHandler(socket);
    });

    socket.on("admin-search-customer", async (data) => {
      await searchCustomerHandler(socket);
    });

    socket.on("admin-search-employee", async (data) => {
      await searchEmployeeHandler(socket);
    });

    socket.on("admin-invoice", async (data) => {
      await adminInvoiceHandler(socket, data);
    });

    socket.on("admin-verify-kyc", async (data, callback) => {
      await verifyKycHandler(socket, data, callback);
    });

    socket.on("admin-daily-report", async (data, callback) => {
      await employeeDailyReport(socket, data, callback);
    });

    socket.on("admin-project-report", async (data, callback) => {
      await adminProjectReport(socket, data, callback);
    });

    socket.on("employee-srisudha", async (data) => {
      await employeeSrisudhaHandler(socket, data);
    });

    socket.on("assign-employee-meeting", async (data) => {
      await assignEmployeeMeeting(socket, data);
    });

    socket.on("admin-save-setting", async (data) => {
      await adminSaveSettingHandler(socket, data);
    });

    socket.on("admin-storage", async (data) => {
      console.log("storage emit ");
      await employeeStorageHandler(socket, data);
    });

    socket.on("admin-storage-project", async (data) => {
      await storageProjectHandler(socket, data);
    });
    socket.on("admin-storage-project-image", async (data) => {
      await storageProjectImageHandler(socket, data);
    });

    socket.on("admin-storage-important-image", async (data) => {
      await storageImportantImageHandler(socket, data);
    });

    socket.on("admin-add-important-image", async (data) => {
      await addImportantHandler(socket, data);
    });
    socket.on("admin-remove-important-image", async (data) => {
      await removeImportantHandler(socket, data);
    });

    socket.on("admin-date-meeting", async (data, callback) => {
      await adminMeetingDateHandler(socket, data, callback);
    });
    socket.on("admin-date-leave", async (data, callback) => {
      await adminLeaveDateHandler(socket, data, callback);
    });

    socket.on("admin-add-link", async (data, callback) => {
      await adminAddLink(socket, data, callback);
    });

    socket.on("admin-toggle-link", async (data, callback) => {
      await adminToggleLink(socket, data, callback);
    });

    socket.on("admin-delete-link", async (data, callback) => {
      await adminDeleteLink(socket, data, callback);
    });

    socket.on("admin-update-link", async (data, callback) => {
      await updateLinkHandler(socket, data, callback);
    });

    socket.on("admin-date-attendance", async (data, callback) => {
      await adminAttendanceDateHandler(socket, data, callback);
    });
    socket.on("admin-setting", async (data) => {
      await adminGetSettingHandler(socket, data);
    });
    socket.on("sick-leave", async (data) => {
      await sickLeaveHandler(socket, data);
    });
    socket.on("employee-attendance", async (data) => {
      await adminEmployeeAttendanceHandler(socket, data);
    });

    socket.on("admin-image-detail", async (data) => {
      await imageDetailHandler(socket, data);
    });

    socket.on("admin-holiday", async (data) => {
      await adminHolidayHandler(socket, data);
    });

    socket.on("admin-complete-meeting", async (data, callback) => {
      await completeMeetingHandler(socket, data, callback);
    });

    socket.on("admin-cancel-meeting", async (data, callback) => {
      await cancelMeetingHandler(socket, data, callback);
    });
  }
}

export async function adminAddLink(
  socket: Socket,
  data: { name: string; url: string; type: LinkOwned; sharedTo: string[] },
  callback: (data: any) => void
) {
  try {
    //@ts-ignore
    const user = socket.user as AdminDocument;
    const link = await createLink({
      ...data,
      ownerId: user._id,
      ownerType: SendBy.Admin,
      hide: false,
    });
    // console.log("timeLogs", timeLogs);
    callback({ status: 200, data: link });
  } catch (err: any) {
    callback({ status: 500, message: err.message });
  }
}

export async function adminToggleLink(
  socket: Socket,
  data: { linkId: mongoose.Types.ObjectId },
  callback: (data: any) => void
) {
  try {
    //@ts-ignore
    const user = socket.user as AdminDocument;
    const link = await findLink({ ownerId: user._id, _id: data.linkId });
    if (!link) {
      throw new CustomError("Bad request", 404, "No such Link found");
    }
    // console.log("timeLogs", timeLogs);
    link.hide = !link.hide;
    await link.save();
    callback({
      status: 200,
      data: `link successfully ${link.hide ? "hidden" : "showed"}`,
    });
  } catch (err: any) {
    callback({ status: 400, message: err?.message });
  }
}

export async function adminDeleteLink(
  socket: Socket,
  data: { linkId: mongoose.Types.ObjectId },
  callback: (data: any) => void
) {
  try {
    //@ts-ignore
    const user = socket.user as AdminDocument;
    const link = await findAndDeleteLink({
      $or: [{ type: LinkOwned.All }, { ownerId: user._id }],
      _id: data.linkId,
    });
    if (!link) {
      throw new CustomError("Bad request", 404, "No such Link found");
    }

    callback({
      status: 200,
      data: `link successfully deleted`,
    });
  } catch (err: any) {
    callback({ status: 400, message: err?.message });
  }
}

export async function updateLinkHandler(
  socket: Socket,
  data: {
    linkId: mongoose.Types.ObjectId;
    url: string;
    sharedTo: string[];
    name: string;
  },
  callback: (data: any) => void
) {
  try {
    //@ts-ignore
    const user = socket.user as AdminDocument;
    const link = await findAndUpdateLink(
      {
        ownerId: user._id,
        _id: data.linkId,
      },
      { $set: { name: data.name, url: data.url, sharedTo: data.sharedTo } },
      { new: true }
    );
    if (!link) {
      throw new CustomError("Bad request", 404, "No such Link found");
    }

    callback({
      status: 200,
      data: link,
    });
  } catch (err: any) {
    callback({ status: 400, message: err?.message });
  }
}

export async function employeeDailyReport(
  socket: Socket,
  data: { date: Date; employeeId: string },
  callback: (data: any) => void
) {
  try {
    const date = moment(data.date).startOf("day");
    console.log("data", data.date);
    const timeLogs = await aggregateTask([
      {
        $match: {
          // createdAt: { $lte: date.toDate() },
          "timeLog.employeeId": data.employeeId,
        },
      },
      { $unwind: "$timeLog" },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ taskId: "$_id", taskName: "$name" }, "$timeLog"],
          },
        },
      },
      {
        $match: {
          employeeId: data.employeeId,
          $or: [
            {
              endTime: {
                $gte: date.toDate(),
                $lt: moment(date).add(1, "day").toDate(),
              },
            },
            { endTime: { $exists: false } },
          ],
        },
      },
    ]);
    // console.log("timeLogs", timeLogs);
    callback({ status: 200, data: timeLogs });
  } catch (err) {
    console.log(err);
  }
}

export async function cancelMeetingHandler(
  socket: Socket,
  data: { meetingId: string },
  callback: (data: any) => void
) {
  try {
    const meeting = await findMeeting({ _id: data.meetingId });
    if (!meeting) {
      throw new CustomError("Bad Request", 404, "No such meeting found");
    } else {
      if (meeting.meetingStatus == MeetingStatus.Completed) {
        throw new CustomError("Bad Request", 404, "Meeting Already completed");
      } else {
        meeting.meetingStatus = MeetingStatus.Declined;
        await meeting.save();
      }
    }
    callback({ status: 200, message: "Meeting successfully cancelled" });
  } catch (err: any) {
    callback({ status: 400, message: err?.message });
  }
}

export async function completeMeetingHandler(
  socket: Socket,
  data: { meetingId: string },
  callback: (data: any) => void
) {
  try {
    const meeting = await findMeeting({ _id: data.meetingId });
    if (!meeting) {
      throw new CustomError("Bad Request", 404, "No such meeting found");
    } else {
      if (meeting.meetingStatus == MeetingStatus.Declined) {
        throw new CustomError("Bad Request", 404, "Meeting Already Declined");
      } else {
        meeting.meetingStatus = MeetingStatus.Completed;
        await meeting.save();
      }
    }
    callback({ status: 200, message: "Meeting successfully Completed" });
  } catch (err: any) {
    callback({ status: 400, message: err?.message });
  }
}

export async function adminProjectReport(
  socket: Socket,
  data: { view: ReportView; projectId: mongoose.Types.ObjectId },
  callback: (data: any) => void
) {
  try {
    console.log("data", data);
    if (data.view == ReportView.Employee) {
      const value = await aggregateTask([
        { $match: { projectId: new mongoose.Types.ObjectId(data.projectId) } },
        { $unwind: "$timeLog" },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [{ taskId: "$_id" }, "$timeLog"],
            },
          },
        },
        { $group: { _id: "$employeeId", timeLogs: { $push: "$$ROOT" } } },
        {
          $lookup: {
            from: "employees",
            let: { employeeId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$employeeId"],
                  },
                },
              },
              {
                $project: {
                  _id: 1,
                  username: 1,
                  profileUri: 1,
                  number: 1,
                },
              },
            ],
            as: "employee",
          },
        },
        { $unwind: "$employee" },
      ]);
      console.log("response", value);
      callback({ status: 200, data: value });
    } else {
      const tasks = await aggregateTask([
        {
          $match: {
            projectId: new mongoose.Types.ObjectId(data.projectId),
          },
        },
        { $unwind: "$timeLog" },
        {
          $lookup: {
            from: "employees",
            let: { employeeId: "$timeLog.employeeId" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$employeeId"],
                  },
                },
              },
              {
                $project: {
                  _id: 1,
                  username: 1,
                  profileUri: 1,
                  number: 1,
                },
              },
            ],
            as: "employee",
          },
        },
        { $unwind: "$employee" },
        { $addFields: { "timeLog.employee": "$employee" } },
        {
          $group: {
            _id: { id: "$_id", name: "$name", status: "$status" },

            timeLogs: { $push: "$timeLog" },
          },
        },
      ]);
      console.log("tasks", JSON.stringify(tasks[0].timeLogs));
      callback({ status: 200, data: tasks });
    }
  } catch (err) {
    console.log("mes", err);
    //@ts-ignore
    callback({ status: 400, message: err.message });
  }
}

export async function verifyKycHandler(
  socket: Socket,
  data: { customerId: string },
  callback: (data: any) => void
) {
  try {
    const customer = await findCustomer({ _id: data.customerId });
    if (!customer || !customer?.kycDetails) {
      throw new CustomError(
        "Bad Request",
        404,
        "customer didnot submit any kyc details"
      );
    }
    customer.kycVerified = true;
    await customer.save();
    const connection = getActiveConnections(data.customerId);
    getSocketServerInstance()?.to(connection).emit("kyc-verify");
    callback({ status: 200, message: "Kyc successfully verified" });
  } catch (err) {
    //@ts-ignore
    callback({ status: 400, message: err.message });
  }
}

export async function employeeMonthlyReportHandler(
  socket: Socket,
  data: { date: Date; employeeId: string },
  callback: (data: any) => void
) {
  try {
    console.log("data", data.date, moment(data.date).startOf("month"));
    const date = moment(data.date).startOf("month");
    const employee = await findEmployee({ _id: data.employeeId });
    if (!employee) {
      throw new CustomError("Bad Request", 404, "No such employee found");
    }
    const query = {
      date: { $gte: date.toDate(), $lt: moment(date).add(1, "month").toDate() },
    };
    const attendances = await findAllAttendance({
      ...query,
    });
    const markAttendance = await findAllAttendance(
      {
        ...query,
        attendanceType: AttendanceType.Normal,
        "attendances.employeeId": data.employeeId,
      },
      { date: 1, attendanceType: 1, "attendances.$": 1 }
    );

    const holidays = employee.holidayRequest.filter((value) => {
      if (
        moment(value.date).isSameOrAfter(date) &&
        moment(value.date).isBefore(moment(date).add(1, "month")) &&
        value.status == HolidayStatus.Approved
      ) {
        return value;
      }
    });

    const sickLeave = employee.sickLeave.find((value, index) => {
      if (
        moment(value.date)
          .startOf("month")
          .isSameOrBefore(moment(data.date).startOf("month"))
      ) {
        return true;
      } else {
        return false;
      }
    });
    const hours: ITimeLog[] = await aggregateTask([
      { $unwind: "$timeLog" },
      { $replaceRoot: { newRoot: "$timeLog" } },

      {
        $match: {
          $or: [
            {
              endTime: {
                $gte: date.toDate(),
                $lt: moment(date).add(1, "month").toDate(),
              },
            },
            { endTime: { $exists: false } },
          ],
          employeeId: data.employeeId,
        },
      },
    ]);
    const seconds = hours.reduce((total, value) => {
      if (date.isAfter(moment(value.startTime))) {
        return (
          total +
          moment(value.endTime ?? moment()).diff(moment(date), "seconds")
        );
      } else {
        console.log("are you there");
        return (
          total +
          moment(value.endTime ?? moment()).diff(
            moment(value.startTime),
            "seconds"
          )
        );
      }
    }, 0);

    callback({
      status: 200,
      data: { sickLeave, holidays, attendances, markAttendance, seconds },
    });
  } catch (err) {
    //@ts-ignore
    callback({ status: 400, message: err.message });
  }
}

export async function approveLeaveHandler(
  socket: Socket,
  data: { employeeId: string; holidayId: string },
  callback: (data: any) => void
) {
  var session: ClientSession = await mongoose.startSession();
  session.startTransaction();
  try {
    //@ts-ignore
    const admin = socket.user! as AdminDocument;

    const employee = await findAndUpdateEmployee(
      { _id: data.employeeId, "holidayRequest._id": data.holidayId },
      {
        $set: {
          "holidayRequest.$.status": HolidayStatus.Approved,
          "holidayRequest.$.approvedBy": admin._id,
        },
      },
      {
        projection: { "holidayRequest.$": 1, sickLeave: 1, username: 1 },
        session,
      }
    );

    if (!employee) {
      throw new CustomError(
        "Bad Request",
        400,
        "No such holiday found for this employee"
      );
    }
    if (employee.holidayRequest[0].status == HolidayStatus.Approved) {
      throw new CustomError("Bad Request", 400, "Leave already approved");
    }
    if (moment(employee.holidayRequest[0].date).isBefore(moment())) {
      throw new CustomError("Bad Request", 400, "date already passed");
    }

    const index = employee.sickLeave.findIndex((value, index) => {
      if (
        moment(value.date)
          .startOf("month")
          .isSameOrBefore(
            moment(employee.holidayRequest[0].date).startOf("month")
          )
      ) {
        return true;
      } else {
        return false;
      }
    });
    if (index == -1) {
      throw new CustomError("Bad Request", 400, "No such type of leave found");
    }

    //@ts-ignore
    const types = Object.fromEntries(employee.sickLeave[index].types);
    const employeeHoliday = await findEmployee(
      { _id: data.employeeId },
      { holidayRequest: 1 }
    );
    const totalLeaveTaken = employeeHoliday!.holidayRequest.filter(
      (value) =>
        value.sickId.equals(employee.holidayRequest[0].sickId) &&
        value.type == employee.holidayRequest[0].type &&
        value.status == HolidayStatus.Approved
    );
    if (
      types[employee.holidayRequest[0].type].value - totalLeaveTaken.length <=
      0
    ) {
      throw new CustomError("Bad Request", 400, "No remaining leave found");
    }

    // employee.sickLeave = [
    //   ...employee.sickLeave.slice(0, index),
    //   {
    //     date: employee.sickLeave[index].date,
    //     types: {
    //       ...types,
    //       [employee.holidayRequest[0].type]: {
    //         value: types[employee.holidayRequest[0].type].value,
    //         name: types[employee.holidayRequest[0].type].name,
    //         type: types[employee.holidayRequest[0].type].type,
    //         completed: types[employee.holidayRequest[0].type].completed + 1,
    //       },
    //     },
    //   },
    //   ...employee.sickLeave.slice(index + 1),
    // ];

    // await employee.save();
    await session.commitTransaction();
    callback({
      status: 200,
      message: `holiday of employee ${employee.username} is approved`,
    });
  } catch (error) {
    console.log("errr", error);
    await session.abortTransaction();
    //@ts-ignore
    callback({ status: 400, message: error.message });
  }
}

export async function denyLeaveHandler(
  socket: Socket,
  data: { employeeId: string; holidayId: string; denyReason: string },
  callback: (data: any) => void
) {
  var session: ClientSession = await mongoose.startSession();
  session.startTransaction();
  try {
    //@ts-ignore
    const admin = socket.user! as AdminDocument;

    const employee = await findAndUpdateEmployee(
      { _id: data.employeeId, "holidayRequest._id": data.holidayId },
      {
        $set: {
          "holidayRequest.$.status": HolidayStatus.Denied,
          "holidayRequest.$.denyReason": data.denyReason,
        },
      },
      {
        projection: { "holidayRequest.$": 1, sickLeave: 1, username: 1 },
        session,
      }
    );
    if (!employee) {
      throw new CustomError(
        "Bad Request",
        400,
        "No such holiday found for this employee"
      );
    }
    if (employee.holidayRequest[0].status == HolidayStatus.Denied) {
      throw new CustomError("Bad Request", 400, "Leave already denied");
    }
    if (moment(employee.holidayRequest[0].date).isBefore(moment())) {
      throw new CustomError("Bad Request", 400, "date already passed");
    }

    await session.commitTransaction();
    callback({
      status: 200,
      message: `holiday of employee ${employee.username} is denied`,
    });
  } catch (error) {
    console.log("errr", error);
    await session.abortTransaction();
    //@ts-ignore
    callback({ status: 400, message: error.message });
  }
}

export async function addSickHandler(
  socket: Socket,
  data: { employeeId: string; sickLeave: SickLeave },
  callback: (data: any) => void
) {
  try {
    const employee = await findEmployee(
      { _id: data.employeeId },
      { sickLeave: 1 }
    );
    if (!employee) {
      throw new CustomError("Bad Request", 400, "No such employee found");
    }

    const lastLeave = employee?.sickLeave?.[0];
    console.log(
      "data",
      JSON.stringify(data),
      lastLeave?.date,
      moment(data.sickLeave.date).startOf("month").toDate()
    );
    if (lastLeave) {
      if (
        moment(data.sickLeave.date)
          .startOf("month")
          .isBefore(moment(lastLeave.date).add(1, "months")) ||
        moment(data.sickLeave.date)
          .startOf("month")
          .isBefore(moment().startOf("month"))
      ) {
        throw new CustomError(
          "Bad Request",
          400,
          "This month is already added or passed"
        );
      } else {
        employee.sickLeave = [data.sickLeave, ...employee.sickLeave];
      }
    } else {
      if (
        moment(data.sickLeave.date)
          .startOf("month")
          .isBefore(moment().startOf("month"))
      ) {
        throw new CustomError(
          "Bad Request",
          400,
          "This month is already added or passed"
        );
      } else {
        employee.sickLeave = [data.sickLeave];
      }
    }
    await employee.save();
    callback({ status: 200, message: "Sickleave successfully added" });
  } catch (err) {
    console.log("error", err);
    //@ts-ignore
    callback({ status: 400, message: err.message });
  }
}

export async function employeeTasksHandler(
  socket: Socket,
  data: { employeeId: string }
) {
  try {
    const tasks = await findAllTask({ assignedEmployee: data.employeeId });
    socket.emit("employee-task-result", tasks);
  } catch (err) {}
}

export async function approveAttendanceHandler(
  socket: Socket,
  data: { employeeId: string; attendanceId: string },
  callback: (data: any) => void
) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const attendance = await findAndUpdateAttendance(
      { _id: data.attendanceId, "attendance.employeeId": data.employeeId },
      { $set: { "attendance.$.approved": HolidayStatus.Approved } },
      { session }
    );
    if (!attendance) {
      throw new CustomError("Bad Request", 400, "NO such attendance found");
    }
    if (attendance.attendanceType != AttendanceType.Normal) {
      throw new CustomError("Bad Request", 400, "Oops its a holiday");
    }
    await session.commitTransaction();
    callback({ status: 200, message: "Attendance successfully approved" });
    return;
  } catch (err) {
    await session.abortTransaction();
    //@ts-ignore
    callback({ status: 400, message: err.message });
  }
}

export async function adminBranchHandler(socket: Socket) {
  try {
    const branches = await findAllBranch({});
    socket.emit("admin-branch-result", branches);
  } catch (err) {}
}
export async function denyAttendanceHandler(
  socket: Socket,
  data: { employeeId: string; attendanceId: string },
  callback: (data: any) => void
) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const attendance = await findAndUpdateAttendance(
      { _id: data.attendanceId, "attendance.employeeId": data.employeeId },
      { $set: { "attendance.$.approved": HolidayStatus.Denied } },
      { session }
    );
    if (!attendance) {
      throw new CustomError("Bad Request", 400, "NO such attendance found");
    }
    if (attendance.attendanceType != AttendanceType.Normal) {
      throw new CustomError("Bad Request", 400, "Oops its a holiday");
    }
    await session.commitTransaction();
    callback({ status: 200, message: "Attendance successfully denied" });
    return;
  } catch (err) {
    await session.abortTransaction();
    //@ts-ignore
    callback({ status: 400, message: err.message });
  }
}
export async function sickLeaveHandler(
  socket: Socket,
  data: { employeeId: string }
) {
  try {
    //@ts-ignore

    const employee = await findEmployee({ _id: data.employeeId });
    if (employee) {
      socket.emit("sick-leave-result", {
        sickLeave: employee.sickLeave.map((value) => {
          //@ts-ignore
          return { ...value.toJSON(), types: Object.fromEntries(value.types) };
        }),
        events: employee.holidayRequest.map((value) => ({
          //@ts-ignore
          ...value.toJSON(),
          title: value.reason,
          start: moment(value.date),
          end: moment(value.date).add(1, "day"),
        })),
      });
    }
  } catch (err) {
    console.log("err", err);
  }
}

async function adminEmployeeAttendanceHandler(
  socket: Socket,
  data: {
    employeeId: string;
  }
) {
  try {
    const attendances = await findAllAttendance(
      {},
      {
        attendance: { $elemMatch: { employeeId: data.employeeId } },
        date: 1,
        open: 1,
        attendanceType: 1,
      }
    );
    // const employee = await findEmployee(
    //   { _id: data.employeeId },
    //   { holidayRequest: 1 }
    // );
    // let holiday: HolidayRequest[] = [];
    // if (!employee) {
    //   return;
    // } else {
    //   holiday = employee.holidayRequest;
    // }
    // console.log("attendance", attendances);
    socket.emit("employee-attendance-result", attendances);
  } catch (err) {
    console.log("error", err);
  }
}

async function adminSaveSettingHandler(
  socket: Socket,
  data: {
    types: { [key: string]: SickLeaveCategoryWithout };
    startTime: string;
    endTime: string;
  }
) {
  try {
    //@ts-ignore
    const user = socket.user as AdminDocument;
    console.log("data", data);
    let setting = await findSetting({});
    if (!setting) {
      setting = await createSetting(data);
    } else {
      setting.types = data.types;
      await setting.save();
    }
    console.log("setting", setting);
  } catch (err) {
    console.log("error", err);
  }
}

async function adminGetSettingHandler(
  socket: Socket,
  data: {
    types: { [key: string]: SickLeaveCategoryWithout };
    startTime: string;
    endTime: string;
  }
) {
  try {
    //@ts-ignore
    const user = socket.user as AdminDocument;
    console.log("data", data);
    let setting = await findSetting({});

    socket.emit("admin-setting-result", setting ?? {});
  } catch (err) {
    console.log("error", err);
  }
}

async function adminMeetingDateHandler(
  socket: Socket,
  data: { date: string; employeeId?: string },
  callback: (data: any) => void
) {
  try {
    console.log("meeting", data.date, moment(data.date));
    //@ts-ignore
    const user = socket.user as AdminDocument;

    const match: { [key: string]: string } = {};
    if (data.employeeId) {
      match["employeeId"] = data.employeeId;
    }
    const meetings = await aggregateMeeting([
      {
        $match: {
          $or: [
            { "participants.id": user._id },
            {
              meetingType: {
                $in: [
                  MeetingType.Conversation,
                  MeetingType.Primary,
                  MeetingType.Project,
                ],
              },
            },
          ],
          meetingStartTime: {
            $gte: moment(data.date).toDate(),
            $lt: moment(data.date).add(1, "day").toDate(),
          },
        },
      },
      { $sort: { createdAt: -1 } },
      {
        $lookup: {
          from: "employees",
          let: { employeeId: "$employeeId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$employeeId"],
                },
              },
            },
            {
              $project: {
                _id: 1,
                username: 1,
                profileUri: 1,
                number: 1,
              },
            },
          ],
          as: "employee",
        },
      },
      {
        $lookup: {
          from: "customers",
          let: { customerId: "$customerId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$customerId"],
                },
              },
            },
            {
              $project: {
                _id: 1,
                username: 1,
                companyName: 1,
                number: 1,
                profileUri: 1,
              },
            },
          ],
          as: "customer",
        },
      },
      {
        $lookup: {
          from: "conversations",
          let: { conversationId: "$conversationId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$conversationId"],
                },
              },
            },
            {
              $project: {
                participants: 1,
              },
            },
          ],
          as: "conversation",
        },
      },
      {
        $unwind: {
          path: "$conversation",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          participants: {
            $cond: {
              if: {
                $or: [
                  { $eq: [MeetingType.Conversation, "$meetingType"] },
                  { $eq: [MeetingType.Primary, "$meetingType"] },
                ],
              },
              then: "$conversation.participants",
              else: "$participants",
            },
          },
        },
      },
    ]);
    console.log("meetings", meetings);
    callback({ status: 200, data: meetings });
  } catch (err) {}
}

async function adminLeaveDateHandler(
  socket: Socket,
  data: { date: string },
  callback: (data: any) => void
) {
  try {
    //@ts-ignore
    const user = socket.user as AdminDocument;
    console.log("date", data, moment(data.date).startOf("day").toDate());
    const employees = await findAllEmployee(
      {
        "holidayRequest.date": moment(data.date).startOf("day").toDate(),
      },
      { "holidayRequest.$": 1, profileUri: 1, username: 1, number: 1, email: 1 }
    );

    console.log("leaves", employees);
    callback({ status: 200, data: employees });
  } catch (err) {
    console.log("error", err);
  }
}

async function adminAttendanceDateHandler(
  socket: Socket,
  data: { date: string },
  callback: (data: any) => void
) {
  try {
    //@ts-ignore
    const user = socket.user as AdminDocument;
    console.log("date", data, moment(data.date).startOf("day").toDate());
    const match: { [key: string]: string } = {};

    const meetings = await aggregateAttendance([
      {
        $match: {
          date: moment(data.date).startOf("day").toDate(),
        },
      },
      { $unwind: "$attendance" },
      {
        $lookup: {
          from: "employees",
          let: { employeeId: "$attendance.employeeId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$employeeId"],
                },
              },
            },
            {
              $project: {
                _id: 1,
                username: 1,
                profileUri: 1,
                number: 1,
              },
            },
          ],
          as: "employee",
        },
      },
    ]);
    callback({ status: 200, data: meetings });
  } catch (err) {
    console.log("error", err);
  }
}

async function employeeDetailHandler(
  socket: Socket,
  data: { employeeId: string }
) {
  try {
    const employee = await findEmployee({ _id: data.employeeId });
    console.log("employee", employee);
    socket.emit("admin-employee-detail-result", employee);
  } catch (err) {
    console.log("error", err);
  }
}

async function dashboardHandler(socket: Socket, data: any) {
  try {
    //@ts-ignore
    const user = socket.user as CustomerDocument;
    const links = await findAllLink({
      $or: [{ ownerId: user._id }],
    });
    const allProjects = await aggregateProject([
      { $group: { _id: "$status", count: { $count: {} } } },
    ]);
    const projects: { [key: string]: number } = {};
    allProjects.forEach((value) => {
      projects[value._id] = value.count;
    });

    const invoice = await aggregateInvoice([
      { $group: { _id: "$paymentStatus", count: { $count: {} } } },
    ]);
    const invoiceObject: { [key: string]: number } = {};
    invoice.forEach((value) => {
      invoiceObject[value._id] = value.count;
    });
    const quotation = await aggregateQuotation([
      {
        $match: { quotationType: QuotationType.Current },
      },
      { $group: { _id: "$approved", count: { $count: {} } } },
    ]);
    const quotationObject: { [key: string]: number } = {};
    quotation.forEach((value) => {
      quotationObject[value._id ? "approved" : "unapproved"] = value.count;
    });

    const meetings = await Meeting.find({
      meetingStartTime: {
        $gte: moment().startOf("day").toDate(),
        $lt: moment().startOf("day").add(1, "day").toDate(),
      },
    }).sort({ meetingStartTime: 1 });

    const attendance = await findAttendance({
      date: moment().startOf("day").toDate(),
    });
    const employees = await findAllEmployee(
      {
        holidayRequest: {
          $elemMatch: {
            date: moment().startOf("day").toDate(),
          },
        },
      },
      { username: 1, profileUri: 1, number: 1, "holidayRequest.$": 1 }
    );

    socket.emit("admin-dashboard-result", {
      meetings,
      employees,
      links,
      attendance,
      quotation: quotationObject,

      invoice: invoiceObject,
      projects: projects,
    });
  } catch (err) {
    console.log("err", err);
  }
}

export async function startAttendanceHandler(
  socket: Socket,
  data: { type: AttendanceType },
  callback: (data: any) => void
) {
  try {
    let attendance = await findAttendance({
      date: moment().startOf("day"),
    });
    if (attendance) {
      if (attendance.attendanceType != AttendanceType.Normal) {
        return callback?.({
          status: 400,
          message: "This day is declared as holiday",
        });
      } else {
        return callback?.({
          status: 400,
          message: "Attendance already started",
        });
      }
    }
    console.log(
      "hello date",
      moment().startOf("day").toDate(),
      moment().toDate(),
      moment().utcOffset()
    );
    await createAttendance({
      date: moment().startOf("day").toDate(),
      open: true,
      attendanceType: data.type,
      attendance: [],
    });
    return callback?.({
      status: 200,
      message: "Attendance successfully started",
    });
  } catch (err) {
    console.log(err);
  }
}

export async function assignEmployeeMeeting(
  socket: Socket,
  data: { meetingId: string; employeeId: string }
) {
  try {
    //@ts-ignore
    const user = socket.user as AdminDocument;
    const meeting = await findMeeting({ _id: data.meetingId });
    if (!meeting) {
      return;
    }
    const project = await findProject({ _id: meeting.projectId });
    if (!project) {
      return;
    }
    if (!project) {
      return;
    }
    console.log("data", data);

    meeting.employeeId = data.employeeId;
    await meeting.save();
  } catch (err) {}
}

export async function employeeSrisudhaHandler(socket: Socket, data: any) {
  try {
    //@ts-ignore
    const user = socket?.user as AdminDocument;
    const employees = await aggregateEmployee([
      { $match: { _id: { $ne: user._id } } },
      { $project: { _id: 1, profileUri: 1, username: 1, number: 1 } },
    ]);
    const admins = await aggregateAdmin([
      { $project: { _id: 1, profileUri: 1, username: 1, number: 1 } },
    ]);
    const data: { [key: string]: any } = {};
    admins.forEach((value) => {
      data[value._id] = {
        conversationType: ConversationType.Direct,
        receiverType: SendBy.Admin,
        receiverId: value._id,
        profileUri: value.profileUri,
        username: value.username,
      };
    });
    employees.forEach((value) => {
      data[value._id] = {
        conversationType: ConversationType.Direct,
        receiverType: SendBy.Employee,
        receiverId: value._id,
        profileUri: value.profileUri,
        username: value.username,
      };
    });
    socket.emit("employee-srisudha-result", data);
  } catch (err) {}
}

export async function employeeStorageHandler(socket: Socket, data: any) {
  //@ts-ignore
  const user = socket?.user as AdminDocument;
  try {
    const uploads = await Message.find(
      {
        ownerId: user._id,
        fileUri: { $exists: true },
        projectId: { $exists: true },
      },
      {
        fileName: 1,
        fileUri: 1,
        fileSize: 1,
        fileType: 1,
        projectId: 1,
        projectName: 1,
      }
    ).limit(10);
    const shared = await aggregateMessage([
      {
        $match: {
          fileUri: { $exists: true },
          projectId: { $exists: true },
          ownerId: { $ne: user._id.toString() },
          participants: user._id.toString(),
        },
      },
      {
        $project: {
          fileName: 1,
          fileUri: 1,
          fileSize: 1,
          fileType: 1,
          projectId: 1,
          projectName: 1,
          createdAt: 1,
        },
      },
      { $limit: 10 },
    ]);
    console.log("upload", uploads);
    socket.emit("admin-storage-result", { uploads, shared });
  } catch (err) {}
}
export async function storageProjectHandler(socket: Socket, data: any) {
  //@ts-ignore
  const user = socket?.user as AdminDocument;
  try {
    const projects = await aggregateProject([
      { $sort: { lastUploaded: -1 } },
      { $project: { name: 1, status: 1, files: 1, lastUploaded: 1 } },
    ]);

    socket.emit("admin-storage-project-result", projects);
  } catch (err) {}
}

export async function addImportantHandler(
  socket: Socket,
  data: { messageId: string }
) {
  //@ts-ignore
  const user = socket?.user as AdminDocument;
  try {
    const update = await findAndUpdateAdmin(
      { _id: user._id },
      { $addToSet: { importantFiles: data.messageId } },
      { new: true }
    );
    //@ts-ignore
    socket.user = update;
  } catch (err) {}
}

export async function removeImportantHandler(
  socket: Socket,
  data: { messageId: string }
) {
  //@ts-ignore
  const user = socket?.user as AdminDocument;
  try {
    const important = user?.importantFiles?.filter(
      (value) => value.toString() != data.messageId
    );
    user.importantFiles = important;
    //@ts-ignore
    socket.user = user;
    await user.save();
  } catch (err) {}
}

export async function storageImportantImageHandler(socket: Socket, data: any) {
  //@ts-ignore
  const user = socket?.user as AdminDocument;
  console.log("user", user);
  try {
    const data = await Admin.findOne({ _id: user._id }).populate(
      "importantFiles",
      {
        fileName: 1,
        fileUri: 1,
        fileSize: 1,
        createdAt: 1,
        ownerId: 1,
        ownerName: 1,
        fileType: 1,
        projectId: 1,
        projectName: 1,
      }
    );
    console.log("projectId", user);
    socket.emit("admin-storage-important-image-result", data?.importantFiles);
  } catch (err) {}
}

export async function storageProjectImageHandler(
  socket: Socket,
  data: { projectId: string }
) {
  //@ts-ignore
  const user = socket?.user as AdminDocument;
  console.log("projectId", data);
  try {
    const projects = await aggregateMessage([
      { $match: { projectId: data.projectId } },
      {
        $project: {
          fileName: 1,
          fileUri: 1,
          fileSize: 1,
          createdAt: 1,
          ownerId: 1,
          ownerName: 1,
          fileType: 1,
          projectId: 1,
          projectName: 1,
        },
      },
    ]);
    console.log("images", projects);
    socket.emit("admin-storage-project-image-result", projects);
  } catch (err) {}
}

export async function imageDetailHandler(
  socket: Socket,
  data: { messageId: string }
) {
  //@ts-ignore
  const user = socket?.user as AdminDocument;

  try {
    const favorite = user.importantFiles.find(
      (value) => value.toString() == data.messageId
    );
    const images = await aggregateMessage([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(data.messageId),
          participants: user._id.toString(),
        },
      },
    ]);
    console.log("images from detail", images[0], favorite, user.importantFiles);
    socket.emit("admin-image-detail-result", {
      ...images[0],
      favorite: favorite ? true : false,
    });
  } catch (err) {}
}

export async function updateProjectStatusHandler(
  project: ProjectDocument,
  data: { projectId: string; status: TaskStatus }
) {
  const adminConnection = getActiveAdmins();
  let employeeConnection: string[] = [];
  project.assignedEmployees.forEach((value) => {
    employeeConnection.push(...getActiveConnections(value.employeeId));
  });
  const customerConnection = getActiveConnections(
    project.customerId.toString()
  );
  getSocketServerInstance()
    ?.to([...adminConnection, ...employeeConnection, ...customerConnection])
    .emit("update-project-status-result", data);
}

export async function initialDataHandler(socket: Socket) {
  try {
    const branches = await aggregateBranch([{ $match: {} }]);
    const templates = await aggregateTemplate([{ $match: {} }]);
    const quotations = await aggregateQuotation([
      {
        $lookup: {
          from: "branches",
          let: { branchId: "$branchId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$branchId"],
                },
              },
            },
            { $project: { _id: 1, email: 1, number: 1, address: 1 } },
          ],
          as: "branch",
        },
      },

      { $unwind: "$branch" },
      {
        $lookup: {
          from: "customers",
          let: { customerId: "$customerId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$customerId"],
                },
              },
            },
            {
              $project: {
                _id: 1,
                email: 1,
                number: 1,
                kycDetails: 1,
                state: 1,
              },
            },
          ],
          as: "user",
        },
      },
      { $unwind: "$user" },
      { $group: { _id: "$projectId", quotations: { $push: "$$ROOT" } } },
    ]);
    const invoices = await aggregateInvoice([
      {
        $lookup: {
          from: "branches",
          let: { branchId: "$branchId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$branchId"],
                },
              },
            },
            { $project: { _id: 1, email: 1, number: 1, address: 1 } },
          ],
          as: "branch",
        },
      },
      { $unwind: "$branch" },
      {
        $lookup: {
          from: "customers",
          let: { customerId: "$customerId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$customerId"],
                },
              },
            },
            {
              $project: {
                _id: 1,
                email: 1,
                number: 1,
                kycDetails: 1,
                state: 1,
              },
            },
          ],
          as: "user",
        },
      },
      { $unwind: "$user" },
      { $group: { _id: "$projectId", invoice: { $push: "$$ROOT" } } },
      { $unwind: "$invoice" },
    ]);
    socket.emit("initial-data-result", {
      branches,
      invoices,
      templates,
      quotations,
    });
  } catch (err) {}
}

async function adminProjectHandler(socket: Socket, data: any) {
  const project = await aggregateProject([
    { $match: {} },
    {
      $lookup: {
        from: "employees",
        let: { employeeId: "$primaryEmployee" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$employeeId"],
              },
            },
          },
          {
            $project: {
              _id: 1,
              username: 1,
              profileUri: 1,
              number: 1,
            },
          },
        ],
        as: "primaryEmployee",
      },
    },
    { $unwind: { path: "$primaryEmployee", preserveNullAndEmptyArrays: true } },
    { $sort: { createdAt: -1 } },
  ]);

  socket.emit("admin-project-result", project);
}

async function adminEmployeeHandler(socket: Socket) {
  const currentDate = moment();
  const dateCheck = moment(currentDate).startOf("day");
  const employees = await aggregateEmployee([
    { $match: {} },
    {
      $lookup: {
        from: "tasks",
        let: { assignedEmployee: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$assignedEmployee", "$$assignedEmployee"],
              },
            },
          },
          {
            $project: { status: 1 },
          },
        ],
        as: "tasks",
      },
    },
    {
      $lookup: {
        from: "meetings",
        let: { assignedEmployee: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$employeeId", "$$assignedEmployee"] },
                  { $eq: ["$employeeConfirmed", true] },
                  { $gte: ["$meetingStartTime", dateCheck.toDate()] },
                  {
                    $gte: [
                      "$meetingStartTime",
                      dateCheck.add(1, "day").toDate(),
                    ],
                  },
                ],
              },
            },
          },
          {
            $project: { status: 1 },
          },
        ],
        as: "meetings",
      },
    },
    {
      $addFields: {
        meetingCount: { $size: "$meetings" },
        status: {
          $reduce: {
            input: "$tasks",
            initialValue: {
              pending: 0,
              completed: 0,
              initiated: 0,
            },
            in: {
              $switch: {
                branches: [
                  {
                    case: { $eq: ["$$this.status", TaskStatus.Completed] },
                    then: {
                      completed: {
                        $add: ["$$value.completed", 1],
                      },
                      pending: "$$value.pending",
                      initiated: "$$value.initiated",
                    },
                  },
                  {
                    case: { $eq: ["$$this.status", TaskStatus.Ongoing] },
                    then: {
                      pending: {
                        $add: ["$$value.pending", 1],
                      },
                      completed: "$$value.completed",
                      initiated: "$$value.initiated",
                    },
                  },
                  {
                    case: { $eq: ["$$this.status", TaskStatus.Initiated] },
                    then: {
                      initiated: {
                        $add: ["$$value.initiated", 1],
                      },
                      completed: "$$value.completed",
                      pending: "$$value.pending",
                    },
                  },
                ],
                default: "$$value",
              },
            },
          },
        },
      },
    },
    { $project: { tasks: 0, meetings: 0 } },
  ]);
  socket.emit("admin-employee-result", employees);
}

async function searchEmployeeHandler(socket: Socket) {
  const employees = await aggregateEmployee([
    { $match: {} },
    { $project: { _id: 1, profileUri: 1, number: 1, username: 1 } },
    {
      $lookup: {
        from: "tasks",
        let: { assignedEmployee: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$assignedEmployee", "$$assignedEmployee"],
              },
            },
          },
          {
            $project: { status: 1 },
          },
        ],
        as: "tasks",
      },
    },

    {
      $addFields: {
        status: {
          $reduce: {
            input: "$tasks",
            initialValue: {
              pending: 0,

              initiated: 0,
            },
            in: {
              $switch: {
                branches: [
                  {
                    case: { $eq: ["$$this.status", TaskStatus.Ongoing] },
                    then: {
                      pending: {
                        $add: ["$$value.pending", 1],
                      },

                      initiated: "$$value.initiated",
                    },
                  },
                  {
                    case: { $eq: ["$$this.status", TaskStatus.Initiated] },
                    then: {
                      initiated: {
                        $add: ["$$value.initiated", 1],
                      },

                      pending: "$$value.pending",
                    },
                  },
                ],
                default: "$$value",
              },
            },
          },
        },
      },
    },
    { $project: { tasks: 0 } },
  ]);
  socket.emit("admin-search-employee-result", employees);
}

async function searchCustomerHandler(socket: Socket) {
  const customers = await aggregateCustomer([
    {
      $lookup: {
        from: "projects",
        let: { customerId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$customerId", "$$customerId"] },
                  {
                    $or: [
                      { $eq: ["$status", TaskStatus.Initiated] },
                      { $eq: ["$status", TaskStatus.Ongoing] },
                    ],
                  },
                ],
              },
            },
          },
          {
            $project: { status: 1 },
          },
        ],
        as: "projects",
      },
    },
    {
      $addFields: { project: { $size: "$projects" } },
    },
    {
      $project: {
        project: 1,
        companyName: 1,
        profileUri: 1,
        _id: 1,
        number: 1,
      },
    },
  ]);
  socket.emit("admin-search-customer-result", customers);
}

async function adminCustomerHandler(socket: Socket) {
  const customers = await aggregateCustomer([
    { $match: {} },
    { $sort: { createdAt: -1 } },
    {
      $lookup: {
        from: "employees",
        let: { employeeId: "$assignedEmployee" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$employeeId"],
              },
            },
          },
          {
            $project: {
              _id: 1,
              username: 1,
              profileUri: 1,
              number: 1,
            },
          },
        ],
        as: "assignedEmployee",
      },
    },
    {
      $unwind: { path: "$assignedEmployee", preserveNullAndEmptyArrays: true },
    },
    {
      $lookup: {
        from: "quotations",
        let: { customerId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$customerId", "$$customerId"] },
                  { $eq: ["$quotationType", QuotationType.Current] },
                  { $eq: ["$approved", false] },
                ],
              },
            },
          },
          {
            $project: { status: 1 },
          },
        ],
        as: "quotations",
      },
    },
    {
      $lookup: {
        from: "invoices",
        let: { customerId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$customerId", "$$customerId"] },
                  { $eq: ["$paymentStatus", PaymentStatus.Unpaid] },
                ],
              },
            },
          },
          {
            $project: { status: 1 },
          },
        ],
        as: "invoices",
      },
    },
    {
      $lookup: {
        from: "projects",
        let: { customerId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$customerId", "$$customerId"],
              },
            },
          },
          {
            $project: { status: 1 },
          },
        ],
        as: "projects",
      },
    },
    {
      $addFields: {
        unpaidInvoice: { $size: "$invoices" },
        pendingQuotation: { $size: "$quotations" },
        status: {
          $reduce: {
            input: "$projects",
            initialValue: {
              pending: 0,
              completed: 0,
              initiated: 0,
            },
            in: {
              $switch: {
                branches: [
                  {
                    case: { $eq: ["$$this.status", TaskStatus.Completed] },
                    then: {
                      completed: {
                        $add: ["$$value.completed", 1],
                      },
                      pending: "$$value.pending",
                      initiated: "$$value.initiated",
                    },
                  },
                  {
                    case: { $eq: ["$$this.status", TaskStatus.Ongoing] },
                    then: {
                      pending: {
                        $add: ["$$value.pending", 1],
                      },
                      completed: "$$value.completed",
                      initiated: "$$value.initiated",
                    },
                  },
                  {
                    case: { $eq: ["$$this.status", TaskStatus.Initiated] },
                    then: {
                      initiated: {
                        $add: ["$$value.initiated", 1],
                      },
                      completed: "$$value.completed",
                      pending: "$$value.pending",
                    },
                  },
                ],
                default: "$$value",
              },
            },
          },
        },
      },
    },
    { $project: { invoices: 0, quotations: 0, projects: 0 } },
  ]);
  socket.emit("admin-customer-result", customers);
}

async function adminTaskHandler(socket: Socket, data: { projectId: string }) {
  let tasks: any[] = [];
  if (mongoose.isValidObjectId(data.projectId)) {
    tasks = await aggregateTask([
      { $match: { projectId: new mongoose.Types.ObjectId(data.projectId) } },

      { $sort: { createdAt: -1 } },
      {
        $lookup: {
          from: "employees",
          let: { employeeId: "$assignedEmployee" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$employeeId"],
                },
              },
            },
            {
              $project: {
                _id: 1,
                username: 1,
                profileUri: 1,
                number: 1,
              },
            },
          ],
          as: "assignedEmployee",
        },
      },
      {
        $unwind: {
          path: "$assignedEmployee",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
    const projectDetail = await aggregateProject([
      { $match: { _id: new mongoose.Types.ObjectId(data.projectId) } },
      {
        $lookup: {
          from: "customers",
          let: { customerId: "$customerId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$customerId"],
                },
              },
            },
            {
              $project: {
                _id: 1,
                companyName: 1,
                firstname: 1,
                gstNumber: 1,
                state: 1,
                lastname: 1,
                email: 1,
                number: 1,
              },
            },
          ],
          as: "customer",
        },
      },
      { $unwind: "$customer" },
      {
        $lookup: {
          from: "employees",
          let: { employeeId: "$primaryEmployee" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$employeeId"],
                },
              },
            },
            {
              $project: {
                _id: 1,
                username: 1,
                profileUri: 1,
                number: 1,
              },
            },
          ],
          as: "primaryEmployee",
        },
      },
      {
        $unwind: { path: "$primaryEmployee", preserveNullAndEmptyArrays: true },
      },

      {
        $lookup: {
          from: "tasks",
          let: { projectId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$projectId", "$$projectId"],
                },
              },
            },
            {
              $project: { status: 1, assignedEmployee: 1 },
            },
            { $group: { _id: "$assignedEmployee" } },
            {
              $lookup: {
                from: "employees",
                let: { employeeId: "$_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ["$_id", "$$employeeId"],
                      },
                    },
                  },
                  {
                    $project: { username: 1, profileUri: 1, _id: 1, number: 1 },
                  },
                ],
                as: "details",
              },
            },
            { $unwind: "$details" },
          ],
          as: "employees",
        },
      },
    ]);

    socket.emit("admin-task-result", {
      tasks,
      projectDetail: projectDetail[0],
    });
  } else {
    return;
  }
}

async function employeeLeaveHandler(
  socket: Socket,
  data: { employeeId: string },
  callback: (data: any) => void
) {
  try {
    const employee = await findEmployee(
      { _id: data.employeeId },
      { sickLeave: 1 }
    );
    if (!employee) {
      throw new CustomError("Bad Request", 404, "No such employee found");
    }
    callback({ status: 200, data: employee.sickLeave });
  } catch (err) {
    //@ts-ignore
    callback({ status: 400, message: error.message });
  }
}

async function employeeTaskLogHandler(
  socket: Socket,
  data: { taskId: string },
  callback: (data: any) => void
) {
  try {
    const tasks = await aggregateTask([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(data.taskId),
        },
      },
      { $unwind: "$timeLog" },
      {
        $lookup: {
          from: "employees",
          let: { employeeId: "$timeLog.employeeId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$employeeId"],
                },
              },
            },
            {
              $project: {
                _id: 1,
                username: 1,
                profileUri: 1,
                number: 1,
              },
            },
          ],
          as: "employee",
        },
      },
      { $unwind: "$employee" },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ employee: "$employee" }, "$timeLog"],
          },
        },
      },
    ]);
    callback({ status: 200, data: tasks });
  } catch (err) {
    //@ts-ignore
    callback({ status: 400, message: error.message });
  }
}

async function adminTaskDetailHandler(
  socket: Socket,
  data: { taskId: string }
) {
  let tasks: any[] = [];
  try {
    if (mongoose.isValidObjectId(data.taskId)) {
      const taskDetail = await Task.findOne({ _id: data.taskId }).populate(
        "assignedEmployee",
        {
          username: 1,
          number: 1,
          email: 1,
          _id: 1,
          profileUri: 1,
        }
      );
      // .populate({
      //   path: "previousEmployee",
      //   populate: { path: "id", model: "Employee" },
      // });
      const comments = await Comment.find({
        taskId: data.taskId,
        parent: true,
      }).populate({
        path: "threads",
        populate: { path: "threads" },
      });
      console.log("comments", comments, taskDetail);
      socket.emit("admin-task-detail-result", {
        comments,
        taskDetail,
      });
    } else {
      return;
    }
  } catch (err) {
    console.log("err", err);
  }
}

export async function deleteConversationHandler(
  conversationsId: string[],
  employeeId: string
) {
  const connection = getActiveConnections(employeeId);
  getSocketServerInstance()
    ?.to(connection)
    .emit("delete-conversation-result", conversationsId);
}

export async function updateConversationHandler(
  conversations: ConversationDocument[]
) {
  conversations.forEach((conversation) => {
    conversation.participants.forEach((value) => {
      const connection = getActiveConnections(value.id);
      getSocketServerInstance()
        ?.to(connection)
        .emit("update-conversation-result", [conversation]);
    });
  });
}
export async function addConversationHandler(
  conversations: ConversationDocument[],
  employeeIds: string[]
) {
  const activeConnections: string[] = [];
  employeeIds.forEach((value) => {
    activeConnections.push(...getActiveConnections(value));
  });

  getSocketServerInstance()
    ?.to(activeConnections)
    .emit("update-conversation-result", conversations);
}

export async function deleteSocketProjectHandler(
  employeeId: string,
  projectId: mongoose.Types.ObjectId
) {
  const connections = getActiveConnections(employeeId);
  getSocketServerInstance()
    ?.to(connections)
    .emit("delete-project-result", { projectId });
}

export async function addSocketProjectHandler(
  employeeId: string,
  project: ProjectDocument,
  primaryEmployee?: EmployeeDocument | null,
  primary: boolean = false
) {
  const connections = getActiveConnections(employeeId);
  console.log("connections", connections);
  getSocketServerInstance()
    ?.to(connections)
    .emit("add-project-result", {
      ...project.toJSON(),
      primaryEmployee,
      primary,
    });
}

export async function updateSocketProjectPrimaryEmployee(
  project: ProjectDocument,
  primaryEmployee: EmployeeDocument
) {
  const adminConnections = getActiveAdmins();
  if (adminConnections.length > 0) {
    getSocketServerInstance()
      ?.to(adminConnections)
      .emit("update-primary-employee-result", {
        primaryEmployee,
        projectId: project._id,
      });
  }
  project.assignedEmployees.forEach((value) => {
    const connections = getActiveConnections(value.employeeId);
    if (connections.length > 0) {
      getSocketServerInstance()
        ?.to(connections)
        .emit("update-primary-employee-result", {
          primaryEmployee,
          projectId: project._id,
        });
    }
  });
}

async function adminHolidayHandler(socket: Socket, data: any) {
  const meetings = await aggregateHoliday([{ $sort: { createdAt: -1 } }]);
  console.log("meetings", meetings, data);
  socket.emit("admin-holiday-result", meetings);
}

async function adminMeetingHandler(socket: Socket, data: any) {
  const meetings = await aggregateMeeting([
    { $match: { projectId: new mongoose.Types.ObjectId(data.projectId) } },
    {
      $lookup: {
        from: "employees",
        let: { employeeId: "$employeeId" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$employeeId"],
              },
            },
          },
          {
            $project: {
              _id: 1,
              username: 1,
              profileUri: 1,
              number: 1,
            },
          },
        ],
        as: "employee",
      },
    },
    {
      $lookup: {
        from: "customers",
        let: { customerId: "$customerId" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$customerId"],
              },
            },
          },
          {
            $project: {
              _id: 1,
              username: 1,
              companyName: 1,
              number: 1,
              profileUri: 1,
            },
          },
        ],
        as: "customer",
      },
    },
    { $sort: { createdAt: -1 } },
  ]);
  console.log("meetings", meetings, data);
  socket.emit("admin-project-meeting-result", meetings);
}

async function adminInvoiceHandler(
  socket: Socket,
  data: { type: InvoiceType }
) {
  let value: any[] = [];
  if (data.type == InvoiceType.Quotation) {
    value = await aggregateQuotation([{ $sort: { createdAt: -1 } }]);
  } else {
    const match: { [key: string]: any } = {};
    if (data.type == InvoiceType.Paid) {
      match["paymentStatus"] = PaymentStatus.Paid;
    } else {
      match["paymentStatus"] = PaymentStatus.Unpaid;
    }
    value = await aggregateInvoice([
      { $match: match },
      { $sort: { createdAt: -1 } },
    ]);
  }

  socket.emit("admin-invoice-result", { type: data.type, data: value });
}

export async function addProjectHandler(
  data: ProjectDocument,
  primaryEmployee?: EmployeeDocument
) {
  const adminConnection = getActiveAdmins();
  let employeeConnection: string[] = [];
  if (data.primaryEmployee) {
    employeeConnection = getActiveConnections(data.primaryEmployee);
  }
  const customerConnection = getActiveConnections(data.customerId.toString());
  console.log(
    "employeeConnection",
    employeeConnection,
    adminConnection,
    customerConnection
  );
  if (adminConnection.length > 0) {
    getSocketServerInstance()
      ?.to(adminConnection)
      .emit("add-project-result", { ...data.toJSON(), primaryEmployee });
  }

  if (employeeConnection.length > 0) {
    getSocketServerInstance()
      ?.to(employeeConnection)
      .emit("add-project-result", {
        ...data.toJSON(),
        primaryEmployee,
        primary: true,
      });
  }
  if (customerConnection.length > 0) {
    getSocketServerInstance()
      ?.to(customerConnection)
      .emit("add-project-result", { ...data.toJSON(), primaryEmployee });
  }
}

export async function sendConversationHandler(data: ConversationInput[]) {
  console.log("some new data", data);
  data.forEach((value) => {
    value.participants.forEach((value2) => {
      const connection = getActiveConnections(value2.id);
      if (connection?.length > 0) {
        getSocketServerInstance()
          ?.to(connection)
          .emit("add-conversation-result", value);
      }
    });
  });
}

export async function addBranchHandler(data: BranchDocument) {
  const adminConnection = getActiveAdmins();

  getSocketServerInstance()
    ?.to([...adminConnection])
    .emit("add-branch-result", data);
}

export async function addTemplateHandler(data: TemplateDocument) {
  const adminConnection = getActiveAdmins();

  getSocketServerInstance()
    ?.to([...adminConnection])
    .emit("add-template-result", data);
}

export async function addInvoiceHandler(data: InvoiceDocument) {
  const adminConnection = getActiveAdmins();

  const customerConnection = getActiveConnections(data.customerId.toString());
  getSocketServerInstance()
    ?.to([...adminConnection, ...customerConnection])
    .emit("add-invoice-result", data);
}

export async function addQuotationData(
  data: QuotationDocument,
  branch: BranchDocument
) {
  const adminConnection = getActiveAdmins();

  const customerConnection = getActiveConnections(data.customerId.toString());
  getSocketServerInstance()
    ?.to([...adminConnection, ...customerConnection])
    .emit("add-quotation-result", { ...data.toJSON(), branch });
}

export async function addInvoiceData(
  data: InvoiceDocument,
  branch: BranchDocument
) {
  const adminConnection = getActiveAdmins();

  const customerConnection = getActiveConnections(data.customerId.toString());
  console.log("invoice", data, branch, adminConnection);
  // [...adminConnection, ...customerConnection].forEach((value) => {
  //   console.log("value", value);
  //   getSocketServerInstance()
  //     ?.to(value)
  //     .emit("add-invoice-result", { ...data.toJSON(), branch });
  // });
  getSocketServerInstance()
    ?.sockets?.to([...adminConnection, ...customerConnection])
    .emit("add-invoice-result", { ...data.toJSON(), branch });
}
