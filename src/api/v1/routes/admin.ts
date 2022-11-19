import express from "express";
import {
  addCommentHandler,
  addEmployeeSickHandler,
  addHolidayHandler,
  addInvoiceHandler,
  addQuotationHandler,
  adminConnectMeetingHandler,
  approveHolidayHandler,
  assignEmployeeToCustomerHandler,
  assignPrimaryEmployeeHandler,
  assignTaskToEmployeeHandler,
  changePaymentStatusManuallyHandler,
  changePrimaryEmployeeHandler,
  completeMeetingHandler,
  completeProjectHandler,
  completeTaskHandler,
  createAdminHandler,
  createBranchHandler,
  createProjectForCustomerHandler,
  createTaskCustomerHandler,
  createTemplateHandler,
  declinedProjectHandler,
  declinedTaskHandler,
  declineMeetingHandler,
  denyHolidayHandler,
  forgotPasswordHandler,
  getStatusHandler,
  loginAdminHandler,
  logoutAdminHandler,
  removeEmployeeFromProjectHandler,
  removeEmployeeFromTaskHandler,
  removeHolidayHandler,
  requestMeetingHandler,
  startAttendanceHandler,
  stopAttendanceHandler,
  toggleApprovalAttendanceHandler,
  updateEmployeeMeetingHandler,
  updateEmployeeSickHandler,
  updateProjectHandler,
  updateStatusHandler,
  updateTaskHandler,
  updateTaskStatusHandler,
  verifyAdminHandler,
  verifyForgotOtpHandler,
} from "../controllers/admin";
import authRequired from "../middleware/auth";
import validate from "../middleware/validateRequest";
import Admin from "../models/admin";
import {
  addBranchSchema,
  addCommentSchema,
  addHolidaySchema,
  addTemplateSchema,
  approveHolidaySchema,
  assignEmployeeToCustomerSchema,
  assignPrimaryEmployeeSchema,
  assignTaskToEmployeeSchema,
  changePaymentStatusManuallySchema,
  createInvoiceSchema,
  createProjectSchema,
  createQuotationSchema,
  createTaskSchema,
  requestMeetingSchema,
  toggleAttendanceSchema,
  updateMeetingEmployeeSchema,
  updateProjectSchema,
  updateTaskSchema,
} from "../schema/admin";
import {
  createAdminSchema,
  verifyPersonSchema,
  webLoginSchema,
} from "../schema/common";

const AdminRouter = express.Router();

AdminRouter.post("/signup", validate(createAdminSchema), createAdminHandler);

AdminRouter.post(
  "/signup/verify",
  validate(verifyPersonSchema),
  verifyAdminHandler
);

AdminRouter.post("/forgot/number", forgotPasswordHandler);
AdminRouter.post("/forgot/verify/number", verifyForgotOtpHandler);

AdminRouter.get("/status", authRequired(Admin), getStatusHandler);

AdminRouter.post("/login/web", validate(webLoginSchema), loginAdminHandler);

AdminRouter.post("/logout", logoutAdminHandler);

AdminRouter.put(
  "/employee/to/customer",
  [validate(assignEmployeeToCustomerSchema), authRequired(Admin)],
  assignEmployeeToCustomerHandler
);

AdminRouter.post(
  "/create/project",
  [validate(createProjectSchema), authRequired(Admin)],
  createProjectForCustomerHandler
);

AdminRouter.put(
  "/update/project",
  [validate(updateProjectSchema), authRequired(Admin)],
  updateProjectHandler
);

AdminRouter.put(
  "/assign/primary/employee",
  [validate(assignPrimaryEmployeeSchema), authRequired(Admin)],
  changePrimaryEmployeeHandler
);

AdminRouter.post(
  "/create/task",
  [validate(createTaskSchema), authRequired(Admin)],
  createTaskCustomerHandler
);

AdminRouter.post(
  "/update/task",
  [validate(updateTaskSchema), authRequired(Admin)],
  updateTaskHandler
);

AdminRouter.put(
  "/assign/task",
  [validate(assignTaskToEmployeeSchema), authRequired(Admin)],
  assignTaskToEmployeeHandler
);

