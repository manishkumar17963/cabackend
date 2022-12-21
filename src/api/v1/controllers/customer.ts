import axios from "axios";
import { Request, Response } from "express";
import checkError from "../helpers/checkErrors";
import CustomError from "../helpers/customError";
import { v4 as uuidv4 } from "uuid";
import mongoose, { ClientSession } from "mongoose";
import {
  createCustomer,
  findAndUpdateCustomer,
  findCustomer,
  validatePassword,
} from "../services/customer";
import jwt from "jsonwebtoken";
import CustomJwtPayload from "../interfaces/jwtPayload";
import { CustomerDocument } from "../models/customer";
import { createTask, findTask } from "../services/task";
import TaskStatus from "../enums/taskStatus";
import MeetingMode from "../enums/meetingMode";
import PointLocation from "../interfaces/pointLocation";
import moment from "moment";
import checkValidity from "../helpers/assignmentValidity";
import { findAndUpdateEmployee, findEmployee } from "../services/employee";
import {
  createMeeting,
  findAndUpdateMeeting,
  findMeeting,
} from "../services/meeting";
import SendBy from "../enums/sendBy";
import MeetingStatus from "../enums/meetingStatus";
import { createProject, findProject } from "../services/project.Service";
import {
  findAndUpdateQuotation,
  findQuotation,
} from "../services/quotation.Service";
import QuotationType from "../enums/quotationType.enum";
import { SendOtp } from "../helpers/sendOtp";
import { EmployeeDocument } from "../models/employee";
import { ProjectInput } from "../models/project.model";
import Priority from "../enums/priority";
import BillingType from "../enums/billingType";
import { findAllAdmin } from "../services/admin";
import Conversation, {
  ConversationInput,
  Participant,
} from "../models/conversation.model";
import ConversationType from "../enums/conversationType";
import {
  addProjectHandler,
  sendConversationHandler,
} from "../socketHandlers/admin";
import { AdminDocument } from "../models/admin";
import { RtcRole, RtcTokenBuilder } from "agora-access-token";
import getStateByGstNumber from "../helpers/gstWithState";
import MeetingType from "../enums/meetingType";
import { findConversation } from "../services/conversation.service";

export async function createCustomerHandler(req: Request, res: Response) {
  try {
    const code = Math.round(Math.random() * 8999 + 1000);
    const phone = req.body.number as string;

    const customer = await findCustomer({ number: phone }, { _id: 1 });
    if (customer) {
      throw new CustomError("Bad Request", 404, "Number already exists");
    }
    await SendOtp(code, phone);
    let state = req.body.state;
    if (req.body.gstNumber) {
      state = getStateByGstNumber(req.body.gstNumber);
    }
    await createCustomer({
      ...req.body,
      state,
      code,
      codeValid: true,
    });

    res.status(201).send({
      message: "we send you a otp please enter here to verify your number",
    });
  } catch (err) {
    checkError(err, res);
  }
}

export async function addMeetingHandler(req: Request, res: Response) {
  const session = await mongoose.startSession();
  session.startTransaction();
  const user = req.user! as CustomerDocument;
  try {
    let {
      conversationId,
      startDate,

      slotTime,

      comment,
    }: {
      conversationId?: mongoose.Types.ObjectId;
      startDate: Date;

      comment?: string;
      slotTime?: number;
    } = req.body;
    console.log("request", req.body);

    const finishedDate = moment(startDate).add(slotTime ?? 30, "minutes");

    // employee.schdule.push({
    //   startTime: startDate,
    //   endTime: finishedDate.toDate(),
    //   taskId: task._id,
    // });
    const conversation = await findConversation({
      _id: conversationId,
      conversationType: ConversationType.Primary,
    });
    if (!conversation) {
      throw new CustomError("Bad Request", 404, "No such conversation found");
    }
    const customer = conversation.participants.find(
      (value) => value.participantType == SendBy.Customer
    );
    if (!customer) {
      throw new CustomError(
        "Bad Request",
        404,
        "No such customer found for this id"
      );
    }
    const meeting = await createMeeting({
      requestedBy: SendBy.Admin,
      customerConfirmed: false,

      creatorId: { number: user.number, name: user.companyName, id: user._id },
      meetingType: MeetingType.Primary,
      conversationId,
      customerId: customer.id,
      comment: comment,
      mode: MeetingMode.Online,
      meetingStartTime: startDate,
      meetingEndTime: finishedDate.toDate(),
      slotTime: 30,
    });
    await session.commitTransaction();
    res.send(meeting);
  } catch (error) {
    await session.abortTransaction();
    checkError(error, res);
  }
}

