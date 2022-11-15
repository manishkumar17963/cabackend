import moment from "moment";
import mongoose from "mongoose";
import { Socket } from "socket.io";
import {
  getActiveAdmins,
  getActiveConnections,
  getSocketServerInstance,
} from "../../../socket/serverStore";
import InvoiceType from "../enums/invoiceType";
import MeetingStatus from "../enums/meetingStatus";
import PaymentStatus from "../enums/paymentStatus";
import QuotationType from "../enums/quotationType.enum";
import SendBy from "../enums/sendBy";
import TaskStatus from "../enums/taskStatus";
import Customer, { CustomerDocument } from "../models/customer";
import Meeting from "../models/meeting";
import Message from "../models/message.model";
import Quotation from "../models/quotation.model";
import {
  aggregateCustomer,
  findAndUpdateCustomer,
  findCustomer,
} from "../services/customer";

import { aggregateInvoice } from "../services/invoice.service";
import {
  aggregateMeeting,
  findAllMeeting,
  findAndUpdateMeeting,
  findMeeting,
} from "../services/meeting";
import {
  aggregateMessage,
  findAllMessage,
  findMessage,
} from "../services/message.Service";
import { aggregateProject, findProject } from "../services/project.Service";
import {
  aggregateQuotation,
  findQuotation,
} from "../services/quotation.Service";
import { aggregateTask } from "../services/task";

export function customerSocketHandler(socket: Socket) {
  //@ts-ignore
  if (socket.type == SendBy.Customer) {
    socket.on("customer-project", async (data) => {
      console.log("customer projecr");
      await customerProjectHandler(socket, data);
    });

    socket.on("customer-date-meeting", async (data) => {
      await customerMeetingDateHandler(socket, data);
    });

    socket.on("confirm-meeting", async (data) => {
      await confirmMeetingHandler(socket, data);
    });

    socket.on("customer-project-detail", async (data) => {
      await customerTaskHandler(socket, data);
    });

    socket.on("customer-dashboard", async (data) => {
      await dashboardHandler(socket, data);
    });

    socket.on("customer-storage", async (data) => {
      console.log("storage emit ");
      await customerStorageHandler(socket, data);
    });

    socket.on("customer-storage-project", async (data) => {
      await storageProjectHandler(socket, data);
    });
    socket.on("customer-storage-project-image", async (data) => {
      await storageProjectImageHandler(socket, data);
    });

    socket.on("customer-storage-important-image", async (data) => {
      await storageImportantImageHandler(socket, data);
    });

    socket.on("customer-add-important-image", async (data) => {
      await addImportantHandler(socket, data);
    });
    socket.on("customer-remove-important-image", async (data) => {
      await removeImportantHandler(socket, data);
    });
    socket.on("customer-image-detail", async (data) => {
      await imageDetailHandler(socket, data);
    });

    socket.on(
      "approve-quotation",
      async (data) => await approveQuotationHandler(socket, data)
    );

    socket.on("customer-project-meeting", async (data) => {
      await customerMeetingHandler(socket, data);
    });

    socket.on("customer-invoice", async (data) => {
      await customerInvoiceHandler(socket, data);
    });
  }
}

async function customerMeetingDateHandler(
  socket: Socket,
  data: { date: string }
) {
  try {
    //@ts-ignore
    const user = socket.user as CustomerDocument;
    console.log(
      "date",
      data,
      moment(data.date).add(5, "hours").add(30, "minutes").toDate(),
      moment(data.date)
        .add(5, "hours")
        .add(30, "minutes")
        .add(1, "day")
        .toISOString()
    );
    const meetings = await Meeting.find({
      customerId: user._id,
      meetingStartTime: {
        $gte: moment(data.date).add(5, "hours").add(30, "minutes").toDate(),
        $lt: moment(data.date)
          .add(5, "hours")
          .add(30, "minutes")
          .add(1, "day")
          .toDate(),
      },
    }).sort({ meetingStartTime: 1 });

    socket.emit("customer-date-meeting-result", meetings);
  } catch (err) {}
}

async function confirmMeetingHandler(
  socket: Socket,
  data: { meetingId: string }
) {
  try {
    await findAndUpdateMeeting(
      { _id: data.meetingId, meetingStatus: { $ne: MeetingStatus.Completed } },
      { $set: { customerConfirmed: true } },
      {}
    );
  } catch (err) {}
}

async function dashboardHandler(socket: Socket, data: any) {
  try {
    //@ts-ignore
    const user = socket.user as CustomerDocument;
    const allProjects = await aggregateProject([
      { $match: { customerId: user._id } },
      { $group: { _id: "$status", count: { $count: {} } } },
    ]);
    const projects: { [key: string]: number } = {};
    allProjects.forEach((value) => {
      projects[value._id] = value.count;
    });

    const invoice = await aggregateInvoice([
      { $match: { customerId: user._id } },
      { $group: { _id: "$paymentStatus", count: { $count: {} } } },
    ]);
    const invoiceObject: { [key: string]: number } = {};
    invoice.forEach((value) => {
      invoiceObject[value._id] = value.count;
    });
    const quotation = await aggregateQuotation([
      {
        $match: { customerId: user._id, quotationType: QuotationType.Current },
      },
      { $group: { _id: "$approved", count: { $count: {} } } },
    ]);
    const quotationObject: { [key: string]: number } = {};
    quotation.forEach((value) => {
      quotationObject[value._id ? "approved" : "unapproved"] = value.count;
    });

    const meetings = await Meeting.find({
      customerId: user._id,
      meetingStartTime: {
        $gte: moment().startOf("day").toDate(),
        $lt: moment().startOf("day").add(1, "day").toDate(),
      },
    }).sort({ meetingStartTime: 1 });

    socket.emit("customer-dashboard-result", {
      meetings,
      quotation: quotationObject,
      invoice: invoiceObject,
      projects: projects,
    });
  } catch (err) {
    console.log("err", err);
  }
}

