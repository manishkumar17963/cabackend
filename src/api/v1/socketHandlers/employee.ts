import moment from "moment";
import mongoose from "mongoose";
import { Socket } from "socket.io";
import {
  getActiveAdmins,
  getSocketServerInstance,
} from "../../../socket/serverStore";
import AttendanceType from "../enums/attendanceType";
import ConversationType from "../enums/conversationType";
import HolidayStatus from "../enums/holidayStatus";
import MeetingStatus from "../enums/meetingStatus";
import ProjectStatus from "../enums/taskStatus";
import MeetingType from "../enums/meetingType";
import Priority from "../enums/priority";
import SendBy from "../enums/sendBy";
import TaskStatus from "../enums/taskStatus";
import WorkFrom from "../enums/workFrom";
import { socketError } from "../helpers/checkErrors";
import CustomError from "../helpers/customError";
import Location from "../interfaces/location";
import PointLocation from "../interfaces/pointLocation";
import Attendance from "../models/attendance";
import Comment from "../models/comment";
import Employee, { EmployeeDocument } from "../models/employee";
import Link, { LinkInput, LinkOwned } from "../models/link.model";
import Meeting from "../models/meeting";
import Message from "../models/message.model";
import Task, { TaskDocument } from "../models/task.model";
import { aggregateAdmin } from "../services/admin";
import { findAttendance } from "../services/attendance";
import { aggregateBranch } from "../services/branch.service";
import {
  aggregateCustomer,
  findAllCustomer,
  findCustomer,
} from "../services/customer";
import {
  aggregateEmployee,
  findAndUpdateEmployee,
  findEmployee,
} from "../services/employee";
import { aggregateHoliday } from "../services/holiday";
import {
  createLink,
  findAllLink,
  findAndDeleteLink,
  findAndUpdateLink,
  findLink,
} from "../services/link.service";
import {
  aggregateMeeting,
  findAndUpdateMeeting,
  findMeeting,
} from "../services/meeting";
import { aggregateMessage } from "../services/message.Service";
import { aggregateProject, findProject } from "../services/project.Service";
import {
  aggregateSelfTask,
  createSelfTask,
  deleteSelfTask,
  findAndUpdateSelfTask,
  findSelfTask,
} from "../services/selfTask.service";
import { aggregateTask, findTask } from "../services/task";
import { aggregateTemplate } from "../services/template.service";
import SelfTask, { SelfTaskDocument } from "../models/selfTask";
import TaskType from "../enums/taskType";

