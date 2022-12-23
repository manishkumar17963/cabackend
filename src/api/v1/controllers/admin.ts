import axios from "axios";
import { query, Request, Response } from "express";
import checkError from "../helpers/checkErrors";
import CustomError from "../helpers/customError";
import { v4 as uuidv4 } from "uuid";
import { RtcRole, RtcTokenBuilder } from "agora-access-token";
import {
  createAdmin,
  findAdmin,
  findAllAdmin,
  findAndUpdateAdmin,
  validatePassword,
} from "../services/admin";
import jwt from "jsonwebtoken";
import CustomJwtPayload from "../interfaces/jwtPayload";
import mongoose, { ClientSession } from "mongoose";
import { findCustomer } from "../services/customer";
import {
  findAndUpdateEmployee,
  findEmployee,
  updateAllEmployee,
} from "../services/employee";
import {
  createTask,
  findAllTask,
  findAndUpdateTask,
  findTask,
} from "../services/task";
import TaskStatus from "../enums/taskStatus";

import moment from "moment";
import PaymentStatus from "../enums/paymentStatus";
import PaymentMethod from "../enums/paymentMethod";
import Admin, { AdminDocument } from "../models/admin";
import { createComment, findComment } from "../services/comment";
import SendBy from "../enums/sendBy";
import {
  createHoliday,
  findAndDeleteHoliday,
  findHoliday,
} from "../services/holiday";
import HolidayType from "../enums/holidayType";
import HolidayStatus from "../enums/holidayStatus";
import Priority from "../enums/priority";
import { createAttendance, findAttendance } from "../services/attendance";
import MeetingMode from "../enums/meetingMode";
import PointLocation from "../interfaces/pointLocation";
import checkValidity from "../helpers/assignmentValidity";
import { createMeeting, findMeeting } from "../services/meeting";
import MeetingStatus from "../enums/meetingStatus";
import Attendance from "../models/attendance";
import AttendanceType from "../enums/attendanceType";
import {
  createProject,
  findAndUpdateProject,
  findProject,
} from "../services/project.Service";
import { SendOtp } from "../helpers/sendOtp";
import { ProjectInput } from "../models/project.model";
import BillingType from "../enums/billingType";
import Task, { TaskInput } from "../models/task.model";
import {
  createQuotation,
  findQuotation,
  updateAllQuotation,
} from "../services/quotation.Service";
import QuotationRel from "../enums/quotationRel";
import {
  QuotationDocument,
  QuotationInput,
  ServiceInput,
} from "../models/quotation.model";
import QuotationType from "../enums/quotationType.enum";
import {
  createBranch,
  findAndUpdateBranch,
  findBranch,
} from "../services/branch.service";
import {
  createInvoice,
  findAndUpdateInvoice,
  findInvoice,
} from "../services/invoice.service";
import { createTemplate } from "../services/template.service";
import Conversation, {
  ConversationDocument,
  ConversationInput,
  Participant,
} from "../models/conversation.model";
import { EmployeeDocument, SickLeaveCategory } from "../models/employee";
import ConversationType from "../enums/conversationType";
import {
  createConversation,
  findAndUpdateConversation,
  findConversation,
  updateAllConversation,
} from "../services/conversation.service";
import { MeetingEmployeeAction } from "../models/meeting";
import {
  addBranchHandler,
  addConversationHandler,
  addInvoiceData,
  addProjectHandler,
  addQuotationData,
  addSocketProjectHandler,
  addTemplateHandler,
  deleteConversationHandler,
  deleteSocketProjectHandler,
  sendConversationHandler,
  updateConversationHandler,
  updateProjectStatusHandler,
  updateSocketProjectPrimaryEmployee,
} from "../socketHandlers/admin";
import EmployeeRole from "../enums/role";
import getStateByGstNumber from "../helpers/gstWithState";
import MeetingType from "../enums/meetingType";