export async function initialCustomerDataHandler(socket: Socket) {
  try {
    //@ts-ignore
    const user = socket?.user as CustomerDocument;
    const quotations = await aggregateQuotation([
      {
        $match: { customerId: user._id, quotationType: QuotationType.Current },
      },
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
      { $group: { _id: "$projectId", quotation: { $push: "$$ROOT" } } },
      { $unwind: "$quotation" },
    ]);
    const invoices = await aggregateInvoice([
      {
        $match: { customerId: user._id },
      },
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
      quotations,
      invoices,
    });
  } catch (err) {
    console.log("err", err);
  }
}

export async function customerStorageHandler(socket: Socket, data: any) {
  //@ts-ignore
  const user = socket?.user as CustomerDocument;
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
    socket.emit("customer-storage-result", { uploads, shared });
  } catch (err) {}
}
export async function storageProjectHandler(socket: Socket, data: any) {
  //@ts-ignore
  const user = socket?.user as CustomerDocument;
  try {
    const projects = await aggregateProject([
      { $match: { customerId: user._id } },
      { $sort: { lastUploaded: -1 } },
      { $project: { name: 1, status: 1, files: 1, lastUploaded: 1 } },
    ]);

    socket.emit("customer-storage-project-result", projects);
  } catch (err) {}
}

export async function addImportantHandler(
  socket: Socket,
  data: { messageId: string }
) {
  //@ts-ignore
  const user = socket?.user as CustomerDocument;
  try {
    const update = await findAndUpdateCustomer(
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
  const user = socket?.user as CustomerDocument;
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
  const user = socket?.user as CustomerDocument;
  console.log("user", user);
  try {
    const data = await Customer.findOne({ _id: user._id }).populate(
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
      "customer-storage-important-image-result",
      data?.importantFiles
    );
  } catch (err) {}
}

export async function storageProjectImageHandler(
  socket: Socket,
  data: { projectId: string }
) {
  //@ts-ignore
  const user = socket?.user as CustomerDocument;
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
    socket.emit("customer-storage-project-image-result", projects);
  } catch (err) {}
}

export async function imageDetailHandler(
  socket: Socket,
  data: { messageId: string }
) {
  //@ts-ignore
  const user = socket?.user as CustomerDocument;

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
    socket.emit("customer-image-detail-result", {
      ...images[0],
      favorite: favorite ? true : false,
    });
  } catch (err) {}
}

async function approveQuotationHandler(
  socket: Socket,
  data: { projectId: string; quotationId: string }
) {
  try {
    const project = await findProject({ _id: data.projectId });
    if (!project) {
      return;
    }

    const quotation = await findQuotation({ _id: data.quotationId });
    if (!quotation) {
      return;
    }
    console.log("project some", project);
    project.clientApproved = true;
    quotation.approved = true;
    await quotation.save();
    await project.save();
    const adminConnection = getActiveAdmins();
    const activeConnections = getActiveConnections(
      quotation.customerId.toString()
    );
    getSocketServerInstance()
      ?.to([...adminConnection, ...activeConnections])
      .emit("approve-quotation-result", { ...data });
  } catch (err) {}
}

async function customerMeetingHandler(socket: Socket, data: any) {
  //@ts-ignore
  const user = socket.user as CustomerDocument;
  const meetings = await aggregateMeeting([
    {
      $match: {
        projectId: new mongoose.Types.ObjectId(data.projectId),
        customerId: user._id,
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
    { $sort: { meetingStartTime: 1 } },
  ]);
  console.log(meetings);
  socket.emit("customer-project-meeting-result", meetings);
}

async function customerProjectHandler(socket: Socket, data: any) {
  //@ts-ignore
  const user = socket.user as CustomerDocument;
  const project = await aggregateProject([
    { $match: { customerId: user._id } },
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
  socket.emit("customer-project-result", project);
}

async function customerTaskHandler(
  socket: Socket,
  data: { projectId: string }
) {
  let tasks: any[] = [];
  //@ts-ignore
  const user = socket.user as CustomerDocument;
  if (mongoose.isValidObjectId(data.projectId)) {
    const tasks = await aggregateTask([
      { $match: { projectId: new mongoose.Types.ObjectId(data.projectId) } },
      { $group: { _id: "$status", count: { $count: {} } } },
    ]);

    const taskStatus: { [key: string]: number } = { pending: 0, completed: 0 };
    tasks.forEach((value: { _id: string; count: number }) => {
      if (value._id != TaskStatus.Declined) {
        if (value._id == TaskStatus.Completed) {
          taskStatus["completed"] += value.count;
        } else {
          taskStatus["pending"] += value.count;
        }
      }
    });
    console.log("tasks", tasks, taskStatus);
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

      { $project: { assignedEmployees: 0 } },
    ]);

    socket.emit("customer-project-detail-result", {
      ...projectDetail[0],
      taskStatus,
    });
  }

  socket.emit("customer-task-result", { projectId: data.projectId, tasks });
}

async function customerInvoiceHandler(
  socket: Socket,
  data: { type: InvoiceType }
) {
  let value: any[] = [];
  //@ts-ignore
  const user = socket.user as CustomerDocument;
  if (data.type == InvoiceType.Quotation) {
    value = await aggregateQuotation([
      {
        $match: { customerId: user._id, quotationType: QuotationType.Current },
      },
      { $sort: { createdAt: -1 } },
    ]);
  } else {
    const match: { [key: string]: any } = { customerId: user._id };
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
  console.log("value", value);

  socket.emit("customer-invoice-result", { type: data.type, data: value });
}