export async function verifyCustomerHandler(req: Request, res: Response) {
  try {
    console.log(req.body);
    const customer = await findAndUpdateCustomer(
      { number: req.body.number, codeValid: true, code: req.body.code },
      { $set: { codeValid: false } },
      {}
    );
    console.log(customer);
    if (!customer) {
      throw new CustomError("Bad credentials", 400, "please provide valid otp");
    }
    const token = await customer.generateAuthToken(req.body.webToken);
    res.status(200).send({ customer, token });
  } catch (err) {
    checkError(err, res);
  }
}

export async function addKycHandler(req: Request, res: Response) {
  try {
    const user = req.user! as CustomerDocument;

    if (user.kycVerified) {
      throw new CustomError("Bad Request", 404, "Kyc already verified");
    }
    console.log("body", req.body);
    user.kycDetails = req.body;

    if (req.body.gstNumber) {
      const state = getStateByGstNumber(req.body.gstNumber);
      user.state = state;
      user.gstNumber = req.body.gstNumber;
    }

    await user.save();
    res.send({
      message:
        "your kyc details is successfully saved we will notify you when we verify your details",
    });
  } catch (err) {
    checkError(err, res);
  }
}

export async function loginCustomerHandler(req: Request, res: Response) {
  try {
    const customer = await validatePassword(req.body);
    if (!customer) {
      throw new CustomError(
        "Bad request",
        404,
        "Please Provide Right Credientials"
      );
    }
    const token = await customer.generateAuthToken(req.body.webToken);

    res.send({ customer, token });
  } catch (err) {
    checkError(err, res);
  }
}

export async function loginCustomerAppHandler(req: Request, res: Response) {
  try {
    const customer = await validatePassword(req.body);
    if (!customer) {
      throw new CustomError(
        "Bad request",
        404,
        "Please Provide Right Credientials"
      );
    }
    const token = await customer.generateAuthToken(req.body.deviceToken);

    // res.cookie("jwt", "manish", { httpOnly: true });
    res.send({ customer, token });
  } catch (err) {
    checkError(err, res);
  }
}

export async function logoutCustomerHandler(req: Request, res: Response) {
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
    const customer = findAndUpdateCustomer(
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

    if (!customer) {
      throw new CustomError("Bad request", 401, "Please Authenticate first");
    }

    res.send({ message: "You are successfully logout" });
  } catch (err) {
    checkError(err, res);
  }
}

export async function logoutCustomerAppHandler(req: Request, res: Response) {
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
    const customer = findAndUpdateCustomer(
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

    if (!customer) {
      throw new CustomError("Bad request", 401, "Please Authenticate first");
    }

    res.send({ message: "You are successfully logout" });
  } catch (err) {
    checkError(err, res);
  }
}

export async function getStatusHandler(req: Request, res: Response) {
  try {
    res.send(req.user);
  } catch (err) {
    checkError(err, res);
  }
}

export async function createTaskHandler(req: Request, res: Response) {
  try {
    const user = req.user! as CustomerDocument;

    const task = await createTask({
      customerId: user._id,

      description: req.body?.description ?? "",
      status: TaskStatus.Initiated,
      previousEmployee: [],
    });
    res.send({
      message: `your task is successfully created`,
    });
  } catch (error) {
    checkError(error, res);
  }
}

export async function requestMeetingHandler(req: Request, res: Response) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const user = req.user! as CustomerDocument;
    let {
      projectId,
      startDate,
      mode,
      slotTime,

      comment,
      requestedLocation,
    }: {
      projectId: mongoose.Types.ObjectId;
      startDate: Date;
      endDate?: Date;
      mode: MeetingMode;
      comment?: string;
      slotTime?: number;
      requestedLocation?: PointLocation;
    } = req.body;

    const project = await findProject({
      _id: projectId,
      customerId: user._id,
    });

    if (!project) {
      throw new CustomError("Bad Request", 404, "No such task found ");
    }
    const finishedDate = moment(startDate).add(slotTime ?? 30, "minutes");

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
      projectId: project._id,
      requestedBy: SendBy.Customer,
      customerConfirmed: true,
      creatorId: { number: user.number, name: user.companyName, id: user._id },
      customerId: project.customerId,
      comment,
      mode,
      meetingStartTime: startDate,
      meetingEndTime:
        mode == MeetingMode.Online ? finishedDate.toDate() : undefined,
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

export async function confirmMeetingHandler(req: Request, res: Response) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { meetingId }: { meetingId: mongoose.Types.ObjectId } = req.body;
    const customer = req.user! as CustomerDocument;

    const meeting = await findMeeting({
      _id: meetingId,
      customerId: customer._id,
      status: MeetingStatus.Pending,
    });

    if (!meeting) {
      throw new CustomError(
        "Bad Request",
        404,
        "No such meeting found or meeting completed previously"
      );
    }

    meeting.employeeConfirmed = true;

    await session.commitTransaction();
    await meeting.save();
    res.send({ message: "you confirmed the meeting" });
  } catch (error) {
    //@ts-ignore
    await session.abortTransaction();
    checkError(error, res);
  }
}

