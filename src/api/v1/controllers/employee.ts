import axios from "axios";
import { query, Request, Response } from "express";
import checkError from "../helpers/checkErrors";
import { v4 as uuidv4 } from "uuid";
import CustomError from "../helpers/customError";
import {
  createEmployee,
  findAndUpdateEmployee,
  findEmployee,
  validatePassword,
} from "../services/employee";
import jwt from "jsonwebtoken";
import CustomJwtPayload from "../interfaces/jwtPayload";
import Employee, {
  EmployeeDocument,
  SickLeaveCategory,
} from "../models/employee";
import { createAttendance, findAttendance } from "../services/attendance";
import { findHoliday } from "../services/holiday";
import HolidayStatus from "../enums/holidayStatus";
import HolidayType from "../enums/holidayType";
import mongoose, { ClientSession } from "mongoose";
import { createTask, findAndUpdateTask, findTask } from "../services/task";
import { createComment, findComment } from "../services/comment";
import SendBy from "../enums/sendBy";
import MeetingMode from "../enums/meetingMode";
import moment from "moment";
import checkValidity from "../helpers/assignmentValidity";
import {
  createMeeting,
  findAndUpdateMeeting,
  findMeeting,
} from "../services/meeting";
import PointLocation from "../interfaces/pointLocation";
import MeetingStatus from "../enums/meetingStatus";
import Customer from "../models/customer";
import { SendOtp } from "../helpers/sendOtp";
import AttendanceType from "../enums/attendanceType";
import { findAndUpdateProject, findProject } from "../services/project.Service";
import { CommentDocument } from "../models/comment";
import Priority from "../enums/priority";
import TaskStatus from "../enums/taskStatus";
import { TaskInput } from "../models/task.model";
import Meeting, { MeetingEmployeeAction } from "../models/meeting";
import { findSetting } from "../services/setting.service";
import { RtcRole, RtcTokenBuilder } from "agora-access-token";
import { findAndUpdateConversation } from "../services/conversation.service";
import ConversationType from "../enums/conversationType";
import EmployeeRole from "../enums/role";
import {
  addConversationHandler,
  addSocketProjectHandler,
  deleteConversationHandler,
  deleteSocketProjectHandler,
  updateProjectStatusHandler,
} from "../socketHandlers/admin";
import BillingType from "../enums/billingType";
import PaymentStatus from "../enums/paymentStatus";
import { findCustomer } from "../services/customer";

export async function createEmployeeHandler(req: Request, res: Response) {
  var session: ClientSession = await mongoose.startSession();
  session.startTransaction();
  try {
    const code = Math.round(Math.random() * 8999 + 1000);
    const phone = req.body.number as string;

    const employee = await findEmployee(
      { number: phone },
      { _id: 1, codeValid: 1, code: 1 },
      { session }
    );
    console.log(employee);
    if (employee && !employee.codeValid) {
      throw new CustomError("Bad Request", 404, "Number already exists");
    }
    await SendOtp(code, phone);
    if (employee?.codeValid) {
      employee.code = code;
      await employee.save();
    } else {
      const count = await Employee.countDocuments({}, { session });
      await createEmployee({
        ...req.body,
        _id: `${moment().year()}-${moment().month()}-${count + 1}`,
        code,
        codeValid: true,
      });
    }

    res.status(201).send({
      message: "we send you a otp please enter here to verify your number",
    });
  } catch (err) {
    checkError(err, res);
  }
}

export async function updateProjectHandler(req: Request, res: Response) {
  try {
    const {
      projectId,
      name,
      billingType,
      priority,
      startDate,
      expectedEndDate,
      description,
    }: {
      projectId: string;
      name: string;
      billingType: BillingType;
      startDate: string;
      expectedEndDate: string;
      priority: Priority;
      description: string;
    } = req.body;
    const project = await findAndUpdateProject(
      { _id: projectId },
      { $set: req.body },
      { new: true }
    );

    res.send({
      message: `your project updated`,
    });
  } catch (error) {
    checkError(error, res);
  }
}