export function employeeSocketHandler(socket: Socket) {
  //@ts-ignore
  if (socket.type == SendBy.Employee) {
    socket.on("sick-leave", async (data) => {
      await sickLeaveHandler(socket, data);
    });
    socket.on("employee-project", async (data) => {
      await employeeProjectHandler(socket, data);
    });

    socket.on("create-task", async (data, callback) => {
      await addTaskHandler(socket, data, callback);
    });

    socket.on("update-task-status", async (data, callback) => {
      await updateTaskStatusHandler(socket, data, callback);
    });

    socket.on("all-tasks", async (data, callback) => {
      await employeeAllTaskHandler(socket, data, callback);
    });

    socket.on("time-log", async (data, callback) => {
      await employeeTaskLogHandler(socket, data, callback);
    });

    socket.on("start-task-employee", async (data, callback) => {
      await taskActionHandler(socket, data, callback);
    });

    socket.on("employee-dashboard", async (data) => {
      await dashboardHandler(socket, data);
    });

    socket.on("confirm-meeting", async (data) => {
      await confirmMeetingHandler(socket, data);
    });

    socket.on("employee-mark-attendance", async (data, callback) => {
      await markAttendanceHandler(socket, data, callback);
    });

    socket.on("employee-task-detail", async (data) => {
      await employeeTaskDetailHandler(socket, data);
    });

    socket.on("employee-task", async (data) => {
      await employeeTaskHandler(socket, data);
    });

    socket.on("employee-srisudha", async (data) => {
      await employeeSrisudhaHandler(socket, data);
    });

    socket.on("add-attendance", (data) => {
      addAttendanceHandler(socket, data);
    });

    socket.on("employee-search-customer", async (data) => {
      await searchCustomerHandler(socket, data);
    });

    socket.on("assign-employee-meeting", async (data) => {
      await assignEmployeeMeeting(socket, data);
    });

    socket.on("employee-search-employee", async (data) => {
      console.log("hello ji ");
      await searchEmployeeHandler(socket);
    });

    socket.on("employee-task", async (data) => {
      await employeeTaskHandler(socket, data);
    });

    socket.on("employee-project-meeting", async (data) => {
      await employeeMeetingHandler(socket, data);
    });

    socket.on("employee-storage", async (data) => {
      console.log("storage emit ");
      await employeeStorageHandler(socket, data);
    });

    socket.on("employee-storage-project", async (data) => {
      await storageProjectHandler(socket, data);
    });
    socket.on("employee-storage-project-image", async (data) => {
      await storageProjectImageHandler(socket, data);
    });

    socket.on("employee-storage-important-image", async (data) => {
      await storageImportantImageHandler(socket, data);
    });

    socket.on("employee-add-important-image", async (data) => {
      await addImportantHandler(socket, data);
    });
    socket.on("employee-remove-important-image", async (data) => {
      await removeImportantHandler(socket, data);
    });
    socket.on("employee-image-detail", async (data) => {
      await imageDetailHandler(socket, data);
    });

    socket.on("employee-holiday", async (data) => {
      await employeeHolidayHandler(socket, data);
    });

    socket.on("employee-date-meeting", async (data, callback) => {
      await employeeMeetingDateHandler(socket, data, callback);
    });

    socket.on("employee-complete-meeting", async (data, callback) => {
      await completeMeetingHandler(socket, data, callback);
    });

    socket.on("employee-cancel-meeting", async (data, callback) => {
      await cancelMeetingHandler(socket, data, callback);
    });

    socket.on("employee-add-link", async (data, callback) => {
      await employeeAddLink(socket, data, callback);
    });

    socket.on("employee-toggle-link", async (data, callback) => {
      await employeeToggleLink(socket, data, callback);
    });

    socket.on("employee-delete-link", async (data, callback) => {
      await employeeDeleteLink(socket, data, callback);
    });

    socket.on("employee-update-link", async (data, callback) => {
      await updateLinkHandler(socket, data, callback);
    });
  }
}

export async function addTaskHandler(
  socket: Socket,
  data: {
    name: string;
    description?: string;
    startDate?: Date;
    expectedEndDate?: Date;
  },
  callback: (data: any) => void
) {
  try {
    console.log("data", data);
    //@ts-ignore
    const user = socket.user as EmployeeDocument;
    const task = await createSelfTask({
      name: data.name,
      expectedEndDate:
        data.expectedEndDate != null && data.expectedEndDate
          ? data.expectedEndDate
          : undefined,
      startDate: data.startDate,
      priority: Priority.Default,
      assignedEmployee: user._id,
      timeLog: [],
      userType: SendBy.Employee,
      status: TaskStatus.Initiated,
    });
    callback({ status: 200, data: task });
  } catch (err: any) {
    console.log("error", err);
    callback({ status: 400, message: err?.message });
  }
}