export async function createAdminHandler(req: Request, res: Response) {
  try {
    const code = Math.round(Math.random() * 8999 + 1000);
    const phone = req.body.number as string;

    const admin = await findAdmin({ _id: phone });
    if (admin && !admin.codeValid) {
      throw new CustomError("Bad Request", 404, "Admin already exist");
    }

    await SendOtp(code);

    await createAdmin({
      ...req.body,
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

export async function verifyAdminHandler(req: Request, res: Response) {
  try {
    console.log(req.body);
    const admin = await findAndUpdateAdmin(
      { _id: req.body.number, codeValid: true, code: req.body.code },
      { $set: { codeValid: false } },
      {}
    );
    console.log(admin);
    if (!admin) {
      throw new CustomError("Bad credentials", 400, "please provide valid otp");
    }
    const token = await admin.generateAuthToken(req.body.webToken);
    const conversation = await updateAllConversation(
      {
        conversationType: {
          $in: [ConversationType.Group, ConversationType.Project],
        },
      },
      {
        $addToSet: {
          participants: {
            id: admin._id,
            participantType: SendBy.Employee,
            participantName: admin.username,
            participantProfile: admin.profileUri,
          },
        },
      },
      {}
    );
    res.status(200).send({ admin, token });
  } catch (err) {
    checkError(err, res);
  }
}

export async function forgotPasswordHandler(req: Request, res: Response) {
  try {
    const code = Math.round(Math.random() * 8999 + 1000);
    const phone = req.body.number as string;
    const admin = await findAndUpdateAdmin(
      { _id: phone },
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
    const admin = await findAdmin({
      _id: req.body.number,
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

export async function loginAdminHandler(req: Request, res: Response) {
  try {
    const admin = await validatePassword(req.body);
    if (!admin) {
      throw new CustomError(
        "Bad request",
        404,
        "Please Provide Right Credientials"
      );
    }
    const token = await admin.generateAuthToken(req.body.webToken);

    // res.cookie("jwt", "manish", { httpOnly: true });
    res.send({ admin, token });
  } catch (err) {
    checkError(err, res);
  }
}

export async function logoutAdminHandler(req: Request, res: Response) {
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
    const admin = findAndUpdateAdmin(
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

    if (!admin) {
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

export async function assignEmployeeToCustomerHandler(
  req: Request,
  res: Response
) {
  try {
    const {
      customerId,
      employeeId,
    }: { customerId: mongoose.Types.ObjectId; employeeId: string } = req.body;
    const customer = await findCustomer(
      { _id: customerId },
      { username: 1, number: 1, companyName: 1, profileUri: 1 }
    );
    if (!customer) {
      throw new CustomError("Bad Request", 404, "No such customer found");
    }
    const employee = await findEmployee({ _id: employeeId });
    if (!employee) {
      throw new CustomError("Bad Request", 404, "No such employee found");
    }
    let conversation = await findConversation({
      conversationType: ConversationType.Primary,
      "participants.id": customer._id.toString(),
    });
    if (customer.assignedEmployee && conversation) {
      deleteConversationHandler([conversation._id], customer.assignedEmployee);
    }
    customer.assignedEmployee = employeeId;

    const participants: Participant[] = [
      {
        participantName: customer.companyName,
        participantType: SendBy.Customer,
        participantProfile: customer.profileUri,
        id: customer._id?.toString(),
      },
      {
        participantName: employee.username,
        participantType: SendBy.Employee,
        participantProfile: employee?.profileUri,
        id: employeeId,
      },
    ];
    if (conversation) {
      conversation.participants = participants;
      await conversation.save();
    } else {
      conversation = await createConversation({
        conversationType: ConversationType.Primary,
        participants,
      });
    }
    updateConversationHandler([conversation]);
    await customer.save();
    res.send({
      message: `Employee with name ${employee.username} is assigned to customer with name ${customer.firstname} and number ${customer.number}`,
    });
  } catch (error) {
    checkError(error, res);
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
      customerId,
      services,
      employeeId,
      projectName,
      billingType,
      priority,
      startDate,
      expectedEndDate,
      description,
    }: {
      services: mongoose.Types.ObjectId[];
      customerId: mongoose.Types.ObjectId;
      employeeId?: string;
      projectName: string;
      billingType: BillingType;
      startDate: string;
      expectedEndDate: string;
      priority: Priority;
      description: string;
    } = req.body;
    const customer = await findCustomer(
      { _id: customerId },
      { username: 1, number: 1, companyName: 1 },
      { session }
    );
    if (!customer) {
      throw new CustomError("Bad Request", 404, "No such customer found");
    }
    let primaryEmployee: EmployeeDocument | null = null;
    if (employeeId) {
      primaryEmployee = await findEmployee(
        { _id: employeeId },
        {},
        { session }
      );
      if (!primaryEmployee) {
        throw new CustomError("Bad Request", 404, "No such employee found");
      }
    }
    const input: ProjectInput = {
      customerId: customerId,
      name: projectName,
      primaryEmployee: employeeId,
      assignedEmployees: employeeId
        ? [{ role: EmployeeRole.Primary, employeeId, taskCount: 0 }]
        : [],
      priority: priority,
      billingType: billingType,
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

    if (primaryEmployee) {
      participants.push({
        id: primaryEmployee._id,
        participantType: SendBy.Employee,
        participantName: primaryEmployee.username,
        participantProfile: primaryEmployee.profileUri,
      });
    }

    const conversations: ConversationInput[] = [
      {
        participants: [
          ...participants,
          {
            id: customer._id?.toString(),
            participantType: SendBy.Customer,
            participantName: customer.companyName,
            participantProfile: customer.profileUri,
          },
        ],
        _id: new mongoose.Types.ObjectId(),
        projectId: project._id,
        projectName: project.name,
        conversationType: ConversationType.Project,
      },
      {
        participants,
        projectId: project._id,
        projectName: project.name,
        _id: new mongoose.Types.ObjectId(),
        conversationType: ConversationType.Group,
      },
    ];
    const conversation = await Conversation.insertMany(conversations, {
      session,
    });
    await session.commitTransaction();
    addProjectHandler(
      project,
      primaryEmployee == null ? undefined : primaryEmployee
    );
    sendConversationHandler(conversations);
    res.send({
      message: `one project created`,
    });
  } catch (error) {
    await session.abortTransaction();
    checkError(error, res);
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

export async function changePrimaryEmployeeHandler(
  req: Request,
  res: Response
) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const {
      employeeId,

      projectId,
    }: {
      employeeId: string;

      projectId: mongoose.Types.ObjectId;
    } = req.body;
    const project = await findProject({ _id: projectId });
    if (!project) {
      throw new CustomError("Bad request", 404, "No such project found");
    }
    const employee = await findEmployee({ _id: employeeId });
    if (!employee) {
      throw new CustomError("Bad request", 404, "No such employee found");
    }
    let primaryConversation = await findAndUpdateConversation(
      {
        projectId: projectId,
        conversationType: ConversationType.Project,
      },
      {
        $pull: { participants: { id: project.primaryEmployee } },
      },
      { session }
    );

    console.log("primary", primaryConversation);
    if (!primaryConversation) {
      throw new CustomError("Bad Request", 404, "No such conversation found");
    }
    primaryConversation.participants.push({
      id: employee._id,
      participantType: SendBy.Employee,
      participantName: employee.username,
      participantProfile: employee.profileUri,
    });
    await primaryConversation.save();
    if (project.primaryEmployee) {
      const index = project.assignedEmployees.findIndex(
        (value) => value.employeeId == project.primaryEmployee
      );
      if (index > -1) {
        const conversationIds = [primaryConversation._id];
        if (project.assignedEmployees[index].taskCount >= 1) {
          project.assignedEmployees[index].role = EmployeeRole.Secondary;
        } else {
          project.assignedEmployees.splice(index, 1);
          deleteSocketProjectHandler(project.primaryEmployee, project._id);
          let groupConversation = await findAndUpdateConversation(
            {
              projectId: projectId,
              conversationType: ConversationType.Group,
            },
            {
              $pull: { participants: { id: project.primaryEmployee } },
            },
            { session }
          );

          if (groupConversation) {
            conversationIds.push(groupConversation._id);
          }
        }
        deleteConversationHandler(conversationIds, project.primaryEmployee);
      }
    }
    const index = project.assignedEmployees.findIndex(
      (value) => value.employeeId == employeeId
    );
    const conversations = [primaryConversation];
    if (index <= -1) {
      project.assignedEmployees.push({
        employeeId,
        role: EmployeeRole.Primary,
        taskCount: 1,
      });
      addSocketProjectHandler(employeeId, project, employee, true);
      let groupConversation = await findAndUpdateConversation(
        {
          projectId: projectId,
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
        { session }
      );
      if (groupConversation) {
        conversations.push(groupConversation);
      }
    } else {
      project.assignedEmployees[index].taskCount += 1;
      project.assignedEmployees[index].role = EmployeeRole.Primary;
    }
    addConversationHandler(conversations, [employeeId]);
    project.primaryEmployee = employeeId;

    await project.save();
    updateSocketProjectPrimaryEmployee(project, employee);
    await session.commitTransaction();
    res.send({ message: "employee successfully saved" });
  } catch (err) {
    await session.abortTransaction();
    checkError(err, res);
  }
}

export async function createTaskCustomerHandler(req: Request, res: Response) {
  const session = await mongoose.startSession();
  session.startTransaction();
  const user = req.user as AdminDocument;
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
    const project = await findAndUpdateProject(
      {
        _id: projectId,
        status: { $in: [TaskStatus.Initiated, TaskStatus.Ongoing] },
      },
      { $set: { status: TaskStatus.Ongoing } },
      { session }
    );
    if (!project) {
      throw new CustomError("Bad Request", 404, "No such project found");
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
        "please first send the quotation to customer"
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
    }: { taskId: mongoose.Types.ObjectId; employeeId: string } = req.body;
    const user = req.user as AdminDocument;
    const employee = await findEmployee({ _id: employeeId });
    if (!employee) {
      throw new CustomError("Bad Request", 404, "No such employee found");
    }

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

    if (task.assignedEmployee == employeeId) {
      throw new CustomError(
        "Bad Request",
        404,
        "This employee is already assigned to this task"
      );
    }
    const project = await findProject({ _id: task.projectId });
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

export async function removeEmployeeFromTaskHandler(
  req: Request,
  res: Response
) {
  const session = await mongoose.startSession();
  session.startTransaction();
  const user = req.user! as AdminDocument;
  try {
    const task = await findAndUpdateTask(
      {
        _id: req.params.taskId,

        status: { $nin: [TaskStatus.Completed, TaskStatus.Declined] },
      },
      { $unset: { assignedEmployee: "" } },
      { session }
    );
    if (!task) {
      throw new CustomError(
        "Bad Request",
        404,
        "No such task found with this id or task completed or declined"
      );
    }
    const project = await findProject({ _id: task.projectId });
    if (!project) {
      throw new CustomError("Bad Request", 404, "No such project found");
    }
    if (task.assignedEmployee) {
      const conversation = await findAndUpdateConversation(
        {
          projectId: task?.projectId,
          conversationType: ConversationType.Group,
        },
        {
          $pull: {
            participants: {
              id: task.assignedEmployee,
            },
          },
        },
        { session }
      );
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
        await project.save();
      }
      if (task.previousEmployee.length > 0) {
        task.previousEmployee[0].removedBy = user._id;
        task.previousEmployee[0].removedDate = new Date();
        await task.save();
      }
    } else {
      throw new CustomError("Bad Request", 404, "No employee assigned yet");
    }

    await session.commitTransaction();
    res.send({ message: "Employee remove successfully" });
  } catch (err) {
    await session.abortTransaction();
    checkError(err, res);
  }
}

export async function removeEmployeeFromProjectHandler(
  req: Request,
  res: Response
) {
  const session = await mongoose.startSession();
  session.startTransaction();
  const user = req.user! as AdminDocument;
  try {
    const project = await findAndUpdateProject(
      {
        _id: req.params.projectId,

        primaryEmployee: { $exists: true },
        status: { $nin: [TaskStatus.Completed, TaskStatus.Declined] },
      },
      { $unset: { primaryEmployee: "" } },
      { session }
    );
    if (!project) {
      throw new CustomError(
        "Bad Request",
        404,
        "No such project found with this id or project completed or declined or there is no alloted employee"
      );
    }
    if (project.primaryEmployee) {
      await updateAllConversation(
        {
          projectId: project._id,
        },
        { $pull: { participants: { id: project.primaryEmployee } } },
        { session }
      );
    }

    const index = project.assignedEmployees.findIndex(
      (value) => value.employeeId == project.primaryEmployee
    );
    if (index > -1) {
      if (project.assignedEmployees[index].taskCount > 0) {
        project.assignedEmployees[index].role = EmployeeRole.Secondary;
      } else {
        project.assignedEmployees.splice(index, 1);
      }
      await project.save();
    }

    res.send({ message: "Primary Employee remove successfully" });
  } catch (err) {
    await session.abortTransaction();
    checkError(err, res);
  }
}

export async function completeProjectHandler(req: Request, res: Response) {
  try {
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
    const tasks = await Task.updateMany(
      {
        projectId: project._id,
        status: { $nin: [TaskStatus.Declined] },
      },
      { $set: { status: TaskStatus.Completed } },
      {}
    );
    await Task.updateMany(
      {
        projectId: project._id,
        "timeLog.endTime": { $exists: false },
      },
      { $set: { "timeLog.$.endTime": moment().toDate() } },
      {}
    );

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
    const task = await findAndUpdateProject(
      {
        _id: req.body.projectId,
        clientApproved: true,
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
    await updateProjectStatusHandler(task, req.body);
    res.send({ message: `task with ${task.description} declined by you` });
  } catch (error) {
    checkError(error, res);
  }
}

export async function updateStatusHandler(req: Request, res: Response) {
  try {
    const project = await findAndUpdateProject(
      {
        _id: req.body.projectId,
        clientApproved: true,
        status: { $nin: [TaskStatus.Completed, TaskStatus.Declined] },
      },
      { $set: { status: req.body.status } },
      { new: true }
    );
    console.log("project", project);
    if (!project) {
      throw new CustomError(
        "Bad Request",
        404,
        "No such project found or project completed or project already declined"
      );
    }
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

    task.status = TaskStatus.Completed;
    const timeLog = task.timeLog[0];
    if (timeLog && !timeLog.endTime) {
      task.timeLog[0].endTime = moment().toDate();
    }

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
    await task.save();
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

    res.send({ message: `project with ${task.name} status updated` });
  } catch (error) {
    checkError(error, res);
  }
}
export async function addQuotationHandler(req: Request, res: Response) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const project = await findProject(
      {
        _id: req.body.projectId,
        status: { $nin: [TaskStatus.Declined, TaskStatus.Completed] },
      },
      {},
      { session }
    );
    if (!project) {
      throw new CustomError(
        "Bad Request",
        404,
        "No Such project found or project already completed"
      );
    }

    const quotation: QuotationDocument | null = await findQuotation(
      {
        projectId: project._id,
        quotationRel: QuotationRel.Parent,
      },
      {},
      { session }
    );

    let quotationNo = quotation?.quotationNo;

    const branch = await findBranch({ _id: req.body.branchId });
    if (!branch) {
      throw new CustomError("Bad Request", 404, "No such branch found");
    }
    const quotationInput: QuotationInput = {
      projectName: project.name,
      gstNumber: branch.gstNumber,
      customerId: project.customerId,
      projectId: project._id,
      quotationType: QuotationType.Current,
      version: (quotation?.runningVersion ?? 0) + 1,

      quotationRel: QuotationRel.Child,
      templateId: req.body.templateId,
      branchId: req.body.branchId,
      quotationNo:
        quotationNo && req.body.branchId == quotation?.branchId
          ? quotationNo
          : branch?.appendId + ((branch?.quotationNo ?? 0) + 1),
      details: req.body.details,
      additionalNotes: req.body.additionalNotes,
      terms: req.body.terms,
      approved: false,
      createdBy: req.id!.toString(),
      services: req.body.services,
    };
    if (!quotation) {
      quotationInput.quotationRel = QuotationRel.Parent;
      quotationInput.runningVersion = 1;
    } else {
      await updateAllQuotation(
        { projectId: project._id, quotationType: QuotationType.Current },
        { $set: { quotationType: QuotationType.OutDated } },
        { session }
      );
      quotation.runningVersion = (quotation.runningVersion ?? 0) + 1;
      await quotation.save();
    }

    const newQuotation = await createQuotation(quotationInput);
    project.quotationId.push(newQuotation._id);
    project.adminApproved = true;
    await project.save();
    if (!quotationNo || req.body.branchId != quotation?.branchId) {
      branch.quotationNo += 1;
      await branch.save();
    }
    const customer = await findCustomer({ _id: project.customerId });

    let notificationMessage = `hey ${customer?.firstname}, New Quotation for project ${project.name} has been added.`;
    await session.commitTransaction();
    addQuotationData(newQuotation, branch);
    res.send({ message: "New Quotation Added" });
  } catch (err) {
    await session.abortTransaction();
    checkError(err, res);
  }
}

export async function addInvoiceHandler(req: Request, res: Response) {
  try {
    console.log("body", req.body);
    const project = await findProject({
      _id: req.body.projectId,
      paymentStatus: { $ne: PaymentStatus.Paid },
      status: { $in: [TaskStatus.Completed] },
    });
    if (!project) {
      throw new CustomError(
        "Bad Request",
        404,
        "No Such project found or payment already paid"
      );
    }
    const customer = await findCustomer({
      _id: project?.customerId,
    });
    if (!customer) {
      throw new CustomError("Bad Request", 404, "No Such Customer found");
    }
    let invoice = await findInvoice({
      projectId: project._id,
      paymentStatus: PaymentStatus.Unpaid,
    });

    const branch = await findBranch({ _id: req.body.branchId });
    if (!branch) {
      throw new CustomError("Bad Request", 404, "No such branch found");
    }
    const amount = (req.body.services as ServiceInput[]).reduce(
      (total, value) => total + value.price,
      0
    );
    const sameCity = branch.state == customer.state;
    const tax = (amount * req.body.taxPercentage) / 100;
    if (invoice) {
      invoice.notes = req.body.notes;
      if (!invoice.branchId == branch._id) {
        invoice.branchId = branch._id;
        invoice.invoiceNo = branch.appendId + (branch.invoiceNo + 1);
        branch.invoiceNo += 1;
        await branch.save();
      }
      invoice.cgst = sameCity ? tax / 2 : tax;
      invoice.taxPercentage = req.body.taxPercentage;
      invoice.sameCity = sameCity;
      invoice.sgst = sameCity ? tax / 2 : 0;
      invoice.gstNumber = branch.gstNumber;
      invoice.expectedPaymentDate = moment(
        req.body.expectedPaymentDate
      ).toDate();
      invoice.amount = amount;
      invoice.createdBy = req.id!.toString();
      invoice.services = req.body.services;
      await invoice.save();
    } else {
      invoice = await createInvoice({
        customerId: project.customerId,
        projectId: project._id,
        notes: req.body.notes,
        branchId: branch._id,
        projectName: project.name,
        invoiceNo: branch.appendId + (branch.invoiceNo + 1),
        amount: amount,
        expectedPaymentDate: moment(req.body.expectedPaymentDate).toDate(),
        paymentStatus: PaymentStatus.Unpaid,
        createdBy: req.user!._id.toString(),
        services: req.body.services,
        cgst: sameCity ? tax / 2 : tax,
        taxPercentage: req.body.taxPercentage,
        sameCity: sameCity,
        sgst: sameCity ? tax / 2 : 0,
        gstNumber: branch.gstNumber,
      });
      branch.invoiceNo += 1;
      await branch.save();
      project.invoiceId = invoice._id;
      project.paymentInitiated = true;
    }
    project.paymentStatus = PaymentStatus.Unpaid;
    project.expectedPaymentDate = moment(req.body.expectedPaymentDate).toDate();
    project.paymentAmount = amount;
    await project.save();

    let notificationMessage = `hey ${customer?.firstname},your project ${
      project.description
    } is completed and admin initiate the payment of ${amount},please pay before ${moment(
      req.body.expectedPaymentDate
    ).format("DD-MM-YYYY")}`;

    addInvoiceData(invoice, branch);
    res.send({ message: "New invoice Added" });
  } catch (err) {
    checkError(err, res);
  }
}

export async function changePaymentStatusManuallyHandler(
  req: Request,
  res: Response
) {
  try {
    const {
      projectId,
      paymentMethod,
      transactionId,
      actualPaymentDate,
    }: {
      projectId: mongoose.Types.ObjectId;
      actualPaymentDate: Date;
      paymentMethod: PaymentMethod;
      transactionId?: string;
    } = req.body;

    const project = await findProject({
      _id: projectId,
      status: TaskStatus.Completed,
      paymentStatus: { $ne: PaymentStatus.Paid },
      paymentInitiated: true,
    });

    const invoice = await findAndUpdateInvoice(
      { _id: projectId },
      { $set: { actualPaymentDate, paymentStatus: PaymentStatus.Paid } },
      {}
    );

    if (!project || !invoice) {
      throw new CustomError(
        "Bad Request",
        404,
        "No such project found or payment not initiated"
      );
    }
    const customer = await findCustomer({ _id: project.customerId });

    project.paymentStatus = PaymentStatus.Paid;
    project.paymentMethod = paymentMethod;
    project.actualPaymentDate = actualPaymentDate;
    if (transactionId && PaymentMethod.Online == paymentMethod) {
      project.transactionId = transactionId;
    }
    let notificationMessage = `hey ${customer?.firstname},your project ${project.description} amount is cleared by admin manually`;
    await project.save();
    res.send({ message: `project  ${project.description} payment paid` });
  } catch (error) {}
}

export async function addCommentHandler(req: Request, res: Response) {
  try {
    const {
      taskId,
      commentId,
      comment,
    }: {
      taskId: mongoose.Types.ObjectId;
      commentId: mongoose.Types.ObjectId;
      comment: string;
    } = req.body;
    const admin = req.user! as AdminDocument;
    const project = await findTask(
      {
        _id: taskId,
      },
      { comments: 1 }
    );
    if (!project) {
      throw new CustomError("Bad Request", 404, "No such task found");
    }
    const newComment = await createComment({
      senderId: admin._id,
      sendBy: SendBy.Admin,
      parent: commentId ? false : true,
      taskId,
      threads: [],
      comment,
      senderProfile: admin.profileUri,
      senderName: admin.username,
    });
    if (commentId) {
      const oldComment = await findComment(
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
      }
      oldComment.threads.push(newComment._id);
      await oldComment.save();
    } else {
      project.comments.push(newComment._id);
      await project.save();
    }
    res.send(newComment);
  } catch (error) {
    checkError(error, res);
  }
}

export async function approveHolidayHandler(req: Request, res: Response) {
  var session: ClientSession = await mongoose.startSession();
  session.startTransaction();
  try {
    const {
      employeeId,
      holidayRequestId,
    }: {
      employeeId: string;
      holidayRequestId: mongoose.Types.ObjectId;
    } = req.body;
    const admin = req.user! as AdminDocument;

    const employee = await findAndUpdateEmployee(
      { _id: employeeId, "holidayRequest._id": holidayRequestId },
      {
        $set: {
          "holidayRequest.$.status": HolidayStatus.Approved,
          "holidayRequest.$.approvedBy": admin._id,
        },
      },
      { new: true, projection: { "holidayRequest.$": 1 }, session }
    );
    if (!employee) {
      throw new CustomError(
        "Bad Request",
        404,
        "No such holiday found for this employee"
      );
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
      throw new CustomError("Bad Request", 404, "No such type of leave found");
    }

    //@ts-ignore
    const types = Object.fromEntries(employee.sickLeave[index].types);
    if (
      types[employee.holidayRequest[0].type].value -
        types[employee.holidayRequest[0].type].completed <=
      0
    ) {
      throw new CustomError("Bad Request", 404, "No Remaining live found");
    }
    employee.sickLeave = [
      ...employee.sickLeave.slice(0, index),
      {
        ...employee.sickLeave[index],
        types: {
          ...types,
          [employee.holidayRequest[0].type]: {
            ...types[employee.holidayRequest[0].type],
            completed: types[employee.holidayRequest[0].type].completed + 1,
          },
        },
      },
      ...employee.sickLeave.slice(index + 1),
    ];
    await employee.save();
    await session.commitTransaction();
    res.send({
      message: `holiday of employee ${employee.username} is approved`,
    });
  } catch (error) {
    await session.abortTransaction();
    checkError(error, res);
  }
}

export async function denyHolidayHandler(req: Request, res: Response) {
  try {
    const {
      employeeId,
      holidayRequestId,
    }: {
      employeeId: string;
      holidayRequestId: mongoose.Types.ObjectId;
      holidayType?: HolidayType;
    } = req.body;
    const admin = req.user! as AdminDocument;
    const employee = await findAndUpdateEmployee(
      { _id: employeeId, "holidayRequest._id": holidayRequestId },
      {
        $set: {
          "holidayRequest.$.status": HolidayStatus.Denied,
        },
      },
      { new: true }
    );
    if (!employee) {
      throw new CustomError(
        "Bad Request",
        404,
        "No such holiday found for this employee"
      );
    }

    res.send({
      message: `holiday of employee ${employee.username} is denied`,
    });
  } catch (error) {
    checkError(error, res);
  }
}

export async function updateTaskHandler(req: Request, res: Response) {
  try {
    const task = await findAndUpdateTask(
      {
        _id: req.params.taskId,
        status: { $in: [TaskStatus.Initiated, TaskStatus.Ongoing] },
      },
      { $set: req.body },
      {}
    );
    if (task) {
      throw new CustomError(
        "Bad Request",
        404,
        "No such task found for this id"
      );
    }
    res.send({ message: `task successfully updated` });
  } catch (error) {
    checkError(error, res);
  }
}

export async function toggleApprovalAttendanceHandler(
  req: Request,
  res: Response
) {
  try {
    const {
      attendanceId,
      employeeId,
    }: {
      attendanceId: mongoose.Types.ObjectId;
      employeeId: string;
    } = req.body;
    const attendance = await findAttendance(
      {
        _id: attendanceId,
        "attendance.employeeId": employeeId,
        attendanceType: AttendanceType.Normal,
      },
      { "attendance.$": 1 }
    );
    if (!attendance || attendance.attendance.length == 0) {
      throw new CustomError(
        "Bad Request",
        404,
        "No such attendance found for this customer id"
      );
    }
    // attendance.attendance[0].approved = !attendance.attendance[0].approved;
    await attendance.save();
    res.send({
      message: `attendance ${
        attendance.attendance[0].approved ? "approved" : "denied"
      }`,
    });
  } catch (error) {
    checkError(error, res);
  }
}

export async function requestMeetingHandler(req: Request, res: Response) {
  const session = await mongoose.startSession();
  session.startTransaction();
  const admin = req.user! as AdminDocument;
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
    console.log("request", req.body);
    const project = await findProject({
      _id: projectId,
    });

    if (!project) {
      throw new CustomError("Bad Request", 404, "No such task found ");
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

    const locationValue: { [key: string]: any } = {};
    if (mode == MeetingMode.Physical) {
      locationValue["requestedLocation"] = requestedLocation;
    }
    const meeting = await createMeeting({
      employeeId: employee?._id,
      creatorId: { number: admin.number, name: admin.username, id: admin._id },
      projectId: project._id,
      requestedBy: SendBy.Admin,
      customerConfirmed: false,
      employeeHistory: employee
        ? [{ status: MeetingEmployeeAction.Pending, employeeId: employee._id }]
        : [],
      customerId: project.customerId,
      comment: comment,
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

export async function addMeetingHandler(req: Request, res: Response) {
  const session = await mongoose.startSession();
  session.startTransaction();
  const admin = req.user! as AdminDocument;
  try {
    let {
      meetingType,
      participants,
      conversationId,
      startDate,
      projectId,
      slotTime,

      comment,
    }: {
      conversationId?: mongoose.Types.ObjectId;
      startDate: Date;
      meetingType: MeetingType;
      participants?: Participant[];
      projectId: mongoose.Types.ObjectId;
      comment?: string;
      slotTime?: number;
      requestedLocation?: PointLocation;
      employeeId?: string;
    } = req.body;
    console.log("request", req.body);

    const finishedDate = moment(startDate).add(slotTime ?? 30, "minutes");

    // employee.schdule.push({
    //   startTime: startDate,
    //   endTime: finishedDate.toDate(),
    //   taskId: task._id,
    // });

    const meeting = await createMeeting({
      requestedBy: SendBy.Admin,
      customerConfirmed: false,
      creatorId: { number: admin.number, name: admin.username, id: admin._id },
      meetingType,
      conversationId,
      participants,
      projectId: projectId,
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
      employeeId: employeeId,
    });
    await meeting.save();
    await session.commitTransaction();
    res.send({ message: "Employee successfully updated to this meeting" });
  } catch (err) {
    await session.abortTransaction();
    checkError(err, res);
  }
}

export async function declineMeetingHandler(req: Request, res: Response) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const meeting = await findMeeting({
      _id: req.params.meetingId,
      status: MeetingStatus.Pending,
    });

    if (!meeting) {
      throw new CustomError(
        "Bad Request",
        404,
        "No such meeting found or meeting completed previously"
      );
    }

    if (meeting.employeeConfirmed) {
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
    const meeting = await findMeeting({
      _id: req.params.meetingId,
      status: MeetingStatus.Pending,
    });

    if (!meeting) {
      throw new CustomError(
        "Bad Request",
        404,
        "No such meeting found or meeting completed previously"
      );
    }

    if (meeting.employeeConfirmed) {
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

//new creation

export async function addHolidayHandler(req: Request, res: Response) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const {
      fromDateString,
      toDateString,
      description,
      title,
    }: {
      fromDateString: string;
      toDateString: string;
      description?: string;
      title?: string;
    } = req.body;
    console.log("body", req.body);
    let end = moment(toDateString);
    let start = moment(fromDateString);
    const admin = req.user! as AdminDocument;
    if (start.isBefore(moment())) {
      throw new CustomError("Bad Request", 404, "Day Already Passed");
    }
    console.log("before filter", start.toDate(), end.toDate());
    const holiday = await findHoliday(
      {
        $or: [
          {
            $and: [
              { start: { $lt: end.toDate() } },
              { start: { $gt: start.toDate() } },
            ],
          },
          {
            $and: [
              { start: { $gt: start.toDate() } },
              { end: { $lt: end.toDate() } },
            ],
          },
          {
            $and: [
              { end: { $lt: end.toDate() } },
              { end: { $gt: start.toDate() } },
            ],
          },
        ],
      },
      {},
      { session }
    );

    if (holiday) {
      throw new CustomError(
        "Bad Request",
        400,
        "Same Holiday date already added"
      );
    }
    console.log("afterfilter", start.toDate(), end.toDate());
    const array = Array.apply(0, Array(end.diff(start, "days")));
    const newMap = array.map((value, index) => ({
      date: start.clone().startOf("day").add(index, "day").toDate(),
      open: false,
      attendanceType: AttendanceType.Holiday,
      attendance: [],
    }));

    await Attendance.insertMany(newMap);
    console.log("staa", start.toDate(), end.toDate());
    const newHoliday = await createHoliday({
      start: start.toDate(),
      end: end.toDate(),
      description,
      title: title,
      adminId: admin._id,
    });
    await updateAllEmployee(
      { "holidayRequest.date": { $gte: start, $lte: end } },
      { $set: { "holidayRequest.$[].holidayAdded": true } },
      { session }
    );
    await session.commitTransaction();
    res.send({ message: `holiday for ${newHoliday?.description} is created` });
  } catch (err) {
    //@ts-ignore
    await session.abortTransaction();
    checkError(err, res);
  }
}

export async function removeHolidayHandler(req: Request, res: Response) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const admin = req.user! as AdminDocument;

    const holiday = await findAndDeleteHoliday(
      { _id: req.body.holidayId },

      { session }
    );

    if (!holiday) {
      throw new CustomError("Bad Request", 404, "No such holiday found");
    }
    if (moment(holiday.start).isBefore(moment())) {
      throw new CustomError(
        "Bad Request",
        404,
        "Day Already Passed,Now you cant delete holiday"
      );
    }
    await updateAllEmployee(
      {
        "holidayRequest.date": { $gte: holiday.start, $lt: holiday.end },
      },
      { $set: { "holidayRequest.$[].holidayAdded": false } },
      { session }
    );
    await Attendance.deleteMany({
      attendanceType: AttendanceType.Holiday,
      date: { $gte: holiday.start, $lt: holiday.end },
    });
    await session.commitTransaction();
    res.send({ message: `holiday for ${holiday?.description} is removed` });
  } catch (error) {
    await session.abortTransaction();
    checkError(error, res);
  }
}

export async function startAttendanceHandler(req: Request, res: Response) {
  try {
    let type = req.body.type ?? AttendanceType.Normal;

    const currentDate = moment();
    const dateCheck = moment(
      `${currentDate.year}-${currentDate.month}-${currentDate.date}`
    );
    let attendance = await findAttendance({ date: dateCheck });
    if (attendance) {
      if (attendance.attendanceType != AttendanceType.Normal) {
        throw new CustomError("Bad Request", 400, "Today is holiday ");
      } else {
        throw new CustomError("Bad Request", 400, "Attendance Already Started");
      }
    }
    await createAttendance({
      date: dateCheck,
      open: true,
      attendanceType: type,
      attendance: [],
    });
    res.send({ message: "Attendance Started Successfully" });
  } catch (err) {
    checkError(err, res);
  }
}

export async function stopAttendanceHandler(req: Request, res: Response) {
  try {
    const currentDate = moment();

    let attendance = await findAttendance({
      _id: req.params.attendanceId,
    });
    if (!attendance) {
      throw new CustomError("Bad Request", 404, "No such attendance found");
    }
    attendance.open = false;
    await attendance.save();
    res.send({ message: "Attendance Stoped Successfully" });
  } catch (err) {
    checkError(err, res);
  }
}

export async function createTemplateHandler(req: Request, res: Response) {
  try {
    const template = await createTemplate(req.body);
    addTemplateHandler(template);
    res.send(template);
  } catch (err) {
    checkError(err, res);
  }
}

export async function createBranchHandler(req: Request, res: Response) {
  try {
    const branch = await createBranch({
      ...req.body,
      state: getStateByGstNumber(req.body.gstNumber),
    });
    addBranchHandler(branch);
    res.send(branch);
  } catch (err) {
    checkError(err, res);
  }
}

export async function updateBranchHandler(req: Request, res: Response) {
  try {
    const branch = await findAndUpdateBranch(
      { _id: req.body.name },
      { $set: req.body },
      { new: true, upsert: true }
    );
    res.send(branch);
  } catch (err) {
    checkError(err, res);
  }
}

export async function deleteTemplateHandler(req: Request, res: Response) {
  try {
  } catch (err) {
    checkError(err, res);
  }
}

export async function assignPrimaryEmployeeHandler(
  req: Request,
  res: Response
) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const {
      customerId,
      employeeId,
    }: { customerId: string; employeeId: string } = req.body;
    const customer = await findCustomer({ _id: customerId }, {}, { session });
    if (!customer) {
      throw new CustomError("Bad request", 404, "No such customer found");
    }
    const employee = await findEmployee(
      { _id: employeeId },
      { _id: 1 },
      { session }
    );
    if (!employee) {
      throw new CustomError("Bad request", 404, "No such employee found");
    }
    let conversation = await findConversation(
      {
        conversationType: ConversationType.Primary,
        "participants.id": customer._id.toString(),
      },
      {},
      { session }
    );

    const participants: Participant[] = [
      {
        id: customer._id.toString(),
        participantType: SendBy.Customer,
        participantName: customer.companyName,
        participantProfile: customer.profileUri,
      },
      {
        id: employee._id,
        participantType: SendBy.Employee,
        participantName: employee.username,
        participantProfile: employee.profileUri,
      },
    ];
    if (!conversation) {
      conversation = await createConversation({
        conversationType: ConversationType.Primary,
        participants,
      });
    } else {
      conversation.participants = participants;
      await conversation.save();
    }
    if (customer.assignedEmployee) {
      deleteConversationHandler([conversation._id], customer.assignedEmployee);
    }
    customer.assignedEmployee = employee._id;

    updateConversationHandler([conversation]);
    await customer.save();
    await session.commitTransaction();
    res.send({
      message: `employee with name ${employee.username} is successfully assigned to company ${customer.companyName}`,
    });
  } catch (err) {
    await session.abortTransaction();
    checkError(err, res);
  }
}

export async function addEmployeeSickHandler(req: Request, res: Response) {
  try {
    const {
      employeeId,
      types,
    }: { employeeId: string; types: { [key: string]: SickLeaveCategory } } =
      req.body;
    const employee = await findEmployee({ _id: employeeId });
    if (!employee) {
      throw new CustomError("Bad Request", 404, "No such employee found");
    }
    const leaveDate = employee.sickLeave?.[0]?.date;
    employee.sickLeave.unshift({
      date: leaveDate
        ? moment(leaveDate).add(1, "month").toDate()
        : moment().startOf("month").toDate(),
      types,
    });
    await employee.save();
  } catch (err) {
    checkError(err, res);
  }
}

export async function updateEmployeeSickHandler(req: Request, res: Response) {
  try {
    const {
      employeeId,
      types,
      sickId,
    }: {
      employeeId: string;
      types: { [key: string]: SickLeaveCategory };
      sickId: mongoose.Types.ObjectId;
    } = req.body;
    const employee = await findEmployee({ _id: employeeId });
    if (!employee) {
      throw new CustomError("Bad Request", 404, "No such employee found");
    }
    const index = employee.sickLeave.findIndex(
      //@ts-ignore
      (value) => (value._id as mongoose.Types.ObjectId).equals(sickId)
    );
    if (index == -1) {
      throw new CustomError("Bad Request", 404, "No such sickid found");
    }
    employee.sickLeave[index] = { ...employee.sickLeave[index], types };
    await employee.save();
  } catch (err) {
    checkError(err, res);
  }
}

export async function adminConnectMeetingHandler(req: Request, res: Response) {
  try {
    const user = req.user! as AdminDocument;
    const { meetingId }: { meetingId: string } = req.body;
    const meeting = await findMeeting({
      _id: meetingId,
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