export async function completeProjectHandler(req: Request, res: Response) {
  try {
    const user = req.user! as EmployeeDocument;
    const project = await findProject({
      _id: req.body.projectId,
      clientApproved: true,
      status: { $nin: [TaskStatus.Declined] },
      paymentStatus: { $ne: PaymentStatus.Paid },
    });
    if (!project) {
      throw new CustomError(
        "Bad Request",
        404,
        "No such project found or project already declined"
      );
    }
    if (project.primaryEmployee != user._id) {
      throw new CustomError(
        "Bad Request",
        404,
        "You are not a primary employee for this project"
      );
    }
    const customer = await findCustomer({ _id: project.customerId });

    project.status = TaskStatus.Completed;

    let notificationMessage = `hey ${customer?.firstname},your task ${project.description} is completed.`;

    await project.save();
    await updateProjectStatusHandler(project, req.body);
    res.send({ message: `project ${project.description} is completed` });
  } catch (error) {
    checkError(error, res);
  }
}

export async function declinedProjectHandler(req: Request, res: Response) {
  try {
    const user = req.user! as EmployeeDocument;
    const task = await findAndUpdateProject(
      {
        _id: req.body.projectId,
        clientApproved: true,
        primaryEmployee: user._id,
        status: { $nin: [TaskStatus.Completed, TaskStatus.Declined] },
      },
      { $set: { status: TaskStatus.Declined } },
      { new: true }
    );
    if (!task) {
      throw new CustomError(
        "Bad Request",
        404,
        "No such project found or project completed or project already declined"
      );
    }

    await updateProjectStatusHandler(task, req.body);
    res.send({ message: `task with ${task.description} declined by you` });
  } catch (error) {
    checkError(error, res);
  }
}

export async function updateStatusHandler(req: Request, res: Response) {
  try {
    const user = req.user! as EmployeeDocument;
    const project = await findProject({
      _id: req.body.projectId,
      clientApproved: true,
      status: { $nin: [TaskStatus.Completed, TaskStatus.Declined] },
    });
    console.log("project", project);
    if (!project) {
      throw new CustomError(
        "Bad Request",
        404,
        "No such project found or project completed or project already declined"
      );
    }

    if (project.primaryEmployee != user._id) {
      throw new CustomError(
        "Bad Request",
        404,
        "You are not a primary employee for this project"
      );
    }

    project.status = req.body.status;
    await project.save();

    await updateProjectStatusHandler(project, req.body);
    res.send({ message: `project with ${project.description} status updated` });
  } catch (error) {
    checkError(error, res);
  }
}

export async function completeTaskHandler(req: Request, res: Response) {
  try {
    const task = await findTask({
      _id: req.body.taskId,
      status: { $nin: [TaskStatus.Declined] },
    });
    if (!task) {
      throw new CustomError(
        "Bad Request",
        404,
        "No such project found or project already declined"
      );
    }
    const timeLog = task.timeLog[0];
    if (timeLog && !timeLog.endTime) {
      task.timeLog[0].endTime = moment().toDate();
    }

    task.status = TaskStatus.Completed;

    await task.save();

    res.send({ message: `project ${task.name} is completed` });
  } catch (error) {
    checkError(error, res);
  }
}

export async function declinedTaskHandler(req: Request, res: Response) {
  try {
    const task = await findAndUpdateTask(
      {
        _id: req.body.taskId,
        status: { $nin: [TaskStatus.Completed, TaskStatus.Declined] },
      },
      { $set: { status: TaskStatus.Declined } },
      { new: true }
    );
    if (!task) {
      throw new CustomError(
        "Bad Request",
        404,
        "No such task found or task completed or task already declined"
      );
    }
    const timeLog = task.timeLog[0];
    if (timeLog && !timeLog.endTime) {
      task.timeLog[0].endTime = moment().toDate();
    }
    res.send({ message: `task with ${task.name} declined by you` });
  } catch (error) {
    checkError(error, res);
  }
}

export async function updateTaskStatusHandler(req: Request, res: Response) {
  try {
    const task = await findAndUpdateTask(
      {
        _id: req.body.taskId,
        status: { $nin: [TaskStatus.Completed, TaskStatus.Declined] },
      },
      { $set: { status: req.body.status } },
      { new: true }
    );

    if (!task) {
      throw new CustomError(
        "Bad Request",
        404,
        "No such project found or project completed or project already declined"
      );
    }

    res.send({ message: `task with ${task.name} status updated` });
  } catch (error) {
    checkError(error, res);
  }
}