async function employeeAllTaskHandler(
  socket: Socket,
  data: {
    taskId: mongoose.Types.ObjectId;
    key: string;
    value: string;
  },
  callback: (data: any) => void
) {
  try {
    //@ts-ignore
    const user = socket.user as EmployeeDocument;
    const tasks1 = await aggregateTask([
      {
        $match: {
          assignedEmployee: user._id,
          status: { $ne: ProjectStatus.Declined },
        },
      },
      { $sort: { createdAt: -1 } },
      {
        $project: {
          name: 1,
          description: 1,
          expectedEndDate: 1,
          status: 1,
          priority: 1,
          projectId: 1,
          createdAt: 1,
        },
      },
      { $group: { _id: "$status", items: { $push: "$$ROOT" } } },
    ]);

    const tasks2 = await aggregateSelfTask([
      {
        $match: {
          assignedEmployee: user._id,
          status: { $ne: ProjectStatus.Declined },
        },
      },
      { $sort: { createdAt: -1 } },
      {
        $project: {
          name: 1,
          description: 1,
          expectedEndDate: 1,
          status: 1,
          priority: 1,
          startDate: 1,
        },
      },
      { $group: { _id: "$status", items: { $push: "$$ROOT" } } },
    ]);
    const data: {
      [key: string]: { title: string; expanded: boolean; items: any[] };
    } = {};
    const handlerFunction = (value: { _id: ProjectStatus; items: any[] }) => {
      if (data[value._id]) {
        data[value._id].items.push(...value.items);
      } else {
        data[value._id] = {
          title: value._id,
          expanded: true,
          items: value.items,
        };
      }
    };
    tasks1.forEach(handlerFunction);
    tasks2.forEach(handlerFunction);
    callback({
      status: 200,
      data: {
        completed: data.completed,
        ongoing: data.ongoing,
        initiated: data.initiated,
      },
    });
  } catch (err) {}
}

export async function updateTaskStatusHandler(
  socket: Socket,
  data: {
    taskId: mongoose.Types.ObjectId;
    status: ProjectStatus;
    type: string;
  },
  callback: (data: any) => void
) {
  try {
    console.log("data", data);
    //@ts-ignore
    const user = socket.user as EmployeeDocument;
    let task: TaskDocument | SelfTaskDocument | null;
    if (data.type == "project") {
      task = await findTask({ _id: data.taskId, assignedEmployee: user._id });
    } else {
      task = await findSelfTask({
        _id: data.taskId,
        assignedEmployee: user._id,
      });
    }

    if (!task) {
      throw new CustomError("Bad Request", 404, "No such task found");
    }
    task.status = data.status;
    if (data.status == ProjectStatus.Completed) {
      const timeLog = task.timeLog[0];
      if (timeLog && !timeLog.endTime) {
        task.timeLog[0].endTime = moment().toDate();
      }
    }
    await task.save();
    callback({ status: 200, data: task });
  } catch (err: any) {
    console.log("error", err);
    callback({ status: 400, message: err?.message });
  }
}

export async function updateTaskHandler(
  socket: Socket,
  data: {
    taskId: mongoose.Types.ObjectId;
    key: string;
    value: string;
  },
  callback: (data: any) => void
) {
  try {
    //@ts-ignore
    const user = socket.user as EmployeeDocument;
    const task = await findAndUpdateSelfTask(
      { _id: data.taskId },
      { $set: { [data.key]: data.value } },
      {}
    );
    if (!task) {
      throw new CustomError("Bad Request", 404, "No such task found");
    }
    callback({ status: 200, data: task });
  } catch (err: any) {
    callback({ status: 400, message: err?.message });
  }
}

export async function deleteTaskHandler(
  socket: Socket,
  data: {
    taskId: mongoose.Types.ObjectId;
  },
  callback: (data: any) => void
) {
  try {
    //@ts-ignore
    const user = socket.user as EmployeeDocument;
    const task = await deleteSelfTask({
      _id: data.taskId,
      assignedEmployee: user._id,
    });
    if (!task || !task.acknowledged) {
      throw new CustomError("Bad Request", 404, "Task can't be deleted");
    }
    callback({ status: 200, data: task });
  } catch (err: any) {
    callback({ status: 400, message: err?.message });
  }
}