export async function declineMeetingHandler(req: Request, res: Response) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { meetingId }: { meetingId: mongoose.Types.ObjectId } = req.body;
    const customer = req.user! as CustomerDocument;

    const meeting = await findMeeting({
      _id: meetingId,
      customerId: customer._id,
      status: MeetingStatus.Pending,
    });

    if (!meeting) {
      throw new CustomError(
        "Bad Request",
        404,
        "No such meeting found or meeting completed previously"
      );
    }
    if (moment(meeting.meetingStartTime).isBefore(moment())) {
      throw new CustomError(
        "Bad Request",
        400,
        "Hey,you cannot cancel meeting after start time"
      );
    }
    if (meeting.employeeConfirmed) {
      const employee = await findAndUpdateEmployee(
        { _id: meeting.employeeId },
        { $pull: { schdule: { meetingId: meeting._id } } },
        { session }
      );
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

export async function approveQuotationHandler(req: Request, res: Response) {
  const {
    projectId,
    quotationId,
  }: {
    projectId: mongoose.Types.ObjectId;
    quotationId: mongoose.Types.ObjectId;
  } = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const project = await findProject({
      _id: projectId,
      status: { $in: [TaskStatus.Initiated, TaskStatus.Ongoing] },
    });
    if (!project) {
      throw new CustomError("Bad Request", 404, "No such project found");
    }
    const quotation = await findAndUpdateQuotation(
      {
        projectId,
        _id: quotationId,
        quotationType: QuotationType.Current,
        approved: false,
      },
      { $set: { approved: true } },
      { session }
    );
    if (!quotation) {
      throw new CustomError("Bad Request", 400, "No such quotation found");
    }
    project.clientApproved = true;
    await project.save();
    await session.commitTransaction();
    res.send({ message: "quotation successfully approved" });
  } catch (err) {
    await session.commitTransaction();
    checkError(err, res);
  }
}

export async function createProjectForCustomerHandler(
  req: Request,
  res: Response
) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const {
      projectName,

      startDate,
      expectedEndDate,
      description,
    }: {
      projectName: string;

      startDate: string;
      expectedEndDate: string;

      description: string;
    } = req.body;
    const user = req.user! as CustomerDocument;

    const input: ProjectInput = {
      customerId: user._id,
      name: projectName,
      assignedEmployees: [],
      priority: Priority.Default,
      billingType: BillingType.Billable,
      startDate: moment(startDate).toDate(),
      expectedEndDate: moment(expectedEndDate).toDate(),
      description,
      status: TaskStatus.Initiated,
      adminApproved: true,
      clientApproved: false,
      services: [],
    };
    const project = await createProject(input);
    const admins = await findAllAdmin({}, {}, { session });

    const participants: Participant[] = admins.map((value) => ({
      id: value._id,
      participantType: SendBy.Admin,
      participantName: value.username,
      participantProfile: value.profileUri,
    }));

    const conversations: ConversationInput[] = [
      {
        participants: [
          ...participants,
          {
            id: user._id?.toString(),
            participantType: SendBy.Customer,
            participantName: user.companyName,
            participantProfile: user.profileUri,
          },
        ],
        projectId: project._id,
        _id: new mongoose.Types.ObjectId(),
        projectName: project.name,
        conversationType: ConversationType.Project,
      },
      {
        participants,
        _id: new mongoose.Types.ObjectId(),
        projectId: project._id,
        projectName: project.name,
        conversationType: ConversationType.Group,
      },
    ];

    const conversation = await Conversation.insertMany(conversations, {
      session,
    });
    await session.commitTransaction();
    addProjectHandler(project);
    sendConversationHandler(conversations);
    res.send({
      message: `one project created`,
    });
  } catch (error) {
    await session.abortTransaction();
    checkError(error, res);
  }
}

export async function customerConnectMeetingHandler(
  req: Request,
  res: Response
) {
  try {
    const user = req.user! as AdminDocument;
    const { meetingId }: { meetingId: string } = req.body;

    const meeting = await findMeeting({
      _id: meetingId,
      customerId: user._id,
      mode: MeetingMode.Online,
    });
    if (!meeting) {
      throw new CustomError("Bad Request", 404, "No such meeting found");
    }
    console.log(
      "data",
      process.env.AGORA_ID as string,
      process.env.AGORA_CERTIFICATE as string
    );
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

export async function createRequestHandler(req: Request, res: Response) {
  try {
  } catch (err) {
    checkError(err, res);
  }
}