export async function verifyEmployeeHandler(req: Request, res: Response) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    console.log(req.body);
    const employee = await findAndUpdateEmployee(
      {
        number: req.body.number,
        codeValid: true,
        code: parseInt(req.body.code),
      },
      { $set: { codeValid: false } },
      { session }
    );
    console.log(employee);
    if (!employee) {
      throw new CustomError("Bad credentials", 400, "please provide valid otp");
    }
    const token = await employee.generateAuthToken(req.body.webToken);
    const setting = await findSetting({});
    const date = moment().startOf("month");
    const types: { [key: string]: SickLeaveCategory } = {};
    console.log(
      "setting",
      //@ts-ignore
      setting?.types?.entries()?.next()?.value ?? {}
    );
    //@ts-ignore
    const iterator = setting?.types?.entries() ?? new Map().entries();
    let value = iterator.next().value;
    while (value) {
      types[value[0]] = { ...(value[1]?.toJSON() ?? value[1]) };
      value = iterator.next().value;
    }

    employee.sickLeave = setting ? [{ date: date.toDate(), types: types }] : [];
    await employee.save();
    await session.commitTransaction();
    res.status(200).send({
      employee: {
        ...employee.toJSON(),
        sickLeave: employee.sickLeave.map((value) => {
          //@ts-ignore
          return { ...value.toJSON(), types: Object.fromEntries(value.types) };
        }),
      },
      token,
    });
  } catch (err) {
    await session.abortTransaction();
    checkError(err, res);
  }
}

export async function forgotPasswordHandler(req: Request, res: Response) {
  try {
    const code = Math.round(Math.random() * 8999 + 1000);
    const phone = req.body.number as string;
    const admin = await findAndUpdateEmployee(
      { number: phone },
      { $set: { forgotOtp: code } },
      {}
    );
    if (!admin) {
      throw new CustomError("Bad Request", 404, "No such admin found");
    }
    await SendOtp(code, phone);

    res.status(201).send({
      message: "we send you a otp please enter here to verify your number",
    });
  } catch (err) {
    checkError(err, res);
  }
}

export async function verifyForgotOtpHandler(req: Request, res: Response) {
  try {
    console.log(req.body);
    const admin = await findEmployee({
      number: req.body.number,
      forgotOtp: req.body.code,
    });
    console.log(admin);
    if (!admin) {
      throw new CustomError("Bad credentials", 400, "please provide valid otp");
    }
    admin.forgotOtp = undefined;
    admin.password = req.body.password;
    await admin.save();
    res.status(200).send({ message: "Your password has been changed" });
  } catch (err) {
    checkError(err, res);
  }
}

export async function loginEmployeeHandler(req: Request, res: Response) {
  try {
    const employee = await validatePassword(req.body);
    if (!employee) {
      throw new CustomError(
        "Bad request",
        404,
        "Please Provide Right Credientials"
      );
    }
    const token = await employee.generateAuthToken(req.body.webToken);

    res.send({ employee, token });
  } catch (err) {
    checkError(err, res);
  }
}

export async function loginEmployeeAppHandler(req: Request, res: Response) {
  try {
    const employee = await validatePassword(req.body);
    if (!employee) {
      throw new CustomError(
        "Bad request",
        404,
        "Please Provide Right Credientials"
      );
    }
    const token = await employee.generateAuthToken(req.body.deviceToken);

    // res.cookie("jwt", "manish", { httpOnly: true });
    res.send({ employee, token });
  } catch (err) {
    checkError(err, res);
  }
}

export async function getStatusHandler(req: Request, res: Response) {
  try {
    const user = req.user! as EmployeeDocument;
    res.send({
      ...user?.toJSON(),
      sickLeave: user.sickLeave.map((value) => {
        //@ts-ignore
        return { ...value.toJSON(), types: Object.fromEntries(value.types) };
      }),
    });
  } catch (err) {
    checkError(err, res);
  }
}

export async function logoutEmployeeHandler(req: Request, res: Response) {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "") as string;
    console.log("token", token);
    if (!token) {
      throw new CustomError("Bad request", 401, "Please Authenticate first");
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as CustomJwtPayload;
    const employee = findAndUpdateEmployee(
      {
        _id: decoded._id,
        "tokens.token": token,
      },
      {
        $pull: {
          webToken: { token },
          tokens: { token },
        },
      },
      {}
    );

    if (!employee) {
      throw new CustomError("Bad request", 401, "Please Authenticate first");
    }

    res.send({ message: "You are successfully logout" });
  } catch (err) {
    checkError(err, res);
  }
}

export async function logoutEmployeeAppHandler(req: Request, res: Response) {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "") as string;
    console.log("token", token);
    if (!token) {
      throw new CustomError("Bad request", 401, "Please Authenticate first");
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as CustomJwtPayload;
    const employee = findAndUpdateEmployee(
      {
        _id: decoded._id,
        "tokens.token": token,
      },
      {
        $pull: {
          deviceToken: { token },
          tokens: { token },
        },
      },
      {}
    );

    if (!employee) {
      throw new CustomError("Bad request", 401, "Please Authenticate first");
    }

    res.send({ message: "You are successfully logout" });
  } catch (err) {
    checkError(err, res);
  }
}