export async function employeeAddLink(
  socket: Socket,
  data: { name: string; url: string; sharedTo: string[] },
  callback: (data: any) => void
) {
  try {
    //@ts-ignore
    const user = socket.user as EmployeeDocument;
    const link = await createLink({
      ...data,
      type: LinkOwned.Personal,
      ownerId: user._id,
      ownerType: SendBy.Employee,
      hide: false,
    });
    // console.log("timeLogs", timeLogs);
    callback({ status: 200, data: link });
  } catch (err: any) {
    callback({ status: 500, message: err.message });
  }
}

export async function employeeToggleLink(
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

export async function employeeDeleteLink(
  socket: Socket,
  data: { linkId: mongoose.Types.ObjectId },
  callback: (data: any) => void
) {
  try {
    //@ts-ignore
    const user = socket.user as AdminDocument;
    const link = await findLink({
      _id: data.linkId,
    });
    if (!link) {
      throw new CustomError("Bad request", 404, "No such Link found");
    }
    if (link.ownerId == user._id) {
      await link.delete();
    } else {
      link.sharedTo = link.sharedTo.filter((value) => value != user._id);
      await link.save();
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
    const user = socket.user as EmployeeDocument;
    const link = await findAndUpdateLink(
      {
        ownerId: user._id,
        _id: data.linkId,
        type: LinkOwned.Personal,
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

async function employeeTaskLogHandler(
  socket: Socket,
  data: { taskId: string; type?: TaskType },
  callback: (data: any) => void
) {
  try {
    const func =
      data.type == TaskType.Personal ? aggregateSelfTask : aggregateTask;
    const tasks = await func([
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

async function taskActionHandler(
  socket: Socket,
  data: {
    taskId: string;
    workFrom: WorkFrom;
    location?: Location;
    type?: TaskType;
  },
  callback: (data: any) => void
) {
  try {
    //@ts-ignore
    const user = socket.user as EmployeeDocument;
    const func = data.type == TaskType.Personal ? findSelfTask : findTask;
    const tasks = await func({
      assignedEmployee: user._id,
      _id: data.taskId,
    });
    console.log("tasks", data);
    if (!tasks) {
      throw new CustomError("Bad Request", 404, "No such task found");
    }

    let timeLog = tasks?.timeLog[0];
    if (!timeLog) {
      tasks.timeLog = [
        {
          startTime: moment().toDate(),
          employeeId: user._id,
          workFrom: data.workFrom,
          location: data.location,
        },
      ];
    } else {
      if (timeLog.endTime) {
        tasks.timeLog = [
          {
            startTime: moment().toDate(),
            employeeId: user._id,
            workFrom: data.workFrom,
            location: data.location,
          },
          ...tasks.timeLog,
        ];
      } else {
        tasks.timeLog[0].endTime = moment().toDate();
      }
    }
    await tasks.save();
  } catch (err) {
    console.log(err);
  }
}

async function markAttendanceHandler(
  socket: Socket,
  data: any,
  callback: (data: any) => void
) {
  try {
    //@ts-ignore
    const user = socket.user as EmployeeDocument;
    const attendance = await findAttendance({ date: moment().startOf("day") });
    if (attendance) {
      if (attendance.attendanceType != AttendanceType.Normal) {
        callback({ status: 400, message: "Oops today is holiday" });
        return;
      } else if (!attendance.open) {
        callback({ status: 400, message: "Oops attendance closed" });
        return;
      }
    } else {
      callback({ status: 400, message: "Oops attendance not started yet " });
      return;
    }

    const value = attendance.attendance.find(
      (value) => value.employeeId == user._id
    );
    if (!value) {
      attendance.attendance.push({
        employeeId: user._id,
        approved: HolidayStatus.Pending,
        time: moment().toDate(),
      });
      callback({
        status: 200,
        message: `your attendance is marked successfully`,
      });
      await attendance.save();
    } else {
      callback({
        status: 400,
        message: `your attendance is already ${value.approved}`,
      });
      return;
    }
  } catch (err) {
    console.log(err);
  }
}

async function dashboardHandler(socket: Socket, data: any) {
  try {
    //@ts-ignore
    const user = socket.user as EmployeeDocument;
    const allProjects = await aggregateProject([
      { $match: { primaryEmployee: user._id } },
      { $group: { _id: "$status", count: { $count: {} } } },
    ]);
    const projects: { [key: string]: number } = {};
    allProjects.forEach((value) => {
      projects[value._id] = value.count;
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
    const holiday = await findEmployee(
      {
        _id: user._id,
        holidayRequest: {
          $elemMatch: {
            date: moment().startOf("day"),
            status: HolidayStatus.Approved,
          },
        },
      },
      { "holidayRequest.$": 1 }
    );
    let value: any;

    let attendanceType: AttendanceType;
    if (!holiday && attendance) {
      if (attendance.attendanceType == AttendanceType.Normal) {
        value = attendance.attendance.find(
          (value) => value.employeeId == user._id
        );
      }
      attendanceType = attendance.attendanceType;
    }

    const customers = await findAllCustomer(
      { assignedEmployee: user._id },
      { profileUri: 1, companyName: 1, number: 1, firstname: 1, lastname: 1 }
    );

    const holidays = await aggregateEmployee([
      { $match: { _id: user._id } },
      { $unwind: "$holidayRequest" },
      {
        $match: {
          "holidayRequest.date": {
            $gte: moment().startOf("month").toDate(),
            $lte: moment().startOf("month").add(1, "month").toDate(),
          },
        },
      },
      { $group: { _id: "$holidayRequest.status", count: { $count: {} } } },
    ]);
    console.log("holidays", holidays);
    let monthly: { [key: string]: number } = {};

    holidays.forEach((value) => {
      monthly[value._id] = value.count;
    });

    const monthlyAttendance = await Attendance.countDocuments({
      date: {
        $gte: moment().startOf("month"),
        $lte: moment().startOf("month").add(1, "month"),
      },
      attendance: {
        $elemMatch: {
          approved: HolidayStatus.Approved,
          employeeId: user._id,
        },
      },
    });

    monthly.attendance = monthlyAttendance;

    const links = await Link.find({
      $or: [
        { ownerId: user._id },
        { type: LinkOwned.All, hide: false },
        { sharedTo: user._id, hide: false },
      ],
    }).sort({ createdAt: -1 });

    socket.emit("employee-dashboard-result", {
      meetings,
      holiday: holiday,
      links,
      monthly: monthly,
      customers,
      attendance: value,
      //@ts-ignore
      attendanceType,
      projects: projects,
    });
  } catch (err) {
    console.log("err", err);
  }
}

async function confirmMeetingHandler(
  socket: Socket,
  data: { meetingId: string }
) {
  try {
    //@ts-ignore
    const user = socket.user! as EmployeeDocument;

    await findAndUpdateMeeting(
      {
        _id: data.meetingId,
        employeeId: user._id,
        meetingStatus: { $ne: MeetingStatus.Completed },
      },
      { $set: { employeeConfirmed: true } },
      {}
    );
  } catch (err) {}
}

async function employeeMeetingDateHandler(
  socket: Socket,
  data: { date: string },
  callback: (data: any) => void
) {
  try {
    console.log("meeting", data.date);
    //@ts-ignore
    const user = socket.user as EmployeeDocument;
    const projects = await aggregateProject([
      { $match: { "assignedEmployees.employeeId": user._id } },
      {
        $addFields: {
          primary: {
            $cond: {
              if: {
                $eq: [user._id, "$primaryEmployee"],
              },
              then: true,
              else: false,
            },
          },
        },
      },
      {
        $lookup: {
          from: "meetings",
          let: { projectId: "$_id", primary: "$primary" },
          pipeline: [
            {
              $match: {
                meetingStartTime: {
                  $gte: moment(data.date).toDate(),
                  $lt: moment(data.date).add(1, "day").toDate(),
                },
                $expr: {
                  $or: [
                    {
                      $and: [
                        { $eq: ["$employeeId", user._id] },
                        { $eq: ["$$projectId", "$projectId"] },
                      ],
                    },

                    {
                      $and: [
                        { $eq: ["$$projectId", "$projectId"] },
                        { $eq: ["$$primary", true] },
                      ],
                    },
                    {
                      $and: [
                        { $eq: ["$$projectId", "$projectId"] },
                        { $eq: ["$meetingType", MeetingType.Conversation] },
                      ],
                    },
                  ],
                },
              },
            },
            { $addFields: { primary: "$$primary" } },
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
            { $project: { conversation: 0 } },
            { $sort: { createdAt: -1 } },
          ],
          as: "meetings",
        },
      },
    ]);

    const directMeeting = await aggregateMeeting([
      {
        $match: {
          meetingType: { $in: [MeetingType.Direct, MeetingType.Primary] },
          meetingStartTime: {
            $gte: moment(data.date).toDate(),
            $lt: moment(data.date).add(1, "day").toDate(),
          },
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
      {
        $match: {
          "participants.id": user._id,
        },
      },
      { $sort: { createdAt: -1 } },
    ]);

    // const meetings = await aggregateMeeting([
    //   {
    //     $match: {
    //       $or: [
    //         { "participants.id": user._id },
    //         {
    //           meetingType: {
    //             $in: [MeetingType.Conversation, MeetingType.Primary],
    //           },
    //         },
    //       ],
    //       meetingStartTime: {
    //         $gte: moment(data.date).toDate(),
    //         $lt: moment(data.date).add(1, "day").toDate(),
    //       },
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "employees",
    //       let: { employeeId: "$employeeId" },
    //       pipeline: [
    //         {
    //           $match: {
    //             $expr: {
    //               $eq: ["$_id", "$$employeeId"],
    //             },
    //           },
    //         },
    //         {
    //           $project: {
    //             _id: 1,
    //             username: 1,
    //             profileUri: 1,
    //             number: 1,
    //           },
    //         },
    //       ],
    //       as: "employee",
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "customers",
    //       let: { customerId: "$customerId" },
    //       pipeline: [
    //         {
    //           $match: {
    //             $expr: {
    //               $eq: ["$_id", "$$customerId"],
    //             },
    //           },
    //         },
    //         {
    //           $project: {
    //             _id: 1,
    //             username: 1,
    //             companyName: 1,
    //             number: 1,
    //             profileUri: 1,
    //           },
    //         },
    //       ],
    //       as: "customer",
    //     },
    //   },
    //   { $sort: { createdAt: -1 } },
    // ]);
    console.log("directMee", directMeeting);
    const meetings: any[] = [];
    projects.forEach((value) => {
      meetings.push(...value.meetings);
    });
    callback({ status: 200, data: [...meetings, ...directMeeting] });
  } catch (err) {
    console.log("error", err);
  }
}

async function employeeHolidayHandler(socket: Socket, data: any) {
  const meetings = await aggregateHoliday([{ $sort: { createdAt: -1 } }]);
  console.log("meetings", meetings, data);
  socket.emit("employee-holiday-result", meetings);
}

export async function assignEmployeeMeeting(
  socket: Socket,
  data: { meetingId: string; employeeId: string }
) {
  try {
    //@ts-ignore
    const user = socket.user as EmployeeDocument;
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
    if (project.primaryEmployee != user._id) {
      return;
    } else {
      meeting.employeeId = data.employeeId;
      await meeting.save();
    }
  } catch (err) {}
}

export async function completedLeaveHandler(
  socket: Socket,
  data: { sickLeaveId: string },
  callback: (data: any) => void
) {
  const employee = await findEmployee({});
}

export async function sickLeaveHandler(socket: Socket, data: any) {
  try {
    //@ts-ignore
    const user = socket.user! as EmployeeDocument;
    const employee = await findEmployee({ _id: user._id });
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
          start: value.date,
          end: moment(value.date).add(1, "day"),
        })),
      });
    }
  } catch (err) {
    console.log("err", err);
  }
}

export async function employeeSrisudhaHandler(socket: Socket, data: any) {
  try {
    //@ts-ignore
    const user = socket?.user as EmployeeDocument;
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
  const user = socket?.user as EmployeeDocument;
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
    socket.emit("employee-storage-result", { uploads, shared });
  } catch (err) {}
}
export async function storageProjectHandler(socket: Socket, data: any) {
  //@ts-ignore
  const user = socket?.user as EmployeeDocument;
  try {
    const projects = await aggregateProject([
      { $match: { "assignedEmployees.employeeId": user._id } },
      { $sort: { lastUploaded: -1 } },
      { $project: { name: 1, status: 1, files: 1, lastUploaded: 1 } },
    ]);

    socket.emit("employee-storage-project-result", projects);
  } catch (err) {}
}

export async function addImportantHandler(
  socket: Socket,
  data: { messageId: string }
) {
  //@ts-ignore
  const user = socket?.user as EmployeeDocument;
  try {
    const update = await findAndUpdateEmployee(
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
  const user = socket?.user as EmployeeDocument;
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
  const user = socket?.user as EmployeeDocument;
  console.log("user", user);
  try {
    const data = await Employee.findOne({ _id: user._id }).populate(
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
    socket.emit(
      "employee-storage-important-image-result",
      data?.importantFiles
    );
  } catch (err) {}
}

export async function storageProjectImageHandler(
  socket: Socket,
  data: { projectId: string }
) {
  //@ts-ignore
  const user = socket?.user as EmployeeDocument;
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
    socket.emit("employee-storage-project-image-result", projects);
  } catch (err) {}
}

export async function imageDetailHandler(
  socket: Socket,
  data: { messageId: string }
) {
  //@ts-ignore
  const user = socket?.user as EmployeeDocument;

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
    socket.emit("employee-image-detail-result", {
      ...images[0],
      favorite: favorite ? true : false,
    });
  } catch (err) {}
}

async function employeeTaskDetailHandler(
  socket: Socket,
  data: { taskId: string; type: string }
) {
  let tasks: any[] = [];
  try {
    if (mongoose.isValidObjectId(data.taskId)) {
      let model: mongoose.Model<any> = Task;
      if (data.type == "personal") {
        model = SelfTask;
      }
      const taskDetail = await model
        .findOne({ _id: data.taskId })
        .populate("assignedEmployee", {
          username: 1,
          number: 1,
          email: 1,
          _id: 1,
          profileUri: 1,
        });
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
      socket.emit("employee-task-detail-result", {
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

  socket.emit("employee-search-employee-result", employees);
}

async function searchCustomerHandler(
  socket: Socket,
  data?: { primary?: boolean }
) {
  console.log("data", data);
  //@ts-ignore
  const user = socket.user as EmployeeDocument;
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

                  ...(data?.primary
                    ? [{ $eq: ["$primaryEmployee", user._id] }]
                    : []),
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
    ...(data?.primary ? [{ $match: { project: { $gt: 0 } } }] : []),
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
  socket.emit("employee-search-customer-result", customers);
}

async function employeeProjectHandler(socket: Socket, data: any) {
  //@ts-ignore
  const user = socket?.user as EmployeeDocument;
  const project = await aggregateProject([
    { $match: { "assignedEmployees.employeeId": user._id } },
    {
      $addFields: {
        primary: {
          $cond: {
            if: {
              $eq: [user._id, "$primaryEmployee"],
            },
            then: true,
            else: false,
          },
        },
      },
    },
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
  console.log(project);
  socket.emit("employee-project-result", project);
}

export async function initialEmployeeDataHandler(socket: Socket) {
  try {
    //@ts-ignore
    const user = socket.user! as EmployeeDocument;
    const branches = await aggregateBranch([{ $match: {} }]);
    const templates = await aggregateTemplate([{ $match: {} }]);
    const employees = await aggregateEmployee([
      { $match: { _id: { $ne: user._id } } },
    ]);
    const admins = await aggregateAdmin([{ $match: {} }]);
    socket.emit("initial-data-result", {
      employees,
      branches,
      templates,
      admins,
    });
  } catch (err) {
    console.log("error", err);
  }
}

async function employeeTaskHandler(
  socket: Socket,
  data: { projectId: string }
) {
  let tasks: any[] = [];
  //@ts-ignore
  const user = socket.user as EmployeeDocument;
  if (mongoose.isValidObjectId(data.projectId)) {
    const projectDetail = await aggregateProject([
      { $match: { _id: new mongoose.Types.ObjectId(data.projectId) } },
      {
        $addFields: {
          primary: {
            $cond: {
              if: {
                $eq: [user._id, "$primaryEmployee"],
              },
              then: true,
              else: false,
            },
          },
        },
      },
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
    const match: { [key: string]: any } = {};
    if (!projectDetail?.[0]?.primary) {
      match["assignedEmployee"] = user._id;
    }
    tasks = await aggregateTask([
      {
        $match: {
          projectId: new mongoose.Types.ObjectId(data.projectId),
          ...match,
        },
      },

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
    console.log("projectDetail", projectDetail[0]);
    socket.emit("employee-task-result", {
      tasks,
      projectDetail: projectDetail[0],
    });
  } else {
    return;
  }
}

async function employeeMeetingHandler(
  socket: Socket,
  data: { projectId: string }
) {
  //@ts-ignore
  const user = socket.user as EmployeeDocument;
  const project = await findProject({ _id: data.projectId });
  if (!project) {
    return;
  }
  const primary = project.primaryEmployee == user._id;
  const filter: { [key: string]: any } = {};
  if (!primary) {
    filter["employeeId"] = user._id;
  }
  const meetings = await aggregateMeeting([
    {
      $match: {
        projectId: new mongoose.Types.ObjectId(data.projectId),
        ...filter,
      },
    },
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
        participants: "$conversation.participants",
      },
    },
    { $sort: { createdAt: -1 } },
  ]);
  console.log(meetings);
  socket.emit("employee-project-meeting-result", meetings);
}

async function addAttendanceHandler(socket: Socket, data: any) {
  try {
    //@ts-ignore
    const user = socket.user! as EmployeeDocument;
    const currentDate = new Date();
    const dateCheck = new Date(
      `${currentDate.getUTCFullYear}-${currentDate.getUTCMonth}-${currentDate.getUTCDate}`
    );
    const attendance = await findAttendance({ date: dateCheck });
    if (attendance) {
      if (attendance.attendanceType == AttendanceType.Normal) {
        const employee = await findAttendance({
          date: dateCheck,
          "attendance.employeeId": user._id,
        });

        if (!employee) {
          attendance.attendance.push({
            employeeId: user._id,
            time: new Date(),
            approved: HolidayStatus.Pending,
          });
          await attendance.save();
        }
      } else {
        throw new CustomError(
          "Bad Request",
          404,
          `Hey enjoy, today is ${
            attendance.attendanceType == AttendanceType.Weekend
              ? "Weekend"
              : "holiday"
          }`
        );
      }
    } else {
      throw new CustomError("Bad Request", 404, "Attendance Not started yet");
    }
    getSocketServerInstance()
      ?.to(getActiveAdmins())
      .emit("New Attendance Added", {
        employeeId: user._id,
        time: new Date(),
        approved: false,
      });
  } catch (err) {
    socketError(err, socket, "add-attendance-response");
  }
}
