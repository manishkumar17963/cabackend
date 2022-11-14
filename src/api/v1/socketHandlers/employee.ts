import mongoose from "mongoose";
import { Socket } from "socket.io";
import {
  getActiveAdmins,
  getSocketServerInstance,
} from "../../../socket/serverStore";
import AttendanceType from "../enums/attendanceType";
import ConversationType from "../enums/conversationType";
import SendBy from "../enums/sendBy";
import TaskStatus from "../enums/taskStatus";
import { socketError } from "../helpers/checkErrors";
import CustomError from "../helpers/customError";
import Comment from "../models/comment";
import Employee, { EmployeeDocument } from "../models/employee";
import Message from "../models/message.model";
import Task from "../models/task.model";
import { aggregateAdmin } from "../services/admin";
import { findAttendance } from "../services/attendance";
import { aggregateBranch } from "../services/branch.service";
import { aggregateCustomer } from "../services/customer";
import { aggregateEmployee, findAndUpdateEmployee } from "../services/employee";
import { aggregateMeeting, findMeeting } from "../services/meeting";
import { aggregateMessage } from "../services/message.Service";
import { aggregateProject, findProject } from "../services/project.Service";
import { aggregateTask } from "../services/task";
import { aggregateTemplate } from "../services/template.service";

export function employeeSocketHandler(socket: Socket) {
  //@ts-ignore
  if (socket.type == SendBy.Employee) {
    socket.on("employee-project", async (data) => {
      await employeeProjectHandler(socket, data);
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
      await searchCustomerHandler(socket);
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
  }
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
    const branches = await aggregateBranch([{ $match: {} }]);
    const templates = await aggregateTemplate([{ $match: {} }]);
    const employees = await aggregateEmployee([{ $match: {} }]);
    const admins = await aggregateAdmin([{ $match: {} }]);
    socket.emit("initial-data-result", {
      employees,
      branches,
      templates,
      admins,
    });
  } catch (err) {}
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
      { $unwind: "$primaryEmployee" },

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
            approved: false,
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