export async function addAttendanceHandler(req: Request, res: Response) {
  try {
    const user = req.user! as EmployeeDocument;
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
    res.send({ message: "attendance successfully taken" });
  } catch (error) {
    checkError(error, res);
  }
}

export async function addHolidayRequestHandler(req: Request, res: Response) {
  try {
    const user = req.user! as EmployeeDocument;
    let {
      date,
      reason,
      type,
      sickId,
    }: { date: Date; reason: string; type: string; sickId: string } = req.body;
    if (moment(date).isBefore(moment())) {
      throw new CustomError("Bad Request", 404, "Date already passed");
    }

    console.log("date", date);
    const holiday = await findHoliday({
      start: { $lte: date },
      end: { $gt: date },
    });
    if (holiday) {
      throw new CustomError(
        "Bad Request",
        400,
        "This day was holiday declared by owner"
      );
    }

    const requestIndex = user.holidayRequest.findIndex((value) => {
      return moment(value.date).isSame(moment(date));
    });

    const value = user.sickLeave.find((value, index) => {
      if (
        moment(value.date)
          .startOf("month")
          .isSameOrBefore(moment(date).startOf("month"))
      ) {
        return true;
      } else {
        return false;
      }
    });
    if (!value) {
      throw new CustomError("Bad Request", 404, "No such type of leave found");
    }

    //@ts-ignore
    const leaves = Object.fromEntries(value.types);
    console.log("leaves", leaves);
    const totalLeaveTaken = user.holidayRequest.filter(
      (value) =>
        value.sickId.equals(sickId) &&
        value.type == type &&
        value.status == HolidayStatus.Approved
    );
    if (leaves[type]?.value - totalLeaveTaken.length <= 0) {
      throw new CustomError("Bad Request", 404, "No Remaining leave found");
    }
    if (requestIndex == -1) {
      user.holidayRequest.push({
        //@ts-ignore
        sickId: value._id,
        date: new Date(date),
        reason,

        status: HolidayStatus.Pending,
        holidayAdded: false,
        holidayType: HolidayType.Paid,
        type: type,
      });
    } else {
      throw new CustomError("Bad Request", 404, "Leave already added");
    }
    await user.save();
    res.send({ message: "your holiday request has been sent to owner" });
  } catch (error) {
    checkError(error, res);
  }
}

export async function removeHolidayRequestHandler(req: Request, res: Response) {
  try {
    const user = req.user! as EmployeeDocument;
    const { requestedId, reason }: { requestedId: string; reason: string } =
      req.body;
    const requestIndex = user.holidayRequest.findIndex(
      (value) =>
        //@ts-ignore
        (value._id as mongoose.Types.ObjectId).toString() == requestedId
    );
    if (requestIndex == -1) {
      throw new CustomError("Bad Request", 404, "No such request found");
    } else {
      user.holidayRequest[requestIndex].removalReason = reason;
      user.holidayRequest[requestIndex].removalRequest = true;
      await user.save();
    }

    res.send({
      message: "your holiday removal request has been sent to owner",
    });
  } catch (error) {
    checkError(error, res);
  }
}

export async function addCommentHandler(req: Request, res: Response) {
  try {
    const {
      taskId,
      commentId,
      comment,
    }: {
      taskId: mongoose.Types.ObjectId;
      commentId?: mongoose.Types.ObjectId;
      comment: string;
    } = req.body;
    const user = req.user! as EmployeeDocument;
    let oldComment: CommentDocument | null = null;
    if (commentId) {
      oldComment = await findComment(
        {
          _id: commentId,
        },
        { threads: 1 }
      );
      if (!oldComment) {
        throw new CustomError(
          "Bad Request",
          404,
          "No such comment for reply found"
        );
      } else {
      }
    }
    const task = await findTask(
      {
        _id: taskId,
      },
      { comments: 1, assignedEmployee: 1 }
    );
    if (!task) {
      throw new CustomError("Bad Request", 404, "No such task found");
    }

    if (task.assignedEmployee != user._id) {
      const project = await findProject({
        _id: task.projectId,
        primaryEmployee: user._id,
      });
      if (!project) {
        throw new CustomError(
          "Bad Request",
          400,
          "You are not part of this project"
        );
      }
    }

    const newComment = await createComment({
      senderId: user._id,
      sendBy: SendBy.Employee,
      parent: commentId ? false : true,
      taskId: task._id,
      threads: [],
      comment,
      senderProfile: user.profileUri,
      senderName: user.username,
    });
    if (oldComment) {
      oldComment.threads.push(newComment._id);
      await oldComment.save();
    } else {
      task.comments.push(newComment._id);
      await task.save();
    }
    res.send(newComment);
  } catch (error) {
    checkError(error, res);
  }
}

