import moment from "moment";
import mongoose, { mongo } from "mongoose";
import { emit } from "process";
import { Socket } from "socket.io";
import {
  getActiveAdmins,
  getActiveConnections,
  getSocketServerInstance,
} from "../../../socket/serverStore";
import ConversationType from "../enums/conversationType";
import InvoiceType from "../enums/invoiceType";
import PaymentStatus from "../enums/paymentStatus";
import QuotationType from "../enums/quotationType.enum";
import SendBy from "../enums/sendBy";
import TaskStatus from "../enums/taskStatus";
import Admin, { AdminDocument } from "../models/admin";
import { BranchDocument } from "../models/branch.model";
import Comment from "../models/comment";
import {
  ConversationDocument,
  ConversationInput,
} from "../models/conversation.model";
import { EmployeeDocument } from "../models/employee";

import { InvoiceDocument } from "../models/invoice.model";
import Message from "../models/message.model";
import { ProjectDocument } from "../models/project.model";
import { QuotationDocument } from "../models/quotation.model";
import Task, { TaskDocument } from "../models/task.model";
import { TemplateDocument } from "../models/template.model";
import { aggregateAdmin, findAndUpdateAdmin } from "../services/admin";
import { aggregateBranch } from "../services/branch.service";
import { aggregateCustomer } from "../services/customer";
import { aggregateEmployee } from "../services/employee";
import { aggregateInvoice } from "../services/invoice.service";
import { aggregateMeeting, findMeeting } from "../services/meeting";
import { aggregateMessage } from "../services/message.Service";
import {
  aggregateProject,
  findAndUpdateProject,
  findProject,
} from "../services/project.Service";
import { aggregateQuotation } from "../services/quotation.Service";
import { aggregateTask, findTask } from "../services/task";
import { aggregateTemplate } from "../services/template.service";

export function adminSocketHandler(socket: Socket) {
  //@ts-ignore
  if (socket.type == SendBy.Admin) {
    socket.on("admin-project", async (data) => {
      await adminProjectHandler(socket, data);
    });

    socket.on("admin-project-meeting", async (data) => {
      await adminMeetingHandler(socket, data);
    });

    socket.on("admin-task", async (data) => {
      await adminTaskHandler(socket, data);
    });

    socket.on("admin-task-detail", async (data) => {
      await adminTaskDetailHandler(socket, data);
    });

    socket.on("admin-employee", async (data) => {
      await adminEmployeeHandler(socket);
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

    socket.on("employee-srisudha", async (data) => {
      await employeeSrisudhaHandler(socket, data);
    });

    socket.on("assign-employee-meeting", async (data) => {
      await assignEmployeeMeeting(socket, data);
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
    socket.on("admin-image-detail", async (data) => {
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
  const dateCheck = moment(
    `${currentDate.year}-${currentDate.month}-${currentDate.date}`
  );
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

async function adminMeetingHandler(socket: Socket, data: any) {
  const meetings = await aggregateMeeting([
    { $match: { projectId: new mongoose.Types.ObjectId(data.projectId) } },
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
  getSocketServerInstance()
    ?.to([...adminConnection, ...customerConnection])
    .emit("add-invoice-result", { ...data.toJSON(), branch });
}