AdminRouter.put(
  "/remove/task/employee/:taskId",
  [authRequired(Admin)],
  removeEmployeeFromTaskHandler
);

AdminRouter.put(
  "/remove/project/employee/:projectId",
  [authRequired(Admin)],
  removeEmployeeFromProjectHandler
);

AdminRouter.put(
  "/decline/task/:taskId",
  [authRequired(Admin)],
  declinedTaskHandler
);

AdminRouter.put(
  "/complete/project",
  [authRequired(Admin)],
  completeProjectHandler
);

AdminRouter.put(
  "/decline/project",
  [authRequired(Admin)],
  declinedProjectHandler
);

AdminRouter.put(
  "/update/project/status",
  [authRequired(Admin)],
  updateStatusHandler
);

AdminRouter.put("/complete/task", [authRequired(Admin)], completeTaskHandler);

AdminRouter.put("/decline/task", [authRequired(Admin)], declinedTaskHandler);

AdminRouter.put(
  "/update/task/status",
  [authRequired(Admin)],
  updateTaskStatusHandler
);

AdminRouter.post(
  "/add/project/quotation",
  [validate(createQuotationSchema), authRequired(Admin)],
  addQuotationHandler
);

AdminRouter.post(
  "/add/project/invoice",
  [validate(createInvoiceSchema), authRequired(Admin)],
  addInvoiceHandler
);

AdminRouter.put(
  "/update/payment/status",
  [validate(changePaymentStatusManuallySchema), authRequired(Admin)],
  changePaymentStatusManuallyHandler
);

AdminRouter.post(
  "/add/comment",
  [validate(addCommentSchema), authRequired(Admin)],
  addCommentHandler
);

AdminRouter.put(
  "/approve/holiday",
  [validate(approveHolidaySchema), authRequired(Admin)],
  approveHolidayHandler
);

AdminRouter.put(
  "/deny/holiday",
  [validate(approveHolidaySchema), authRequired(Admin)],
  denyHolidayHandler
);

AdminRouter.post(
  "/add/meeting",
  [validate(requestMeetingSchema), authRequired(Admin)],
  requestMeetingHandler
);

AdminRouter.put(
  "/update/meeting",
  [validate(updateMeetingEmployeeSchema), authRequired(Admin)],
  updateEmployeeMeetingHandler
);

AdminRouter.put(
  "/decline/meeting/:meetingId",
  [authRequired(Admin)],
  declineMeetingHandler
);

AdminRouter.put(
  "/complete/meeting/:meetingId",
  [authRequired(Admin)],
  completeMeetingHandler
);

AdminRouter.post(
  "/add/holiday",
  [validate(addHolidaySchema), authRequired(Admin)],
  addHolidayHandler
);

AdminRouter.delete(
  "/remove/holiday",
  authRequired(Admin),
  removeHolidayHandler
);
AdminRouter.post(
  "/start/attendance",
  authRequired(Admin),
  startAttendanceHandler
);
AdminRouter.put(
  "/stop/attendance/:attendanceId",
  authRequired(Admin),
  stopAttendanceHandler
);
AdminRouter.put(
  "/toggle/attendance",
  [validate(toggleAttendanceSchema), authRequired(Admin)],
  toggleApprovalAttendanceHandler
);

AdminRouter.post(
  "/add/branch",
  [validate(addBranchSchema), authRequired(Admin)],
  createBranchHandler
);

AdminRouter.post(
  "/add/template",
  [validate(addTemplateSchema), authRequired(Admin)],
  createTemplateHandler
);

AdminRouter.post(
  "/assign/primary/employee",
  [validate(assignEmployeeToCustomerSchema), authRequired(Admin)],
  assignPrimaryEmployeeHandler
);

AdminRouter.post(
  "/add/sick/leave",
  [authRequired(Admin)],
  addEmployeeSickHandler
);

AdminRouter.put(
  "/update/sick/leave",
  [authRequired(Admin)],
  updateEmployeeSickHandler
);

AdminRouter.post(
  "/join/meeting",
  [authRequired(Admin)],
  adminConnectMeetingHandler
);
export default AdminRouter;