export async function requestMeetingHandler(req: Request, res: Response) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    let {
      projectId,
      startDate,
      mode,
      slotTime,
      endDate,
      comment,
      requestedLocation,
      employeeId,
    }: {
      projectId: mongoose.Types.ObjectId;
      startDate: Date;
      endDate?: Date;
      mode: MeetingMode;
      comment?: string;
      slotTime?: number;
      requestedLocation?: PointLocation;
      employeeId?: string;
    } = req.body;
    const user = req.user! as EmployeeDocument;
    const project = await findProject({
      _id: projectId,
    });

    if (!project) {
      throw new CustomError("Bad Request", 404, "No such project found ");
    }

    if (project.primaryEmployee != user._id) {
      throw new CustomError(
        "Bad Request",
        404,
        "You are not authorized to create the project"
      );
    }
    const finishedDate = moment(startDate).add(slotTime ?? 30, "minutes");
    let employee: EmployeeDocument | null = null;
    if (employeeId) {
      employee = await findEmployee({ _id: employeeId }, { schdule: 1 });
      if (!employee) {
        throw new CustomError(
          "Bad Request",
          400,
          "No any employee assigned to it"
        );
      }
      let invalid = false;
      if (mode == MeetingMode.Online) {
        invalid = checkValidity(startDate, finishedDate.toDate(), employee);
      } else {
        invalid = checkValidity(startDate, endDate!, employee);
      }

      if (invalid) {
        throw new CustomError(
          "Bad Request",
          404,
          "This slot is already booked please choose another date"
        );
      }
    }

    // employee.schdule.push({
    //   startTime: startDate,
    //   endTime: finishedDate.toDate(),
    //   taskId: task._id,
    // });
    const locationValue: { [key: string]: any } = {};
    if (mode == MeetingMode.Physical) {
      locationValue["requestedLocation"] = requestedLocation;
    }
    const meeting = await createMeeting({
      employeeId: employee?._id,
      projectId: project._id,
      requestedBy: SendBy.Employee,
      customerConfirmed: false,
      employeeConfirmed: employee?._id == user._id ? true : false,
      employeeHistory: employee
        ? [{ status: MeetingEmployeeAction.Pending, employeeId }]
        : [],
      customerId: project.customerId,
      comment,
      mode,
      meetingStartTime: startDate,
      meetingEndTime:
        mode == MeetingMode.Online ? finishedDate.toDate() : endDate,
      slotTime: 30,
      ...locationValue,
    });
    await session.commitTransaction();
    res.send(meeting);
  } catch (error) {
    await session.abortTransaction();
    checkError(error, res);
  }
}

export async function updateEmployeeMeetingHandler(
  req: Request,
  res: Response
) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const {
      meetingId,
      employeeId,
    }: { meetingId: mongoose.Types.ObjectId; employeeId: string } = req.body;
    const meeting = await findMeeting(
      {
        _id: meetingId,
        status: MeetingStatus.Pending,
      },
      {},
      { session }
    );

    if (!meeting) {
      throw new CustomError(
        "Bad Request",
        404,
        "No such meeting found or meeting completed previously"
      );
    }

    const user = req.user! as EmployeeDocument;
    const project = await findProject({
      _id: meeting.projectId,
    });

    if (!project) {
      throw new CustomError("Bad Request", 404, "No such project found ");
    }

    if (project.primaryEmployee != user._id) {
      throw new CustomError(
        "Bad Request",
        404,
        "You are not authorized to create the project"
      );
    }
    const employee = await findEmployee(
      { _id: employeeId },
      { schdule: 1 },
      { session }
    );
    if (!employee) {
      throw new CustomError(
        "Bad Request",
        400,
        "No any employee assigned to it"
      );
    }
    const invalid = checkValidity(
      meeting.meetingStartTime,
      meeting.meetingEndTime!,
      employee
    );
    if (invalid) {
      throw new CustomError(
        "Bad Request",
        404,
        "This slot is already booked please choose another date"
      );
    }
    if (meeting.employeeConfirmed) {
      const employee = await findAndUpdateEmployee(
        { _id: meeting.employeeId },
        { $pull: { schdule: { meetingId: meeting._id } } },
        { session }
      );
    }
    meeting.employeeId = employeeId;
    meeting.employeeConfirmed = false;
    meeting.employeeHistory.unshift({
      status: MeetingEmployeeAction.Pending,
      employeeId,
    });
    await meeting.save();
    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    checkError(err, res);
  }
}

export async function declineMeetingHandler(req: Request, res: Response) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { meetingId }: { meetingId: mongoose.Types.ObjectId } = req.body;

    const meeting = await findMeeting({
      _id: meetingId,
      status: MeetingStatus.Pending,
    });

    if (!meeting) {
      throw new CustomError(
        "Bad Request",
        404,
        "No such meeting found or meeting completed previously"
      );
    }

    const user = req.user! as EmployeeDocument;
    const project = await findProject({
      _id: meeting.projectId,
    });

    if (!project) {
      throw new CustomError("Bad Request", 404, "No such project found ");
    }

    if (project.primaryEmployee != user._id) {
      throw new CustomError(
        "Bad Request",
        404,
        "You are not authorized to create the project"
      );
    }

    if (meeting.employeeConfirmed && meeting.customerConfirmed) {
      const employee = await findAndUpdateEmployee(
        { _id: meeting.employeeId },
        { $pull: { schdule: { meetingId: meeting._id } } },
        { session }
      );
      if (!employee) {
        throw new CustomError(
          "Bad Request",
          400,
          "No any employee assigned to it"
        );
      }
    }
    meeting.meetingStatus = MeetingStatus.Declined;

    await meeting.save();
    await session.commitTransaction();
    res.send({ message: "your meeting has been declined" });
  } catch (error) {
    //@ts-ignore
    await session.abortTransaction();
    checkError(error, res);
  }
}

export async function completeMeetingHandler(req: Request, res: Response) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { meetingId }: { meetingId: mongoose.Types.ObjectId } = req.body;

    const meeting = await findMeeting({
      _id: meetingId,
      status: MeetingStatus.Pending,
    });

    if (!meeting) {
      throw new CustomError(
        "Bad Request",
        404,
        "No such meeting found or meeting completed previously"
      );
    }

    const user = req.user! as EmployeeDocument;
    const project = await findProject({
      _id: meeting.projectId,
    });

    if (!project) {
      throw new CustomError("Bad Request", 404, "No such project found ");
    }

    if (project.primaryEmployee != user._id) {
      throw new CustomError(
        "Bad Request",
        404,
        "You are not authorized to create the project"
      );
    }

    if (meeting.employeeConfirmed && meeting.customerConfirmed) {
      await findAndUpdateEmployee(
        { _id: meeting.employeeId },
        { $pull: { schdule: { meetingId: meeting._id } } },
        { session }
      );
    }
    meeting.meetingStatus = MeetingStatus.Completed;

    await meeting.save();
    await session.commitTransaction();
    res.send({ message: "your meeting has been completed" });
  } catch (error) {
    //@ts-ignore
    await session.abortTransaction();
    checkError(error, res);
  }
}

export async function createTaskCustomerHandler(req: Request, res: Response) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const {
      employeeId,
      description,
      name,
      expectedEndDate,
      projectId,

      priority,
    }: {
      employeeId?: string;
      name: string;

      expectedEndDate: string;
      priority: Priority;
      description: string;
      projectId: mongoose.Types.ObjectId;
      status: TaskStatus;
    } = req.body;
    const user = req.user as EmployeeDocument;

    const project = await findProject({ _id: projectId });
    console.log("body", req.body, project);
    if (!project || project.primaryEmployee != user._id) {
      throw new CustomError(
        "Bad Request",
        404,
        "No such project found or you are not authorized to create task"
      );
    }
    if (!project.clientApproved) {
      throw new CustomError(
        "Bad Request",
        404,
        "client doesnot approve quotation yet"
      );
    }
    if (!project.adminApproved) {
      throw new CustomError(
        "Bad Request",
        404,
        "Admin did not send the quotation yet"
      );
    }
    let employee: EmployeeDocument | null = null;
    if (employeeId) {
      employee = await findEmployee({ _id: employeeId });
      if (!employee) {
        throw new CustomError("Bad Request", 404, "No such employee found");
      }
      const index = project.assignedEmployees.findIndex(
        (value) => value.employeeId == employeeId
      );

      const conversation = await findAndUpdateConversation(
        { projectId: project._id, conversationType: ConversationType.Group },
        {
          $addToSet: {
            participants: {
              id: employee._id,
              participantType: SendBy.Employee,
              participantName: employee.username,
              participantProfile: employee.profileUri,
            },
          },
        },
        { session }
      );
      if (index == -1) {
        project.assignedEmployees.push({
          employeeId,
          role: EmployeeRole.Secondary,
          taskCount: 1,
        });
        let primaryEmployee: EmployeeDocument | undefined | null;
        if (project.primaryEmployee) {
          primaryEmployee = await findEmployee({
            _id: project.primaryEmployee,
          });
        }

        addSocketProjectHandler(employeeId, project, primaryEmployee);
        if (conversation) {
          addConversationHandler([conversation], [employeeId]);
        }
      } else {
        project.assignedEmployees[index].taskCount += 1;
      }
      await project.save();
    }
    const input: TaskInput = {
      projectId: projectId,
      customerId: project.customerId,
      name: name,
      assignedEmployee: employeeId,
      priority: priority,
      timeLog: [],
      previousEmployee: employeeId
        ? [
            {
              assignedBy: user.username,
              id: employeeId,
              profileUri: employee?.profileUri,
              assignedDate: new Date(),
              username: employee!.username,
            },
          ]
        : [],
      expectedEndDate: moment(expectedEndDate).toDate(),
      description,
      status: TaskStatus.Initiated,
    };
    const task = await createTask(input);
    await session.commitTransaction();
    res.send({ ...task.toJSON(), assignedEmployee: employee });
  } catch (error) {
    await session.abortTransaction();
    checkError(error, res);
  }
}

export async function assignTaskToEmployeeHandler(req: Request, res: Response) {
  try {
    const {
      taskId,

      employeeId,
    }: {
      taskId: mongoose.Types.ObjectId;
      employeeId: string;
    } = req.body;
    const user = req.user as EmployeeDocument;
    const task = await findTask({
      _id: taskId,
      status: { $nin: [TaskStatus.Completed, TaskStatus.Declined] },
    });
    if (!task) {
      throw new CustomError(
        "Bad Request",
        404,
        "No such task found or task completed or task declined"
      );
    }
    const project = await findProject({ _id: task.projectId });
    if (!project || project.primaryEmployee != user._id) {
      throw new CustomError(
        "Bad Request",
        404,
        "No such project found or you are not authorized to create task"
      );
    }

    const employee = await findEmployee({ _id: employeeId });
    if (!employee) {
      throw new CustomError("Bad Request", 404, "No such employee found");
    }

    if (task.assignedEmployee == employeeId) {
      throw new CustomError(
        "Bad Request",
        404,
        "This employee is already assigned to this task"
      );
    }

    if (!project) {
      throw new CustomError("Bad Request", 404, "No such project found");
    }
    let conversation = await findAndUpdateConversation(
      {
        projectId: task.projectId,
        conversationType: ConversationType.Group,
      },
      {
        $addToSet: {
          participants: {
            id: employee._id,
            participantType: SendBy.Employee,
            participantName: employee.username,
            participantProfile: employee.profileUri,
          },
        },
      },
      {}
    );
    if (!conversation) {
      throw new CustomError("Bad Request", 404, "No such conversation found");
    }
    if (task.assignedEmployee) {
      const index = project.assignedEmployees.findIndex(
        (value) => value.employeeId == task.assignedEmployee
      );
      if (index > -1) {
        if (project.assignedEmployees[index].taskCount <= 1) {
          if (project.assignedEmployees[index].role == EmployeeRole.Primary) {
            project.assignedEmployees[index].taskCount -= 1;
          } else {
            project.assignedEmployees.splice(index, 1);
            deleteSocketProjectHandler(task.assignedEmployee, project._id);

            if (conversation) {
              deleteConversationHandler(
                [conversation._id],
                task.assignedEmployee
              );
            }
          }
        } else {
          project.assignedEmployees[index].taskCount -= 1;
        }
      }
    }
    const date = new Date();
    if (task.previousEmployee.length > 0) {
      task.previousEmployee[0].removedBy = user._id;
      task.previousEmployee[0].removedDate = date;
    }
    task.assignedEmployee = employeeId;
    task.status = TaskStatus.Ongoing;
    const timeLog = task?.timeLog?.[0];
    if (timeLog && !timeLog.endTime) {
      task.timeLog[0].endTime = moment().toDate();
    }
    console.log("some new ", {
      assignedBy: user._id,
      assignedDate: date,
      id: employeeId,
      username: employee.username,
      profileUri: employee.profileUri,
    });
    task.previousEmployee = [
      {
        assignedBy: user._id,
        assignedDate: date,
        id: employeeId,
        username: employee.username,
        profileUri: employee.profileUri,
      },
      ...task.previousEmployee,
    ];
    console.log("task", task);
    const index = project.assignedEmployees.findIndex(
      (value) => value.employeeId == employeeId
    );
    if (index == -1) {
      project.assignedEmployees.push({
        employeeId,
        role: EmployeeRole.Secondary,
        taskCount: 1,
      });
      addConversationHandler([conversation], [employeeId]);
      addSocketProjectHandler(employeeId, project);
    } else {
      project.assignedEmployees[index].taskCount += 1;
    }
    await project.save();
    await task.save();

    res.send({
      message: `task with name ${
        task.description ?? "nothing"
      } assigned to employee with name ${employee.username}`,
    });
  } catch (error) {
    checkError(error, res);
  }
}

export async function commitMeetingHandler(req: Request, res: Response) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const user = req.user! as EmployeeDocument;
    const meeting = await findMeeting({
      _id: req.params.meetingId,
      employeeId: user._id,
      employeeConfirmed: false,
      meetingStatus: MeetingStatus.Pending,
    });

    if (!meeting) {
      throw new CustomError(
        "Bad Request",
        404,
        "No such meeting found or meeting already completed"
      );
    }

    if (!meeting.meetingEndTime) {
      throw new CustomError(
        "Bad Request",
        404,
        "End time is not defined by admin"
      );
    }
    const index = meeting.employeeHistory.findIndex(
      (value) => value.status == MeetingEmployeeAction.Pending
    );
    meeting.employeeHistory[index].status = MeetingEmployeeAction.Approved;
    meeting.employeeConfirmed = true;
    user.schdule.push({
      startTime: meeting.meetingStartTime,
      endTime: meeting.meetingEndTime,
      meetingId: meeting._id,
    });
    await meeting.save();
    await user.save();
    await session.commitTransaction();
    res.send({ message: "meeting is confirmed by you" });
  } catch (error) {
    await session.abortTransaction();
    checkError(error, res);
  }
}

export async function abortMeetingHandler(req: Request, res: Response) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const {
      meetingId,
      comment,
    }: { meetingId: mongoose.Types.ObjectId; comment: string } = req.body;
    const user = req.user! as EmployeeDocument;
    const meeting = await findMeeting({
      _id: meetingId,
      employeeId: user._id,
      employeeConfirmed: true,
      meetingStatus: MeetingStatus.Pending,
    });

    if (!meeting) {
      throw new CustomError(
        "Bad Request",
        404,
        "No such meeting found or meeting already completed"
      );
    }
    const index = meeting.employeeHistory.findIndex(
      (value) => value.status == MeetingEmployeeAction.Pending
    );
    meeting.employeeHistory[index].status = MeetingEmployeeAction.Declined;
    meeting.employeeHistory[index].reason = comment;
    meeting.employeeConfirmed = false;
    user.schdule = user.schdule.filter(
      (value) => !value.meetingId.equals(meeting._id)
    );

    await meeting.save();
    await user.save();
    await session.commitTransaction();
    res.send({ message: "meeting is confirmed by you" });
  } catch (error) {
    await session.abortTransaction();
    checkError(error, res);
  }
}

export async function employeeConnectMeetingHandler(
  req: Request,
  res: Response
) {
  try {
    const user = req.user! as EmployeeDocument;
    const { meetingId }: { meetingId: string } = req.body;
    const meeting = await findMeeting({
      _id: meetingId,
      // employeeId: user._id,
      mode: MeetingMode.Online,
    });
    if (!meeting) {
      throw new CustomError("Bad Request", 404, "No such meeting found");
    }

    // if (moment().add(5, "minute").isBefore(meeting.meetingStartTime)) {
    //   throw new CustomError("Bad request", 404, "Meeting is not started yet");
    // }

    // build the token with uid
    let token = RtcTokenBuilder.buildTokenWithUid(
      process.env.AGORA_ID as string,
      process.env.AGORA_CERTIFICATE as string,
      meeting._id.toString(),
      req.body.userId,
      RtcRole.PUBLISHER,
      Math.floor(Date.now() / 1000) + 3600
    );

    // return the token
    return res.json({ token: token });
  } catch (err) {
    checkError(err, res);
  }
}
